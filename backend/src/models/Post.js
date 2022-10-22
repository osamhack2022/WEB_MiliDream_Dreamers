import mariadb from "../loaders/mariadb.js";
import Logger from "../loaders/logger.js";
import sanitizeHTML from "sanitize-html";

const COMPETITION_CATEGORY = "공모전&대회 리스트";

async function getSubComments({ commentKey }, conn) {
	const sql = `SELECT commentKey, userKey, body, commentTime FROM Comment WHERE parentKey=? ORDER BY commentTime`;
	const result = await conn.query(sql, [commentKey]);
	return result;
}

async function getMainComments({ postKey }, conn) {
	const sql = `SELECT commentKey, userKey, body, commentTime FROM Comment WHERE parentKey IS NULL AND postKey=? ORDER BY commentTime`;
	const result = await conn.query(sql, [postKey]);
	for (let i = 0; i < result.length; i++) {
		result[i].childComments = await getSubComments(result[i], conn);
	}
	return result;
}

/**
 * 하나의 post에 대하여 그것의 postKey에 대응하는 사람 모집 글을 배열로 반환함
 *
 *
 * @param {*} postInfo postKey를 포함하는 postInfo 구조체
 * @param {*} conn mariadb에서 나온 connection
 * @returns
 */
async function getRecruitPosts({ postKey, categoryName }, conn) {
	if (categoryName !== COMPETITION_CATEGORY) return [];
	const sql = `SELECT p.postKey, p.userKey, p.categoryKey, c.categoryName, p.postTime, p.title, p.body, p.viewCount 
		FROM Post as p
		LEFT JOIN Category as c ON c.categoryKey=p.categoryKey
		LEFT JOIN Recommenders as r ON r.postKey=p.postKey
		LEFT JOIN CareerPost as ca ON ca.recruitKey=p.postKey
		WHERE ca.competitionKey=?;
		`;
	const result = await conn.query(sql, [postKey]);
	const posts = await getMainCommentsForAllResult(result, conn);
	return posts;
}

async function getRecommenders({ postKey }, conn) {
	const sql = `SELECT r.userKey FROM Recommenders as r WHERE r.postKey=?;`;
	const result = await conn.query(sql, [postKey]);
	return result.map(({ userKey }) => userKey);
}

/**
 * 각각의 `result`에 대해 `getMainComments`를 해준 결과를 반환함
 * @param {*} result board배열
 * @param {*} conn mariadb.getConnection()한 결과
 * @returns
 */
async function getMainCommentsForAllResult(result, conn) {
	for (let i = 0; i < result.length; i++) {
		result[i].comments = await getMainComments(result[i], conn);
	}
	return result;
}

/**
 * 각각의 `result`에 대해 `getMainComments`를 해준 결과를 반환함
 * @param {*} result board배열
 * @param {*} conn mariadb.getConnection()한 결과
 * @returns
 */
async function getRecruitPostsForAllResult(result, conn) {
	for (let i = 0; i < result.length; i++) {
		result[i].recruitPosts = await getRecruitPosts(result[i], conn);
	}
	return result;
}

async function getRecommendersForAllResult(result, conn) {
	for (let i = 0; i < result.length; i++) {
		result[i].recommenders = await getRecommenders(result[i], conn);
	}
	return result;
}

async function updateViewCount(postKey, conn) {
	const sql = `UPDATE Post SET viewCount=viewCount+1 WHERE postKey=?;`;
	await conn.query(sql, [postKey]);
}

async function deleteRecruit(boardId, conn) {
	const sql = `SELECT recruitKey FROM CareerPost WHERE competitionKey=?;`;
	const result = await conn.query(sql, [boardId]);
	if (result.length === 0) return;

	const clauses = result.map((_) => "postKey=?"),
		values = result.map((ele) => ele.recruitKey);
	const sql2 = `DELETE FROM Post WHERE ${clauses.join(" OR ")};`;
	await conn.query(sql2, values);
}

async function processAllPosts(result, conn) {
	if (result.length === 0) return result;
	result = await getMainCommentsForAllResult(result, conn);
	result = await getRecruitPostsForAllResult(result, conn);
	result = await getRecommendersForAllResult(result, conn);
	return result;
}

async function addCareerPost(careerPostKey, recruitKey, conn) {
	const sql =
		"INSERT INTO CareerPost(competitionKey, recruitKey) VALUES (?, ?);";
	try {
		const result = await conn.query(sql, [careerPostKey, recruitKey]);
		if (result.affectedRows !== 1) {
			throw Error("could not update career Post!");
		}
		return;
	} catch (err) {
		const deletesql = `DELETE FROM Post WHERE postKey=?;`;
		await conn.query(deletesql, [recruitKey]);
		throw err;
	}
}
export default class Post {
	static async getAllBoards({ categoryKey }) {
		let sql = `
			SELECT p.postKey, p.userKey, p.categoryKey, c.categoryName, p.postTime, p.title, p.body, p.viewCount
			FROM Post as p
			LEFT JOIN Category as c ON c.categoryKey=p.categoryKey
			`;
		const queryValue = [];
		if (categoryKey) {
			sql += `WHERE c.categoryKey=?;`;
			queryValue.push(categoryKey);
		} else {
			// 1=="공모전&대회 리스트", 2=="사람모집게시글"
			sql += `WHERE c.categoryKey NOT IN (1, 2);`;
		}

		const conn = await mariadb.getConnection();
		try {
			const result = await conn.query(sql, queryValue);
			return processAllPosts(result, conn);
		} catch (err) {
			throw err;
		} finally {
			await conn.release();
		}
	}

