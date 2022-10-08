import mariadb from "../loaders/mariadb";
class Comment {
	constructor(comment) {
		this.comment = comment;
	}
	static async postComment({ userId, boardId, content, parentId }) {
		const sql = `INSERT INTO Comment(userKey, content, postKey, parentKey) VALUES (?, ?, ?, ?);`;
		const result = mariadb.query(sql, [userid, content, boardId, parentId]);

		return result;
	}
	static async updateCommentbycommentId(commentId, { body }) {
		const sql = `UPDATE Comment SET content=? WHERE commentKey=?;`;
		const result = mariadb.query(sql, [body, commentId]);

		return result.affectedRows > 0;
	}
	static async deleteCommentbycommentId(commentId) {
		const sql = `DELETE FROM Comment WHERE commentKey=?;`;
		const result = mariadb.query(sql, [commentId]);

		return result.affectedRows > 0;
	}
}