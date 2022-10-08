import { Router } from "express";

const router = Router();

router.post("/write", (req, res) => {
	res.send(`Posting article`);
});

router
	.route("/:articleId")
	.get((req, res) => {
		res.send(`Getting articleId ${req.params.articleId}`);
	})
	.put((req, res) => {
		res.send(`Putting articleId ${req.params.articleId}`);
	});

router
	.route("/:articleId/comment")
	.post((req, res) => {
		res.send(`Getting comment in article ${req.params.articleId}`);
	})
	.delete((req, res) => {
		res.send(`Deleting comment in article ${req.params.articleId}`);
	});

export default router;
