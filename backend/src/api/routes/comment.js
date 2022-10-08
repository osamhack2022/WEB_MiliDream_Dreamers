import { Router } from "express";
import commentService from "../../services/comment";

const router = Router();
const commentServiceInstance = new commentService;

router.post("/", (req, res) => {
	const result = commentServiceInstance.postComment();
	res.json(result);
});

router
	.route("/:commentId")
	.put((req, res) => {
		const result = commentServiceInstance.updateCommentbycommentId();
		res.status(result ? 200 : 400).end();
	})
	.delete((req, res) => {
		const result = commentServiceInstance.deleteCommentbycommentId();
		res.status(result ? 204 : 400).end();
	});

export default router;
