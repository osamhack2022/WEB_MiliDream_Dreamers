// @ts-check

import mariadb from "../loaders/mariadb.js";
import Logger from "../loaders/logger.js";
import sanitizeHTML from "sanitize-html";
/** @typedef {{affectedRows: number; insertId: number; warningStatus: number;}} writeResultSet */
/** @typedef {{commentKey: number; userKey: number; commentTime: string; body: string;}} childComment */
/** @typedef {childComment & {childComments: childComment[]}} commentType */
/** @typedef {{postKey: number; userKey: number; categoryKey: number; categoryName: string; postTime: string; title: string; body: string; viewCount: number; recommenderCount?: number; comments: commentType[], recruitPosts: boardType[]}} boardType */
/** @typedef {boardType & {didRecommend?: boolean}} boardDetail */
/** @typedef {{categoryKey: number; categoryName: string}} categoryType */

const COMPETITION_CATEGORY = "공모전&대회 리스트";

/**
 * 메인 댓글에 대한 답글들을 반환합니다.
 *
 * @param {commentType} commentObj
 * @param {import("mariadb").PoolConnection} conn
 * @returns
 */
async function getSubComments({ commentKey }, conn) {
	const sql = `SELECT commentKey, userKey, body, commentTime FROM Comment WHERE parentKey=? ORDER BY commentTime`;
	/** @type {childComment[]} */
	const result = await conn.query(sql, [commentKey]);
	return result;
}

/**
 * `postObj`에 대한 댓글을 반환합니다.
 *
 * @param {boardType} postObj
 * @param {import("mariadb").PoolConnection} conn
 * @returns
 */
async function getMainComments({ postKey }, conn) {
	const sql = `SELECT commentKey, userKey, body, commentTime FROM Comment WHERE parentKey IS NULL AND postKey=? ORDER BY commentTime`;
	/** @type {commentType[]} */
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
 * @param {boardType} postInfo postKey를 포함하는 postInfo 구조체
 * @param {import("mariadb").PoolConnection} conn mariadb에서 나온 connection
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
	/** @type {boardType[]} */
	const result = await conn.query(sql, [postKey]);
	const posts = await getMainCommentsForAllResult(result, conn);
	return getRecommendersForAllResult(posts, conn);
}

/**
 * `postKey`를 가지는 `postObj`의 recommender 리스트를 반환한다.
 *
 * @param {{postKey: number}} postObj
 * @param {import("mariadb").PoolConnection} conn
 */
async function getRecommenders({ postKey }, conn) {
	const sql = `SELECT r.userKey FROM Recommenders as r WHERE r.postKey=?;`;
	/** @type {{userKey: number}[]} */
	const result = await conn.query(sql, [postKey]);
	return result.map(({ userKey }) => userKey);
}

/**
 * 각각의 `result`에 대해 `getMainComments`를 해준 결과를 반환함
 * @param {boardDetail[]} result board배열
 * @param {import("mariadb").PoolConnection} conn mariadb.getConnection()한 결과
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
 *
 * @param {boardDetail[]} result board배열
 * @param {import("mariadb").PoolConnection} conn mariadb.getConnection()한 결과
 * @returns
 */
async function getRecruitPostsForAllResult(result, conn) {
	for (let i = 0; i < result.length; i++) {
		result[i].recruitPosts = await getRecruitPosts(result[i], conn);
	}
	return result;
}

/**
 * SQL 쿼리 결과로 나온 result의 포스트 각각에 대해 `recommenderCount`와 `didRecommend`를 추가합니다.
 * `userKey`가 주어질 때에만 `didRecommend` 필드도 추가합니다.
 *
 * @param {boardDetail[]} result
 * @param {import("mariadb").PoolConnection} conn
 * @param {number} [userKey]
 * @returns
 */
async function getRecommendersForAllResult(result, conn, userKey) {
	for (let i = 0; i < result.length; i++) {
		const recommenderList = await getRecommenders(result[i], conn);
		result[i].recommenderCount = recommenderList.length;
		if (userKey) {
			result[i].didRecommend = recommenderList.some(
				(ele) => ele === userKey
			);
		}
	}
	return result;
}

/**
 * postKey인 게시글의 조회수를 1 올립니다.
 *
 * @param {number} postKey
 * @param {import("mariadb").PoolConnection} conn
 */
async function updateViewCount(postKey, conn) {
	const sql = `UPDATE Post SET viewCount=viewCount+1 WHERE postKey=?;`;
	await conn.query(sql, [postKey]);
}

