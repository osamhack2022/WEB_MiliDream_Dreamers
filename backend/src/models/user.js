import mariadb from "../loaders/mariadb";
import Logger from "../loaders/logger";

export default class User {
	constructor(user) {
		this.user = user;
	}
	/**
	 * @typedef User
	 * @property {string} userName User의 이름
	 * @property {string} id 로그인할 때 사용하는 id
	 * @property {string} classType User가 어떤 클래스에 속하는지
	 */
	/**
	 *
	 * @param {number | string} userId User를 구분하는 key
	 * @returns {Promise<User?>} password를 제외한 User의 정보를 담음
	 */
	static async getUserInfo(userId) {
		const sql = "SELECT userName, id, classType FROM User, Class WHERE userKey=? AND User.classKey=Class.classKey;";
		const result = await mariadb.query(sql, [userId]);
		if (!result)
			return null;
		const { userName, id, classType } = result[0];

		return { userName, id, classType };
	}
	/**
	 *
	 * @param {number | string} userId User를 구분하는 key
	 * @param {{new_password: string}} newInfo User에 갱신될 정보
	 *
	 * @param {boolean} 성공했는지 여부
	 */
	static async putUserInfo(userId, { new_password }) {
		const sql = "UPDATE User SET passwd=? WHERE userKey=?;";
		const result = await mariadb.query(sql, [new_password, userId]);
		Logger.info(`Updated user info, successed: ${result.affectedRows === 1}`);
		return result.affectedRows === 1;
	}
}
