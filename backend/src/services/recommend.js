import Recommend from "../models/Recommend";

export default class recommendService {
	constructor() { }

	static getRecommendbyBoardId(boardId) {
		return Recommend.getRecommendbyBoardId(boardId);
	}

	static postRecommendbyBoardId(boardId) {
		return Recommend.postRecommendbyBoardId(boardId);
	}

	static deleteRecommendbyBoardId(boardId) {
		return Recommend.deleteRecommendbyBoardId(boardId);
	}
}
