// @ts-check
import Comment from "../models/Comment.js";

export default class commentService {
	/**
	 *
	 * @param {number} userKey
	 * @param {{postKey: number, body: string, parentKey?: number}} commentInfo
	 * @returns
	 */
	static postComment(userKey, commentInfo) {
		return Comment.postComment(userKey, commentInfo);
	}

	/**
	 *
	 * @param {number} commentId
	 * @param {number} userKey
	 * @param {{body: string}} commentInfo
	 * @returns
	 */
	static updateCommentbycommentId(commentId, userKey, commentInfo) {
		return Comment.updateCommentbycommentId(
			commentId,
			userKey,
			commentInfo
		);
	}

	/**
	 *
	 * @param {number} commentId
	 * @param {number} userKey
	 * @returns
	 */
	static deleteCommentbycommentId(commentId, userKey) {
		return Comment.deleteCommentbycommentId(commentId, userKey);
	}
}
