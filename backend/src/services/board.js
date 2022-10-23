import Post from "../models/Post.js";

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

	static getAllCategories() {
		return Post.getAllCategories();
	}

	static getbyBoardId(boardId, userKey) {
		return Post.getbyBoardId(boardId, userKey);
	}

	static fixbyBoardId(boardId, newInfo) {
		return Post.fixbyBoardId(boardId, newInfo);
	}

	static deletebyBoardId(boardId, userKey) {
		return Post.deletebyBoardId(boardId, userKey);
	}
}
