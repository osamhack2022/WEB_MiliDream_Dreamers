import mariadb from "../loaders/mariadb.js";
/**
 * @todo 추가된 유저 정보(군종, 소속, 입대일)에 맞춰  base.sql 수정 + 입력받는 로직 수정
 */
export default class Account {
	static async create({ username, userId, password, classKey }) {
		const sql = "INSERT INTO `User` (`userKey`, `userName`, `id`, `passwd`, `classKey`) VALUES (NULL, ?, ?, sha2(?, 256), ?)";
		const conn = await mariadb.getConnection();
		const result = await conn.query(sql, [username, userId, password, classKey]);
		conn.release();
		return result.affectedRows === 1;
	}

	/**
	 * 로그인 후 유저 정보를 반환합니다
	 *
	 * @static
	 * @param {*} { userId, password }
	 * @return {Promise<{userId: string, userName: string, userClass: number}>} 성공시 유저 객체, 실패시 false
	 * @memberof Account
	 */
	static async login({ userId, password }) {
		const sql = 'SELECT `userKey`, `userName`, `classKey` FROM `User` WHERE `id` = ? AND `passwd` = sha2(?, 256);';
		const conn = await mariadb.getConnection();
		const result = await conn.query(sql, [userId, password]);
		conn.release();

		if (result.length === 0) return false;
		return {
			userKey: result[0]["userKey"],
			userId: userId,
			userName: result[0]["userName"],
			userClass: result[0]["classKey"]
		};
	}

	static async remove({ userId }) {
		const sql = 'DELETE FROM `User` WHERE `User`.`id` = ?;';
		const conn = await mariadb.getConnection();
		const result = await conn.query(sql, [userId]);
		conn.release();

		return result.affectedRows == 1;
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