/**
 * postKey인 게시글을 삭제하기 전, 그 게시글에 달린 사람모집글을 삭제합니다.
 *
 * @param {number} postKey
 * @param {import("mariadb").PoolConnection} conn
 * @returns
 */
async function deleteRecruit(postKey, conn) {
	const sql = `SELECT recruitKey FROM CareerPost WHERE competitionKey=?;`;
	/** @type {{recruitKey: number}[]} */
	const result = await conn.query(sql, [postKey]);
	if (result.length === 0) return;

	const clauses = result.map((_) => "postKey=?"),
		values = result.map((ele) => ele.recruitKey);
	const sql2 = `DELETE FROM Post WHERE ${clauses.join(" OR ")};`;
	await conn.query(sql2, values);
}

/**
 * SQL쿼리의 결과로 나온 게시글 배열을 처리합니다.
 *
 * @param {boardDetail[]} result
 * @param {import("mariadb").PoolConnection} conn
 * @param {number} [userKey] 주어졌다면 didRecommend 필드도 추가합니다.
 * @returns
 */
async function processAllPosts(result, conn, userKey) {
	if (result.length === 0) return result;
	result = await getMainCommentsForAllResult(result, conn);
	result = await getRecruitPostsForAllResult(result, conn);
	result = await getRecommendersForAllResult(result, conn, userKey);
	return result;
}

/**
 * 대회글과 사람모집글의 관계를 추가합니다.
 *
 * @param {number} careerPostKey
 * @param {number} recruitKey
 * @param {import("mariadb").PoolConnection} conn
 * @returns
 */
