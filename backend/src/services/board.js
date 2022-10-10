import Post from "../models/Post";

export default class BoardService {
	static getAllBoards(info) {
		return Post.getAllBoards(info);
	}

	static postBoard(info) {
		return Post.postBoard(info);
	}

	static queryBoard(queryInfo) {
		return Post.queryBoard(queryInfo);
	}

	static getAllTags() {
		return Post.getAllTags();
	}

	static getbyBoardId(boardId) {
		return Post.getbyBoardId(boardId);
	}

	static fixbyBoardId(boardId, newInfo) {
		return Post.fixbyBoardId(boardId, newInfo);
	}

	static deletebyBoardId(boardId) {
		return Post.deletebyBoardId(boardId);
	}
}
