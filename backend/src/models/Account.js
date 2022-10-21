import mariadb from "../loaders/mariadb";
/**
 * @todo 추가된 유저 정보(군종, 소속, 입대일)에 맞춰  base.sql 수정 + 입력받는 로직 수정
 */
export default class Account {
	static async create({ userName, userId, password, userClass }) {
		const sql =
			"INSERT INTO User (userKey, userName, id, passwd, classKey) VALUES (NULL, ?, ?, sha2(?, 256), ?)";
		try {
			const result = await mariadb.query(sql, [
				userName,
				userId,
				password,
				userClass,
			]);

			if (result.affectedRows !== 1) {
				throw Error("Could not insert");
			}
			return;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * 로그인 후 유저 정보를 반환합니다
	 *
	 * @static
	 * @param {*} { userId, password }
	 * @return {Promise<{userId: string, userName: string, userClass: number} | boolean>} 성공시 유저 객체, 실패시 false
	 * @memberof Account
	 */
	static async login({ userId, password }) {
		const sql =
			"SELECT userKey, id as userId, userName, classKey as userClass FROM User WHERE id = ? AND passwd = sha2(?, 256);";
		try {
			const result = await mariadb.query(sql, [userId, password]);

			if (result.length === 0) return false;
			return result[0];
		} catch (err) {
			throw err;
		}
	}

	static async remove({ userKey }) {
		const sql = "DELETE FROM User WHERE userKey = ?;";
		try {
			const result = await mariadb.query(sql, [userKey]);
			if (result.affectedRows !== 1) {
				throw Error("Could not delete user!");
			}
			return;
		} catch (err) {
			throw err;
		}
	}

	static async hasUserId(userId) {
		const sql = "SELECT 1 FROM User WHERE id = ?;";
		try {
			const result = await mariadb.query(sql, [userId]);
			return result.length !== 0;
		} catch (err) {
			throw err;
		}
	}

	static async hasUsername(username) {
		const sql = "SELECT 1 FROM User WHERE userName = ?;";
		try {
			const result = await mariadb.query(sql, [username]);
			return result.length !== 0;
		} catch (err) {
			throw err;
		}
	}
}
