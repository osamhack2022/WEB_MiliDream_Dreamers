import Post from "../models/Post";

export default class BoardService {
	constructor() {}

	getAllBoards(info) {
		return Post.getAllBoards(info);
	}

	postBoard(info) {
		return Post.postBoard(info);
	}

	queryBoard(queryInfo) {
		return Post.queryBoard(queryInfo);
	}

	getAllTags() {
		return Post.getAllTags();
	}

	getbyBoardId(boardId) {
		return Post.getbyBoardId(boardId);
	}

	fixbyBoardId(boardId, newInfo) {
		return Post.fixbyBoardId(boardId, newInfo);
	}

	deletebyBoardId(boardId) {
		return Post.deletebyBoardId(boardId);
	}
}
