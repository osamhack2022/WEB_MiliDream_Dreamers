import mariadb from "../loaders/mariadb";
import Logger from "../loaders/logger";

const COMPETITION_CATEGORY = "공모전&대회 리스트";

/** Post 생성자 */
export default class Post {
	constructor(post) {
		this.userkey = post.userkey;
		this.postTime = post.postTime;
		this.title = post.title;
		this.body = post.body;
		this.categoryKey = post.categoryKey;
		this.carrerPostKey = post.carrerPostKey;
	}

	static async getSubComments({ commentKey }, conn) {
		const sql = `SELECT commentKey, userKey, body, commentTime FROM Comment WHERE parentKey=? ORDER BY commentTime`;
		const result = await conn.query(sql, [commentKey]);
		return result;
	}

	static async getMainComments({ postKey }, conn) {
		const sql = `SELECT commentKey, userKey, body, commentTime FROM Comment WHERE parentKey IS NULL AND postKey=? ORDER BY commentTime`;
		const result = await conn.query(sql, [postKey]);
		for (let i = 0; i < result.length; i++) {
			result[i].childComments = await this.getSubComments(
				result[i],
				conn
			);
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
	static async getRecruitPosts({ postKey, categoryName }, conn) {
		if (categoryName !== COMPETITION_CATEGORY) return [];
		const sql = `SELECT p.postKey, p.userKey, p.categoryKey, c.categoryName, p.postTime, p.title, p.body, p.viewCount 
			FROM Post as p
			LEFT JOIN Category as c ON c.categoryKey=p.categoryKey
			LEFT JOIN Recommenders as r ON r.postKey=p.postKey
			LEFT JOIN CareerPost as ca ON ca.recruitKey=p.postKey
			WHERE ca.competitionKey=?
			`;
		const result = await conn.query(sql, [postKey]);
		const posts = await this.getMainCommentsForAllResult(result, conn);
		return posts;
	}

	static async getRecommenders({ postKey }, conn) {
		const sql = `SELECT r.userKey
			FROM Post as p
			INNER JOIN Recommenders as r ON r.postKey=p.postKey
			WHERE p.postKey=?
			`;
		const result = await conn.query(sql, [postKey]);
		return result;
	}

	/**
	 * 각각의 `result`에 대해 `getMainComments`를 해준 결과를 반환함
	 * @param {*} result board배열
	 * @param {*} conn mariadb.getConnection()한 결과
	 * @returns
	 */
	static async getMainCommentsForAllResult(result, conn) {
		if (!Array.isArray(result)) return result;
		for (let i = 0; i < result.length; i++) {
			result[i].comments = await this.getMainComments(result[i], conn);
		}
		return result;
	}

	/**
	 * 각각의 `result`에 대해 `getMainComments`를 해준 결과를 반환함
	 * @param {*} result board배열
	 * @param {*} conn mariadb.getConnection()한 결과
	 * @returns
	 */
	static async getRecruitPostsForAllResult(result, conn) {
		if (!Array.isArray(result)) return result;
		for (let i = 0; i < result.length; i++) {
			result[i].recruitPosts = await this.getRecruitPosts(
				result[i],
				conn
			);
		}
		return result;
	}

	static async getRecommendersForAllResult(result, conn) {
		if (!Array.isArray(result)) return result;
		for (let i = 0; i < result.length; i++) {
			result[i].recommenders = await this.getRecommenders(
				result[i],
				conn
			);
		}
		return result;
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
		if (result.length === 0) return [];
		result = await this.getMainCommentsForAllResult(result, conn);
		result = await this.getRecruitPostsForAllResult(result, conn);
		result = await this.getRecommendersForAllResult(result, conn);
		delete result.meta;

		conn.release();

		return result;
	}
	static async postBoard({ categoryKey, title, body, userKey }) {
		const sql = `INSERT INTO Post(userKey, title, body, categoryKey) VALUES (?, ?, ?, ?);`;
		console.log(categoryKey, title, body, userKey);
		const result = await mariadb.query(sql, [
			userKey,
			title,
			body,
			categoryKey,
		]);
		console.log(result);
		result.insertId = Number(result.insertId);

		return result;
	}
	static async queryBoard(condition /*{ title, username, content, tag }*/) {
		const { title, username, content, tag } = condition;
		let sql = "SELECT * FROM `Post` ";
		const queryValue = [];

		for (let c in condition) if (c) { sql += "WHERE "; break; } // if any of condition has value
		for (let cond in condition) {
			if (condition[cond] == undefined) continue;
			if (cond == "title") {
				sql += "`title` LIKE CONCAT('%', ? '%') AND ";
				queryValue.push(title);
			}
			if (cond == "username") {
				sql += "`userKey` in (SELECT `userKey` FROM `User` WHERE `User`.`userName` LIKE CONCAT('%', ? '%')) AND ";
				queryValue.push(username);
			}
			if (cond == "content") {
				sql += "`body` LIKE CONCAT('%', ? '%') AND ";
				queryValue.push(content);
			}
			// if (cond == "tag"){
			// 	sql += "`tag` LIKE CONCAT('%', ? '%') ";
			// 	queryValue.push(title);
			// }
		}
		for (let c in condition) if (c) { sql += "TRUE;"; break; } // if any of condition has value

		const result = await mariadb.query(sql, queryValue);
		return result;
	}
	static async getAllTags() {
		const sql = `SELECT categoryName FROM Category`;
		const result = await mariadb.query(sql);

		return result;
	}
	static async getbyBoardId(postKey) {
		let sql = `
			SELECT p.postKey, p.userKey, p.categoryKey, c.categoryName, p.postTime, p.title, p.body, p.viewCount
			FROM Post as p
			LEFT JOIN Category as c ON c.categoryKey=p.categoryKey
			WHERE p.postKey=?
			`;

		const conn = await mariadb.getConnection();
		let result = await conn.query(sql, [postKey]);
		if (result.length === 0) return [];
		result = result[0];
		result = await this.getMainCommentsForAllResult(result);
		result = await this.getRecruitPostsForAllResult(result);
		result = await this.getRecommendersForAllResult(result);
		delete result.meta;

		conn.release();

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
			new Error("there is nothing to update");
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
		conn.release();
		return result.affectedRows === 1;
	}
}

async function getTagId(tag, conn) {
	const sql = `SELECT categoryKey FROM Category WHERE categoryName=?`;
	const result = await conn.query(sql, [tag]);
	console.log(result);
	if (!result) {
	}
	return result[0].categoryKey;
}

async function getRecommendersbyBoardId(boardId, conn) {
	const sql = `SELECT userKey FROM Recommenders WHERE postKey=?`;
	const result = await conn.query(sql, [boardId]);
	return result;
}

async function getCommentsbyBoardId(boardId, conn) {
	const sql = `SELECT commentKey, userKey, commentTime, content, parentKey FROM Comment WHERE postKey=?`;
	const result = await conn.query(sql, [boardId]);
	const childComments = [],
		parentComments = [];
	result.map((comment) => {
		const {
			commentKey: commentId,
			userKey: userId,
			commentTime: time,
			content: body,
			parentKey,
		} = comment;
		if (comment.parentKey === null) {
			parentComments.push({
				commentId,
				userId,
				time,
				body,
				childComments: [],
			});
		} else childComments.push({ commentId, userId, time, body, parentKey });
	});
	childComments.forEach((comment) => {
		parentComments.forEach((parentcomment) => {
			if (parentcomment.commentKey === comment.parentKey) {
				delete comment.parentKey;
				parentcomment.childComments.push(comment);
			}
		});
	});
	return result;
}

async function getRecruitPostsbyBoardId(boardId, conn) {
	const sql = `SELECT recruitKey FROM CareerPost WHERE competitionKey=?`;
	const result = await conn.query(sql, [boardId]);
	return result;
}

async function updateViewCount(boardId, conn) {
	const sql = `UPDATE Post SET viewCount=viewCount+1 WHERE postKey=?`;
	const result = await conn.query(sql, [boardId]);
	console.log(result);
}

async function deleteRecruit(boardId, conn) {
	const sql = `SELECT recruitKey FROM CareerPost WHERE competitionKey=?`;
	const result = await conn.query(sql, [boardId]);
	if (result.length > 0) {
		const clauses = [],
			values = [];
		result.forEach((ele) => {
			clauses.push("postKey=?");
			values.push(ele.recruitKey);
		});
		const sql2 = `DELETE FROM Post WHERE ${clauses.join(" OR ")}`;
		const result2 = await conn.query(sql2, values);
	}
}
