// @ts-check

import mariadb from "../loaders/mariadb.js";
/** @typedef {{affectedRows: number, insertId: number, warningStatus: number}} writeResultSet */
/** @typedef {{userName: string, userId: string, passwd: string, classKey: number}} User */
/**
 * @typedef UserType
 * @property {number} userKey User의 고유숫자
 * @property {string} userName User의 이름
 * @property {string} id 로그인할 때 사용하는 id
 * @property {number} userClass User가 속하는 ClassKey
 * @property {string} classType User가 어떤 클래스에 속하는지
 */

/**
 * @todo 추가된 유저 정보(군종, 소속, 입대일)에 맞춰  base.sql 수정 + 입력받는 로직 수정
 */
export default class Account {
	/**
	 * 주어진 `userInfo`를 이용해 사용자를 등록합니다.
	 *
	 * @static
	 * @param {{userName: string; userId: string; password: string; userClass: number}} userInfo
	 * @returns
	 * @throws {Error}
	 */
	static async create({ userName, userId, password, userClass }) {
		const sql =
			"INSERT INTO User (userKey, userName, id, passwd, classKey) VALUES (NULL, ?, ?, sha2(?, 256), ?)";
		try {
			/** @type {writeResultSet} */
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
	 * 로그인에 실패한다면 false를 반환합니다.
	 *
	 * @static
	 * @memberof Account
	 * @param {{ userId: string, password: string; }} loginInfo
	 * @return 성공시 유저 객체, 실패시 false
	 * @throws {Error}
	 */
	static async login({ userId, password }) {
		const sql =
			"SELECT userKey, id as userId, userName, classKey as userClass FROM User WHERE id = ? AND passwd = sha2(?, 256);";
		try {
			/** @type {UserType[]} */
			const result = await mariadb.query(sql, [userId, password]);

			if (result.length === 0) return false;
			return result[0];
		} catch (err) {
			throw err;
		}
	}

	/**
	 * `userInfo`를 바탕으로 얻은 userKey를 이용해 사용자를 삭제합니다.
	 *
	 * @static
	 * @param {{userKey: number}} userInfo
	 * @returns
	 * @throws {Error}
	 */
	static async remove({ userKey }) {
		const sql = "DELETE FROM User WHERE userKey = ?;";
		try {
			/** @type {writeResultSet} */
			const result = await mariadb.query(sql, [userKey]);
			if (result.affectedRows !== 1) {
				throw Error("Could not delete user!");
			}
			return;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * userId가 중복되는지 검사합니다.
	 *
	 * @static
	 * @param {string} userId
	 * @returns
	 * @throws {Error}
	 */
	static async hasUserId(userId) {
		const sql = "SELECT 1 FROM User WHERE id = ?;";
		try {
			const result = await mariadb.query(sql, [userId]);
			return result.length !== 0;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * `userName`이 중복되는지 검사합니다.
	 *
	 * @static
	 * @param {string} userName
	 * @returns
	 * @throws {Error}
	 */
	static async hasUsername(userName) {
		const sql = "SELECT 1 FROM User WHERE userName = ?;";
		try {
			const result = await mariadb.query(sql, [userName]);
			return result.length !== 0;
		} catch (err) {
			throw err;
		}
	}
}
