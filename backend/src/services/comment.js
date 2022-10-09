import * as Comment from "../models/Comment";

export default class commentService {
	constructor() { }

	static postComment(commentInfo) {
		return Comment.postComment(commentInfo);
	}

	static updateCommentbycommentId(commentId) {
		return Comment.updateCommentbycommentId(commentId);
	}

	static deleteCommentbycommentId(commentId) {
		return Comment.deleteCommentbycommentId(commentId);
	}
}
