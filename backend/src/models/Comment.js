import mariadb from "../loaders/mariadb";
const Comment = function (comment) {
	this.comment = comment;
};

Comment.postComment = async function ({ userId, boardId, content, parentId }) {
	const sql = `INSERT INTO Comment(userKey, content, postKey, parentKey) VALUES (?, ?, ?, ?);`;
	const result = mariadb.query(sql, [userid, content, boardId, parentId]);

	return result;
};

Comment.updateCommentbycommentId = async function (commentId, { body }) {
	const sql = `UPDATE Comment SET content=? WHERE commentKey=?;`;
	const result = mariadb.query(sql, [body, commentId]);

	return result.affectedRows > 0;
};

Comment.deleteCommentbycommentId = async function (commentId) {
	const sql = `DELETE FROM Comment WHERE commentKey=?;`;
	const result = mariadb.query(sql, [commentId]);

	return result.affectedRows > 0;
};
