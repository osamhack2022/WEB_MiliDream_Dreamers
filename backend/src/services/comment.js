import Comment from "../models/Comment.js";

export default class commentService {
	static postComment(userKey, commentInfo) {
		return Comment.postComment(userKey, commentInfo);
	}

	static updateCommentbycommentId(commentId, userKey, commentInfo) {
		return Comment.updateCommentbycommentId(
			commentId,
			userKey,
			commentInfo
		);
	}

	static deleteCommentbycommentId(commentId, userKey) {
		return Comment.deleteCommentbycommentId(commentId, userKey);
	}
}
