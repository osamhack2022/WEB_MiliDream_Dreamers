import Recommend from "../models/Recommend";

export default class recommendService {
	constructor() {}

	static getRecommendbyBoardId(postKey, userInfo) {
		return Recommend.getRecommendbyBoardId(postKey, userInfo);
	}

	static postRecommendbyBoardId(postKey, userInfo) {
		return Recommend.postRecommendbyBoardId(postKey, userInfo);
	}

	static deleteRecommendbyBoardId(postKey, userInfo) {
		return Recommend.deleteRecommendbyBoardId(postKey, userInfo);
	}
}
