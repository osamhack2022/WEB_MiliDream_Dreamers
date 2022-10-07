import Recommend from "../models/Recommend";

export default class recommendService {
	constructor() {}

	getRecommendbyBoardId(boardId) {
		return Recommend.getRecommendbyBoardId(boardId);
	}

	postRecommendbyBoardId(boardId) {
		return Recommend.postRecommendbyBoardId(boardId);
	}

	deleteRecommendbyBoardId(boardId) {
		return Recommend.deleteRecommendbyBoardId(boardId);
	}
}
