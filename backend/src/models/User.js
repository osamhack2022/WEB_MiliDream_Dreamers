// @ts-check
import mariadb from "../loaders/mariadb.js";
import Logger from "../loaders/logger.js";
/** @typedef {{affectedRows: number, insertId: number, warningStatus: number}} writeResultSet */
/**
 * @typedef UserType
 * @property {number} userKey
 * @property {string} userName User의 이름
 * @property {string} userId 로그인할 때 사용하는 id
 * @property {number} userClass User가 어떤 클래스에 속하는지
 * @property {string} classType
 */
export default class User {
	/**
	 * `userKey`인 사용자에 대한 정보를 반환합니다.
	 *
	 * @param {number | string} userKey User를 구분하는 key
	 * @returns password를 제외한 User의 정보를 담음
	 * @throws {Error}
	 */
	static async getUserInfo(userKey) {
		const sql = `SELECT userKey, userName, id as userId, User.classKey as userClass, Class.classContent as classType 
			FROM User, Class 
			WHERE userKey=? AND User.classKey=Class.classKey;`;
		try {
			/** @type {UserType[]} */
			const result = await mariadb.query(sql, [userKey]);
			if (!result) throw Error(`userKey="${userKey}"인 유저 없음`);
			return result[0];
		} catch (err) {
			throw err;
		}
	}

	/**
	 * `newInfo`를 바탕으로 사용자 정보를 수정합니다.
	 *
	 * @param {number | string} userKey User를 구분하는 key
	 * @param {{new_password: string}} newInfo User에 갱신될 정보
	 * @returns
	 * @throws {Error}
	 */
	static async putUserInfo(userKey, { new_password }) {
		const sql = "UPDATE User SET passwd=? WHERE userKey=?;";
		try {
			/** @type {writeResultSet} */
			const result = await mariadb.query(sql, [new_password, userKey]);
			if (result.affectedRows !== 1) {
				throw Error("Couldn't update the userInfo");
			}

			Logger.info(`Updated user info, successed, userKey=${userKey}`);

			return;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * `userAvaterInfo`를 기반으로 사용자의 아바타 사진을 업로드합니다.
	 *
	 * @param {number} userKey
	 * @param {{imageURL: string}} userAvatarInfo
	 * @returns
	 * @throws {Error}
	 */
	static async putUserAvatarInfo(userKey, { imageURL }) {
		const sql = "UPDATE User SET imgUrl=? WHERE userKey=?;";
		try {
			const result = await mariadb.query(sql, [imageURL, userKey]);
			if (result.affectedRows !== 1)
				throw Error("Image를 제대로 업로드하지 못했습니다.");
			return;
		} catch (err) {
			throw err;
		}
	}
}
