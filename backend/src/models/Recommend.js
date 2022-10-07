import mariadb from "../loaders/mariadb";

const Recommend = function (recommend) {
	this.recommend = recommend;
};

Recommend.getRecommendbyBoardId = async function (boardId) {
	const sql = `SELECT userKey FROM Recommenders WHERE postKey=?;`;
	const result = mariadb.query(sql, [boardId]);

	return result;
};

async function recommendExist(boardId, userId, conn) {
	const sql = `SELECT 1 FROM Recommenders WHERE postKey=? AND userKey=?;`;
	const result = conn.query(sql, [boardId, userId]);

	return result.length > 0;
}

Recommend.postRecommendbyBoardId = async function (boardId, userId) {
	const conn = mariadb.getConnection();
	if (recommendExist(boardId, userId, conn)) {
		return false;
	}
	const sql = `INSERT INTO Recommenders(postKey, userKey) VALUES (?, ?);`;
	const result = mariadb.query(sql, [boardId, userId]);

	return result;
};

Recommend.deleteRecommendbyBoardId = async function (boardId, userId) {
	const sql = `DELETE FROM Recommenders WHERE postKey=? AND userKey=?`;
	const result = mariadb.query(sql, [boardId, userId]);

	return result;
};

export default Recommend;
