import Comment from "../models/Comment";

export default class commentService {
	constructor() {}

	static postComment(commentInfo) {
		return Comment.postComment(commentInfo);
	}

	static updateCommentbycommentId(commentId, commentInfo) {
		return Comment.updateCommentbycommentId(commentId, commentInfo);
	}

	static deleteCommentbycommentId(commentId) {
		return Comment.deleteCommentbycommentId(commentId);
	}
}
