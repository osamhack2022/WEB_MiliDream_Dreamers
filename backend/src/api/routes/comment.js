import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
	res.send("Posting comment");
});

router
	.route("/:commentId")
	.put((req, res) => {
		res.send(`Fixing comment, commentId is ${req.params.commentId}`);
	})
	.delete((req, res) => {
		res.send(`Deleting comment, commentId is ${req.params.commentId}`);
	});

export default router;
