// @ts-check

import mariadb from "../loaders/mariadb.js";
/** @typedef {{affectedRows: number; insertId: number; warningStatus: number;}} writeResultSet */
/** @typedef {{commentKey: number; userKey: number; commentTime: string; body: string;}} childComment */

/**
 * `commentKey`를 이용해 댓글을 반환합니다.
 *
 * @param {number} commentKey
 * @returns
 */
async function getCommentbyCommentKey(commentKey) {
	const sql = `SELECT commentKey, userKey, body, commentTime FROM Comment WHERE commentKey=?`;
	/** @type {childComment[]} */
	const result = await mariadb.query(sql, [commentKey]);
	return result[0];
}

export default class Comment {
	/**
	 * `commentInfo`를 이용해 댓글을 작성합니다.
	 *
	 * @param {number} userKey
	 * @param {{postKey: number; body: string; parentKey?: number}} commentInfo
	 * @returns
	 * @throws {Error}
	 */
	static async postComment(userKey, { postKey, body, parentKey }) {
		if (!userKey || !postKey || !body) {
			throw Error(
				`입력값이 충분하지 않음, userKey="${userKey}", postKey="${postKey}", body="${body}"`
			);
		}
		const sql = `INSERT INTO Comment(userKey, body, postKey, parentKey) VALUES (?, ?, ?, ?);`;
		/** @type {writeResultSet} */
		const result = await mariadb.query(sql, [
			userKey,
			body,
			postKey,
			parentKey ?? null,
		]);

		if (result.affectedRows === 0) {
			throw Error(`댓글을 입력할 수 없음`);
		}

		return getCommentbyCommentKey(Number(result.insertId));
	}

	/**
	 * `commentKey`인 댓글을 수정합니다. 그 댓글을 `userKey`가 작성하지 않았다면 실패합니다.
	 *
	 * @param {number} commentKey
	 * @param {number} userKey
	 * @param {{body: string;}} param2
	 * @returns
	 * @throws {Error}
	 */
	static async updateCommentbycommentId(commentKey, userKey, { body }) {
		const sql = `UPDATE Comment SET body=? WHERE commentKey=? AND userKey=?;`;
		/** @type {writeResultSet} */
		const result = await mariadb.query(sql, [body, commentKey, userKey]);
		if (result.affectedRows === 0) {
			throw Error(
				`commentKey="${commentKey}"인 댓글 업데이트 할 수 없음`
			);
		}

		return;
	}

	/**
	 * `commentKey`인 댓글을 삭제합니다. 그 댓글을 `userKey`가 작성하지 않았다면 실패합니다.
	 *
	 * @param {number} commentKey
	 * @param {number} userKey
	 * @returns
	 * @throws {Error}
	 */
	static async deleteCommentbycommentId(commentKey, userKey) {
		const sql = `DELETE FROM Comment WHERE commentKey=? AND userKey = ?;`;
		/** @type {writeResultSet} */
		const result = await mariadb.query(sql, [commentKey, userKey]);
		if (result.affectedRows === 0) {
			throw Error(`commentKey="${commentKey}"에 해당하는 댓글 없음`);
		}

		return;
	}
}
