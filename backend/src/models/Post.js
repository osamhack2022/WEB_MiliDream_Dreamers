import mariadb from "../loaders/mariadb";
import Logger from "../loaders/logger";

const COMPETITION_CATEGORY = "공모전&대회 리스트";

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
	return result;
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
	const sql = `UPDATE Post SET viewCount=viewCount+1 WHERE postKey=?`;
	const result = await conn.query(sql, [postKey]);
}

export default class Post {
	constructor(post) {
		this.userkey = post.userkey;
		this.postTime = post.postTime;
		this.title = post.title;
		this.body = post.body;
		this.categoryKey = post.categoryKey;
		this.carrerPostKey = post.carrerPostKey;
	}

	static async getAllBoards({ tag }) {
		let sql = `
			SELECT p.postKey, p.userKey, p.categoryKey, c.categoryName, p.postTime, p.title, p.body, p.viewCount
			FROM Post as p
			LEFT JOIN Category as c ON c.categoryKey=p.categoryKey
			`;
		const queryValue = [];
		if (tag) {
			sql += `WHERE c.categoryName=?`;
			queryValue.push(tag);
		} else {
			// 1=="공모전&대회 리스트", 2=="사람모집게시글"
			sql += `WHERE c.categoryKey != 1 AND c.categoryKey != 2`;
		}

		const conn = await mariadb.getConnection();
		let result = await conn.query(sql, queryValue);
		if (result.length !== 0) {
			result = await getMainCommentsForAllResult(result, conn);
			result = await getRecruitPostsForAllResult(result, conn);
			result = await getRecommendersForAllResult(result, conn);
		}

		delete result.meta;
		await conn.release();

		return result;
	}
	static async postBoard({ categoryKey, title, body, userKey }) {
		const sql = `INSERT INTO Post(userKey, title, body, categoryKey) VALUES (?, ?, ?, ?);`;
		const result = await mariadb.query(sql, [
			userKey,
			title,
			body,
			categoryKey,
		]);
		result.affectedRows = 0;
		if (result.affectedRows === 0) {
			throw new Error("Could not post!");
		}

		return { postKey: Number(result.insertId) };
	}
	static async queryBoard({ title, username, content, tag }) {
		const sql = ``;
		const result = await mariadb.query(sql);

		return result;
	}
	static async getAllTags() {
		const sql = `SELECT categoryName FROM Category`;
		const result = await mariadb.query(sql);

		return result;
	}
	static async getbyBoardId(postKey) {
		if (postKey === undefined) throw new Error("postKey가 존재해야 합니다");
		let sql = `
			SELECT p.postKey, p.userKey, p.categoryKey, c.categoryName, p.postTime, p.title, p.body, p.viewCount
			FROM Post as p
			LEFT JOIN Category as c ON c.categoryKey=p.categoryKey
			WHERE p.postKey=?
			`;

		const conn = await mariadb.getConnection();
		let result = await conn.query(sql, [postKey]);
		if (result.length === 0)
			throw new Error(
				`postKey="${postKey}"에 해당하는 게시글이 없습니다`
			);
		result = await getMainCommentsForAllResult(result, conn);
		result = await getRecruitPostsForAllResult(result, conn);
		result = await getRecommendersForAllResult(result, conn);
		delete result.meta;
		await updateViewCount(postKey, conn);

		await conn.release();

		return result;
	}

	static async fixbyBoardId(boardId, { title, body }) {
		let sql = `UPDATE Post SET `;
		const updateList = [];
		const updateValue = [];
		if (title !== undefined) {
			updateList.push(`title=?`);
			updateValue.push(title);
		}
		if (body !== undefined) {
			updateList.push(`body=?`);
			updateValue.push(body);
		}
		if (updateValue.length === 0) {
			throw new Error("there is nothing to update");
		}
		sql += updateList.join(", ");
		sql += "WHERE postKey=?;";
		const result = await mariadb.query(sql, [...updateValue, boardId]);

		return result.affectedRows > 0;
	}
	static async deletebyBoardId(boardId) {
		// 만약 대회 게시글이라면 인원 모집 게시글부터 모두 찾고 지운 다음 지우기
		const conn = await mariadb.getConnection();
		await deleteRecruit(boardId, conn);
		const sql = `DELETE FROM Post WHERE postKey=?`;
		const result = await conn.query(sql, boardId);
		await conn.release();
		return result.affectedRows === 1;
	}
}

async function deleteRecruit(boardId, conn) {
	const sql = `SELECT recruitKey FROM CareerPost WHERE competitionKey=?`;
	const result = await conn.query(sql, [boardId]);
	if (result.length === 0) return;

	const clauses = [],
		values = [];
	result.forEach((ele) => {
		clauses.push("postKey=?");
		values.push(ele.recruitKey);
	});
	const sql2 = `DELETE FROM Post WHERE ${clauses.join(" OR ")};`;
	const result2 = await conn.query(sql2, values);
}
