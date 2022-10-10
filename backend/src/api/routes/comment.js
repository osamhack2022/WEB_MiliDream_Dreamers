import { Router } from "express";
import commentService from "../../services/comment";

const router = Router();

router.post("/", (req, res) => {
	const result = commentService.postComment();
	res.json(result);
});

router
	.route("/:commentId")
	.put((req, res) => {
		const result = commentService.updateCommentbycommentId();
		res.status(result ? 200 : 400).end();
	})
	.delete((req, res) => {
		const result = commentService.deleteCommentbycommentId();
		res.status(result ? 204 : 400).end();
	});

export default router;
