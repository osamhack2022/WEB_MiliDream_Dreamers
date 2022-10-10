import { Router } from "express";
import commentService from "../../services/comment";

const router = Router();

router.post("/", async (req, res) => {
	try {
		const result = await commentService.postComment(req.body);
		res.status(201).end();
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
});

router
	.route("/:commentId")
	.put(async (req, res) => {
		try {
			const result = await commentService.updateCommentbycommentId(
				req.params.commentId,
				req.body
			);
			res.status(200).end();
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	})
	.delete(async (req, res) => {
		try {
			const result = await commentService.deleteCommentbycommentId(
				req.params.commentId
			);
			res.status(204).end();
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	});

export default router;
