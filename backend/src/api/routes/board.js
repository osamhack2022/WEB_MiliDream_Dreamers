import { Router } from "express";

const router = Router();

// 전체 목록을 가져온다.
router
	.route("/")
	.get((req, res) => {
		res.send("Show All Boards");
	})
	.post((req, res) => {
		res.send("Upload board");
	});

// 특정 게시글을 가져온다. title과 tags를 query parameter로 받아 검색한다.
router.get("/query", (req, res) => {
	console.log(req.query);
	res.send(
		`Send result for the query, which is ${req.query.title} and ${req.query.tags}`
	);
});

router.get("/tags", (req, res) => {
	res.send("Send tag lists");
});

// boardId만 주어진 경우
router
	.route("/:boardId")
	.get((req, res) => {
		res.send(`Send back boards, boardId is ${req.params.boardId}`);
	})
	.put((req, res) => {
		res.send(`Fix board, boardId is ${req.params.boardId}`);
	})
	.delete((req, res) => {
		res.send(`Deleting board, boardId is ${req.params.boardId}`);
	});

router
	.route("/:boardId/recommend")
	.get((req, res) => {
		res.send(`Getting board recommend, boardId is ${req.params.boardId}`);
	})
	.post((req, res) => {
		res.send(`Uploading board recommend, boardId is ${req.params.boardId}`);
	})
	.delete((req, res) => {
		res.send(`Deleting board recommend, boardId is ${req.params.boardId}`);
	});

export default router;
