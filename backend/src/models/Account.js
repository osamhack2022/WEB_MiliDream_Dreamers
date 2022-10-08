import mariadb from "../loaders/mariadb";

export default class Account {
	static async create({ username, userId, password, classKey }) {
		const sql = "INSERT INTO `User` (`userKey`, `userName`, `id`, `passwd`, `classKey`) VALUES (NULL, ?, ?, sha2(?, 256), ?)";
		const conn = await mariadb.getConnection();
		const result = await conn.query(sql, [username, userId, password, classKey]);
		conn.release();
		return result.affectedRows === 1;
	}

	static async hasUserId(userId) {
		const sql = 'SELECT 1 FROM `User` WHERE `id` = ?;';
		const conn = await mariadb.getConnection();
		const result = await conn.query(sql, [userId]);
		conn.release();
		return result.length !== 0;
	}

	static async hasUsername(username) {
		const sql = 'SELECT 1 FROM `User` WHERE `userName` = ?;';
		const conn = await mariadb.getConnection();
		const result = await conn.query(sql, [username]);
		conn.release();
		return result.length !== 0;
	}
}