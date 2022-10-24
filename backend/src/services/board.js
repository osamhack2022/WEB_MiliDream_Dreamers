// @ts-check
import Post from "../models/Post.js";

export default class BoardService {
	/**
	 *
	 * @param {{categoryKey?:number}} info
	 * @returns
	 */
	static getAllBoards(info) {
		return Post.getAllBoards(info);
	}
	/**
	 *
	 * @param {{
	 *    categoryKey: number,
	 *    title: string,
	 *    body: string,
	 *    userKey: number,
	 *    careerPostKey?: number
	 *}} info
	 * @returns
	 */
	static postBoard(info) {
		return Post.postBoard(info);
	}

	/**
	 *
	 * @param {{title?: string, userName?: string, content?: string, tag?: string}} queryInfo
	 * @returns
	 */
	static queryBoard(queryInfo) {
		return Post.queryBoard(queryInfo);
	}

	static getAllCategories() {
		return Post.getAllCategories();
	}

	/**
	 *
	 * @param {number} boardId
	 * @param {number} userKey
	 * @returns
	 */
	static getbyBoardId(boardId, userKey) {
		return Post.getbyBoardId(boardId, userKey);
	}

	/**
	 *
	 * @param {number} boardId
	 * @param {{title: string, body: string, userKey:number}} newInfo
	 * @returns
	 */
	static fixbyBoardId(boardId, newInfo) {
		return Post.fixbyBoardId(boardId, newInfo);
	}

	/**
	 *
	 * @param {number} boardId
	 * @param {number} userKey
	 * @returns
	 */
	static deletebyBoardId(boardId, userKey) {
		return Post.deletebyBoardId(boardId, userKey);
	}
}
