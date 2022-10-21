import { Router } from "express";
import commentService from "../../services/comment.js";
import { checkUserExist } from "../middlewares/index.js";

const router = Router();

router.use(checkUserExist);

router.post("/", async (req, res) => {
	try {
		await commentService.postComment(req.user.userKey, req.body);
		res.status(200).end();
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
});

router
	.route("/:commentId")
	.put(async (req, res) => {
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
	})
	.delete(async (req, res) => {
		try {
			await commentService.deleteCommentbycommentId(
				req.params.commentId,
				req.user.userKey
			);
			res.status(200).end();
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	});

export default router;