async function addCareerPost(careerPostKey, recruitKey, conn) {
	const sql =
		"INSERT INTO CareerPost(competitionKey, recruitKey) VALUES (?, ?);";
	try {
		/** @type {writeResultSet} */
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
	/**
	 * 대회글과 사람모집글을 제외한 모든 글을 반환합니다.
	 * 만약 `boardInfo`의 `categoryKey`가 주어졌다면 모든 글 중 그것으로 필터링한 글들을 반환합니다.
	 *
	 * @param {{categoryKey?: number;}} boardInfo
	 * @returns
	 * @throws {Error}
	 */
	static async getAllBoards({ categoryKey }) {
		let sql = `
			SELECT p.postKey, p.userKey, p.categoryKey, c.categoryName, p.postTime, p.title, p.body, p.viewCount, count(*) as recommend
			FROM Post as p
			LEFT JOIN Category as c ON c.categoryKey=p.categoryKey
			LEFT OUTER JOIN Recommenders as r ON r.postkey=p.postKey
			`;
		/** @type {number[]} */
		const queryValue = [];
		if (categoryKey) {
			sql += `WHERE c.categoryKey=?`;
			queryValue.push(categoryKey);
		} else {
			// 1=="공모전&대회 리스트", 2=="사람모집게시글"
			sql += `WHERE c.categoryKey NOT IN (1, 2)`;
		}
		sql += ` GROUP BY postKey`;

		const conn = await mariadb.getConnection();
		try {
			/** @type {boardDetail[]} */
			let result = await conn.query(sql, queryValue);
			result = await processAllPosts(result, conn);
			const boardResult = /** @type {boardType[]} */ (result);
			return boardResult;
		} catch (err) {
			throw err;
		} finally {
			await conn.release();
		}
	}

	/**
	 * 게시글을 주어진 `postInfo`로 작성합니다.
	 *
	 * @param {{categoryKey: number;
	 * 		title: string;
	 * 		body: string;
	 * 		userKey: number;
	 * 		careerPostKey?: number}} postInfo
	 * @returns
	 */
	static async postBoard({
		categoryKey,
		title,
		body,
		userKey,
		careerPostKey,
	}) {
		if (categoryKey === 2 && !careerPostKey)
			throw Error("careerPostKey가 세팅되지 않음");
		else if (categoryKey !== 2 && careerPostKey)
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
			/** @type {writeResultSet} */
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

	/**
	 * 입력한 정보를 바탕으로 게시글을 검색한 후, 그 결과를 반환합니다.
	 *
	 * @param {{title?: string; userName?: string; content?: string; tag?: string;}} queryInfo
	 * @returns
	 * @throws {Error}
	 */
	static async queryBoard({ title, userName, content, tag }) {
		if (!title && !userName && !content && !tag)
			throw Error("should give at least one");
		let sql = `
			SELECT p.postKey, p.userKey, p.categoryKey, c.categoryName, p.postTime, p.title, p.body, p.viewCount
			FROM Post as p
			LEFT JOIN Category as c ON c.categoryKey=p.categoryKey
			WHERE `;
		/** @type {string[]} */
		const queryValue = [];

		if (title) {
			sql += "title LIKE CONCAT('%', ? '%') AND ";
			queryValue.push(title);
		}

		if (userName) {
			sql +=
				"userKey in (SELECT userKey FROM User WHERE User.userName LIKE CONCAT('%', ? '%')) AND ";
			queryValue.push(userName);
		}

		if (content) {
			sql +=
				"(title LIKE CONCAT('%', ? '%') OR body LIKE CONCAT('%', ? '%')) AND ";
			queryValue.push(content);
		}

		// if (tag){
		// 	sql += "`tag` LIKE CONCAT('%', ? '%') ";
		// 	queryValue.push(tag);
		// }

		sql += "TRUE;";

		const conn = await mariadb.getConnection();
		try {
			/** @type {boardDetail[]} */
			let result = await conn.query(sql, queryValue);
			result = await processAllPosts(result, conn);
			const boardList = /** @type {boardType[]} */ (result);
			return boardList;
		} catch (err) {
			throw err;
		} finally {
			await conn.release();
		}
	}

	/**
	 * 카테고리 목록을 반환한다.
	 *
	 * @throws {Error}
	 */
	static async getAllCategories() {
		const sql = `SELECT categoryKey, categoryName FROM Category;`;
		try {
			/** @type {categoryType[]} */
			const result = await mariadb.query(sql);
			return result;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * `postKey`에 해당하는 게시글을 처리해 반환합니다.
	 * 부수적으로 조회수를 1 올립니다.
	 *
	 * @param {number} postKey
	 * @param {number} userKey 포스트를 조회하는 사용자, 추천했는지 안 했는지를 알기 위해 필요함
	 * @returns
	 * @throws {Error}
	 */
	static async getbyBoardId(postKey, userKey) {
		if (!postKey) throw new Error("postKey가 존재해야 합니다");
		let sql = `
			SELECT p.postKey, p.userKey, p.categoryKey, c.categoryName, p.postTime, p.title, p.body, p.viewCount
			FROM Post as p
			LEFT JOIN Category as c ON c.categoryKey=p.categoryKey
			WHERE p.postKey=?;`;
		const conn = await mariadb.getConnection();
		try {
			/** @type {boardType[]} */
			let result = await conn.query(sql, [postKey]);
			if (result.length === 0)
				throw new Error(
					`postKey="${postKey}"에 해당하는 게시글이 없습니다`
				);
			result = await processAllPosts(result, conn, userKey);
			await updateViewCount(postKey, conn);
			return result[0];
		} catch (err) {
			throw err;
		} finally {
			await conn.release();
		}
	}

	/**
	 * `postKey`인 게시글을 수정합니다.
	 * `postInfo`의 `userKey`가 그 글을 쓰지 않았다면 실패합니다.
	 * 받은 `postInfo`의 `title`과 `body`로 수정합니다.
	 *
	 * @param {number} postKey
	 * @param {{title: string; body: string; userKey: number;}} postInfo
	 * @returns
	 * @throws {Error}
	 */
	static async fixbyBoardId(postKey, { title, body, userKey }) {
		if (!title || !body) throw Error("title or body is undefined");

		const sql = `UPDATE Post SET title=?, body=? WHERE postKey=? AND userKey=?;`;
		try {
			/** @type {writeResultSet} */
			const result = await mariadb.query(sql, [
				title,
				body,
				postKey,
				userKey,
			]);
			if (result.affectedRows === 0)
				throw new Error(
					`postKey="${postKey}"인 게시글을 업데이트하지 못했습니다`
				);
			return;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * `userKey`가 쓴 `postKey`를 삭제합니다.
	 * `postKey`를 쓴 사람이 `userKey`가 아니라면 에러를 발생합니다.
	 *
	 * @param {number} postKey
	 * @param {number} userKey
	 * @returns
	 * @throws {Error}
	 */
	static async deletebyBoardId(postKey, userKey) {
		const conn = await mariadb.getConnection();
		try {
			// 만약 대회 게시글이라면 인원 모집 게시글부터 모두 찾고 지운 다음 지우기
			await deleteRecruit(postKey, conn);
			const sql = `DELETE FROM Post WHERE postKey=? AND userKey=?;`;
			/** @type {writeResultSet} */
			const result = await conn.query(sql, [postKey, userKey]);
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
