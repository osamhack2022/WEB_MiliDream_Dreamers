// @ts-check

import mariadb from "../loaders/mariadb.js";
/** @typedef {{affectedRows: number; insertId: number; warningStatus: number;}} writeResultSet */

/**
 * `postKey`인 게시글의 추천수를 반환합니다.
 *
 * @param {number} postKey
 * @param {import("mariadb").PoolConnection} conn
 */
async function countRecommenders(postKey, conn) {
	const sql = `SELECT 1 FROM Recommenders as r WHERE r.postKey=?;`;

	/** @type {{'1': 1}[]} */
	const result = await conn.query(sql, [postKey]);
	console.log(result);
	return result.length;
}

/**
 * `postKey`에 `userKey`가 추천했는지를 반환합니다.
 *
 * @param {*} postKey
 * @param {*} userKey
 * @param {import("mariadb").PoolConnection} conn
 * @returns
 */
async function recommendExist(postKey, userKey, conn) {
	const sql = `SELECT 1 FROM Recommenders WHERE postKey=? AND userKey=?;`;
	/** @type {{'1' : 1}[]} */
	const result = await conn.query(sql, [postKey, userKey]);

	return result.length > 0;
}

export default class Recommend {
	/**
	 * `postKey`의 추천자 리스트를 반환합니다.
	 *
	 * @param {number} postKey
	 * @returns
	 * @throws {Error}
	 */
	static async getRecommendbyBoardId(postKey) {
		const sql = `SELECT userKey FROM Recommenders WHERE postKey=?;`;
		try {
			/** @type {{userKey: number;}[]} */
			const result = await mariadb.query(sql, [postKey]);

			return result.map(({ userKey }) => userKey);
		} catch (err) {
			throw err;
		}
	}

	/**
	 * `postKey`인 게시글에 `userKey`인 사용자의 추천을 추가합니다.
	 * 만약 이미 추가했다면 오류를 반환합니다.
	 * 추가에 성공했다면 추천수 결과를 반환합니다.
	 *
	 * @param {number} postKey
	 * @param {number} userKey
	 * @returns
	 * @throws {Error}
	 */
	static async postRecommendbyBoardId(postKey, userKey) {
		const sql = `INSERT INTO Recommenders(postKey, userKey) VALUES (?, ?);`;
		if (!userKey) {
			throw Error("userKey가 주어지지 않았습니다");
		}
		const conn = await mariadb.getConnection();
		try {
			if (await recommendExist(postKey, userKey, conn)) {
				throw Error(`userKey="${userKey}"는 이미 추천했습니다`);
			}
			/** @type {writeResultSet} */
			const result = await conn.query(sql, [postKey, userKey]);
			if (result.affectedRows === 0) throw Error("추천하지 못했습니다");

			return countRecommenders(postKey, conn);
		} catch (err) {
			throw err;
		} finally {
			await conn.release();
		}
	}

	/**
	 * `postKey`에 추천한 `userKey`를 삭제합니다.
	 * 만약 추천하지 않았다면 오류를 반환합니다.
	 * 추천 삭제에 성공했다면 추천수 결과를 반환합니다.
	 *
	 * @param {number} postKey
	 * @param {number} userKey
	 * @returns
	 * @throws {Error}
	 */
	static async deleteRecommendbyBoardId(postKey, userKey) {
		const sql = `DELETE FROM Recommenders WHERE postKey=? AND userKey=?;`;
		const conn = await mariadb.getConnection();
		try {
			/** @type {writeResultSet} */
			const result = await conn.query(sql, [postKey, userKey]);
			if (result.affectedRows === 0) {
				throw Error(
					`userKey="${userKey}"는 postKey="${postKey}"에 추천하지 않았습니다`
				);
			}

			return countRecommenders(postKey, conn);
		} catch (err) {
			throw err;
		} finally {
			await conn.release();
		}
	}
}
