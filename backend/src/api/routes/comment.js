import { Router } from "express";
import commentService from "../../services/comment.js";
import { checkUserExist } from "../middlewares/index.js";

const router = Router();

router.use(checkUserExist);

router.post(
	"/",
	/**
	 * API: POST /comment
	 *
	 * body: {postKey, body, parentKey?}
	 *
	 * 로그인되어 있어야 합니다.
	 * 입력한 값을 토대로 댓글을 등록합니다.
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		try {
			const comment = await commentService.postComment(
				req.user.userKey,
				req.body
			);
			res.status(200).json({ comment });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}
);

router
	.route("/:commentId")
	.put(
		/**
		 * API: /comment/:commentId
		 *
		 * body: {body}
		 *
		 * 로그인되어 있어야 합니다.
		 * commentId인 댓글의 본문을 수정합니다.
		 *
		 * @param {import("express").Request} req
		 * @param {import("express").Response} res
		 */
		async (req, res) => {
			try {
				await commentService.updateCommentbycommentId(
					req.params.commentId,
					req.user.userKey,
					req.body
				);
				res.status(200).end();
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		}
	)
	.delete(
		/**
		 * API: DELETE /comment/:commentId
		 *
		 * 로그인되어 있어야 합니다.
		 * commentId인 댓글을 삭제합니다.
		 *
		 * @param {import("express").Request} req
		 * @param {import("express").Response} res
		 */
		async (req, res) => {
			try {
				await commentService.deleteCommentbycommentId(
					req.params.commentId,
					req.user.userKey
				);
				res.status(200).end();
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		}
	);

export default router;
