import mariadb from "../loaders/mariadb";

export default class Recommend {
	constructor(recommend) {
		this.recommend = recommend;
	}
	static async getRecommendbyBoardId(boardId) {
		const sql = `SELECT userKey FROM Recommenders WHERE postKey=?;`;
		const result = mariadb.query(sql, [boardId]);

		return result;
	}
	static async postRecommendbyBoardId(boardId, userId) {
		if (recommendExist(boardId, userId)) {
			return false;
		}
		const sql = `INSERT INTO Recommenders(postKey, userKey) VALUES (?, ?);`;
		const result = mariadb.query(sql, [boardId, userId]);
	
		return result;
	}
	static async deleteRecommendbyBoardId(boardId, userId) {
		const sql = `DELETE FROM Recommenders WHERE postKey=? AND userKey=?`;
		const result = mariadb.query(sql, [boardId, userId]);

		return result;
	}
}

async function recommendExist(boardId, userId) {
	const sql = `SELECT 1 FROM Recommenders WHERE postKey=? AND userKey=?;`;
	const result = mariadb.query(sql, [boardId, userId]);

	return result.length > 0;
}