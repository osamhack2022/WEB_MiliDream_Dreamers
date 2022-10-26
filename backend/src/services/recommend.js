// @ts-check
import Recommend from "../models/Recommend.js";

export default class recommendService {
	/**
	 *
	 * @param {number} postKey
	 * @returns
	 */
	static getRecommendbyBoardId(postKey) {
		return Recommend.getRecommendbyBoardId(postKey);
	}

	/**
	 *
	 * @param {number} postKey
	 * @param {number} userKey
	 * @returns
	 * @throws {Error}
	 */
	static postRecommendbyBoardId(postKey, userKey) {
		return Recommend.postRecommendbyBoardId(postKey, userKey);
	}

	/**
	 *
	 * @param {number} postKey
	 * @param {number} userKey
	 * @returns
	 */
	static deleteRecommendbyBoardId(postKey, userKey) {
		return Recommend.deleteRecommendbyBoardId(postKey, userKey);
	}
}