	static async postBoard({
		categoryKey,
		title,
		body,
		userKey,
		careerPostKey,
	}) {
		if (categoryKey === "2" && !careerPostKey)
			throw Error("careerPostKey가 세팅되지 않음");
		else if (categoryKey !== "2" && careerPostKey)
			throw Error("careerPostKey가 세팅됨");
		const cleanTitle = sanitizeHTML(title, { allowedTags: [] });
		const cleanBody = sanitizeHTML(body, {
			allowedTags: [
				"h1",
				"h2",
				"h3",
				"p",
				"img",
				"blockquote",
				"strong",
				"em",
				"s",
				"u",
				"br",
			],
			allowedAttributes: {
				img: ["src"],
			},
		});
		const sql = `INSERT INTO Post(userKey, title, body, categoryKey) VALUES (?, ?, ?, ?);`;
		const conn = await mariadb.getConnection();
		try {
			const result = await conn.query(sql, [
				userKey,
				cleanTitle,
				cleanBody,
				categoryKey,
			]);
			if (result.affectedRows === 0) {
				throw new Error("Could not post!");
			}
			if (careerPostKey) {
				await addCareerPost(
					careerPostKey,
					Number(result.insertId),
					conn
				);
			}
			return Number(result.insertId);
		} catch (err) {
			throw err;
		} finally {
			await conn.release();
		}
	}

	static async queryBoard({ title, userName, content, tag }) {
		if (!title && !userName && !content && !tag)
			throw Error("should give at least one");
		let sql = `
			SELECT p.postKey, p.userKey, p.categoryKey, c.categoryName, p.postTime, p.title, p.body, p.viewCount
			FROM Post as p
			LEFT JOIN Category as c ON c.categoryKey=p.categoryKey
			WHERE `;
		const queryValue = [];

		if (title) {
			sql += "title LIKE CONCAT('%', ? '%') AND ";
			queryValue.push(title);
		}

		if (userName) {
			sql +=
				"userKey in (SELECT userKey FROM User WHERE User.userName LIKE CONCAT('%', ? '%')) AND ";
			queryValue.push(username);
		}

		if (content) {
			sql += "body LIKE CONCAT('%', ? '%') AND ";
			queryValue.push(content);
		}

		// if (tag){
		// 	sql += "`tag` LIKE CONCAT('%', ? '%') ";
		// 	queryValue.push(tag);
		// }

		sql += "TRUE;";

		const conn = mariadb.getConnection();
		try {
			const result = await conn.query(sql, queryValue);
			return processAllPosts(result, conn);
		} catch (err) {
			throw err;
		} finally {
			await conn.release();
		}
	}

	static async getAllCategories() {
		const sql = `SELECT categoryKey, categoryName FROM Category;`;
		try {
			const result = await mariadb.query(sql);
			return result;
		} catch (err) {
			throw err;
		}
	}

	static async getbyBoardId(postKey) {
		if (postKey === undefined) throw new Error("postKey가 존재해야 합니다");
		let sql = `
			SELECT p.postKey, p.userKey, p.categoryKey, c.categoryName, p.postTime, p.title, p.body, p.viewCount
			FROM Post as p
			LEFT JOIN Category as c ON c.categoryKey=p.categoryKey
			WHERE p.postKey=?;`;
		const conn = await mariadb.getConnection();
		try {
			let result = await conn.query(sql, [postKey]);
			if (result.length === 0)
				throw new Error(
					`postKey="${postKey}"에 해당하는 게시글이 없습니다`
				);
			result = await processAllPosts(result, conn);
			await updateViewCount(postKey, conn);
			return result[0];
		} catch (err) {
			throw err;
		} finally {
			await conn.release();
		}
	}

	static async fixbyBoardId(postKey, { title, body }) {
		if (!title || !body) throw Error("title or body is undefined");

		const sql = `UPDATE Post SET title=?, body=? WHERE postKey=?; `;
		try {
			const result = await mariadb.query(sql, [title, body, postKey]);
			if (result.affectedRows === 0)
				throw new Error(
					`postKey="${postKey}"인 게시글을 업데이트하지 못했습니다`
				);
			return;
		} catch (err) {
			throw err;
		}
	}

	static async deletebyBoardId(postKey) {
		const conn = await mariadb.getConnection();
		try {
			// 만약 대회 게시글이라면 인원 모집 게시글부터 모두 찾고 지운 다음 지우기
			await deleteRecruit(postKey, conn);
			const sql = `DELETE FROM Post WHERE postKey=?;`;
			const result = await conn.query(sql, postKey);
			if (result.affectedRows === 0) {
				throw Error(`postKey="${postKey}"인 게시글이 없습니다`);
			}
			return;
		} catch (err) {
			throw err;
		} finally {
			await conn.release();
		}
	}
}
