import * as Comment from "../models/Comment";

export default class commentService {
	constructor() {}

	postComment(commentInfo) {
		return Comment.postComment(commentInfo);
	}

	updateCommentbycommentId(commentId) {
		return Comment.updateCommentbycommentId(commentId);
	}

	deleteCommentbycommentId(commentId) {
		return Comment.deleteCommentbycommentId(commentId);
	}
}
