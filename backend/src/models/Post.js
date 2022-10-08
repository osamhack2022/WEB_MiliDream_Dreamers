import mariadb from "../loaders/mariadb";
import Logger from "../loaders/logger";

/** Post 생성자 */
class Post {
	constructor(post) {
		this.userkey = post.userkey;
		this.postTime = post.postTime;
		this.title = post.title;
		this.body = post.body;
		this.categoryKey = post.categoryKey;
		this.carrerPostKey = post.carrerPostKey;
	}
	static async getAll(categoryKey) {
		const sql = `SELECT * FROM Post WHERE categoryKey = ${categoryKey} ;`;
		const result = await mariadb.query(sql);

		return result;
	}
	static async getAllBoards({ tag }) {
		const sql = `SELECT postKey, userKey, postTime, title, body, Post.categoryKey categoryKey, viewCount, categoryName FROM Post, Category WHERE Post.categoryKey=Category.categoryKey`;
		const queryValue = [];
		if (tag) {
			sql += `AND ㅇ=?`;
			queryValue.push(tag);
		}
		const result = await mariadb.query(sql, queryValue);

		return result;
	}
	static async postBoard({ tag, title, body, userId }) {
		const conn = await mariadb.getConnection();
		const tagId = await getTagId(tag, conn);
		const sql = `INSERT INTO Post(userKey, title, body, categoryKey) VALUES (?, ?, ?, ?)`;
		const result = await conn.query(sql, [userId, title, body, tagId]);
		conn.release();
		return result;
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
	static async getbyBoardId(boardId) {
		const sql = `
		SELECT userKey, postTime, title, body, viewCount, categoryName 
		FROM Post, Category 
		WHERE postKey=? AND Post.categoryKey=Category.categoryKey;`;

		const conn = await mariadb.getConnection();
		const result = await conn.query(sql, [boardId]);
		const {
			userKey: userId, postTime: time, title, body, viewCount, postType,
		} = result[0];

		updateViewCount(boardId, conn);

		const recommenders = await getRecommendersbyBoardId(boardId, conn);
		const recommenderCount = recommenders.length;

		const comments = await getCommentsbyBoardId(boardId, conn);

		const returnObject = {
			userId,
			time,
			title,
			body,
			viewCount,
			recommenderCount,
			recommenders,
			comments,
			postType,
		};

		if (postType === "대회") {
			const recruitPosts = await getRecruitPostsbyBoardId(boardId, conn);
			conn.release();
			return {
				...returnObject,
				recruitPosts,
			};
		}
		conn.release();
		return returnObject;
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


export default Post;
