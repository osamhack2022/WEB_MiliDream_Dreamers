import Recommend from "../models/Recommend.js";

export default class recommendService {
	constructor() {}

	static getRecommendbyBoardId(postKey) {
		return Recommend.getRecommendbyBoardId(postKey);
	}

	static postRecommendbyBoardId(postKey, userKey) {
		return Recommend.postRecommendbyBoardId(postKey, userKey);
	}

	static deleteRecommendbyBoardId(postKey, userKey) {
		return Recommend.deleteRecommendbyBoardId(postKey, userKey);
	}
}
