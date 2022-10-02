import { Router } from "express";
const router = Router();


router.get('/result/:typeId', (req, res) => {
	res.send('Result content by survey type')
})



// Board Route
router.get('/board', (req, res) => {
	res.send('Boards list by survey type')
})

router.get('/board/:typeId', (req, res) => {
	res.send('article of board by survey type')
})

router.post("/board/:typeId/write", (req, res) => {
	res.send(`article write by surveytype`);
});


router
	.route("/board/:typeId/:articleId")
	.get((req, res) => {
		res.send(`Getting articleId ${req.params.articleId}`);
	})
	.put((req, res) => {
		res.send(`Putting articleId ${req.params.articleId}`);
	})
	.delete((req, res) => {
		res.send(`Delete articleId ${req.params.articleId}`)
	})

router
	.route("/board/:typeId/:articleId/comment")
	.post((req, res) => {
		res.send(`Posting comment in article ${req.params.articleId}`);
	})
	.delete((req, res) => {
		res.send(`Deleting comment in article ${req.params.articleId}`);
	});


export default router;