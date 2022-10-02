import { Router } from "express";

const router = Router();

// 전체 목록을 가져온다.
router.get("/", (req, res) => {
	res.send("Show All Boards");
});

// 특정 게시글을 가져온다. title과 tags를 query parameter로 받아 검색한다.
router.get("/query", (req, res) => {
	console.log(req.query);
	res.send(
		`Send result for the query, which is ${req.query.title} and ${req.query.tags}`
	);
});

// boardId만 주어진 경우
router
	.route("/:boardId")
	.get((req, res) => {
		res.send(`Send back boards, boardId is ${req.params.boardId}`);
	})
	.post((req, res) => {
		res.send(`Posting boards, boardId is ${req.params.boardId}`);
	});

// boardId와 postId가 주어진 경우
router
	.route("/:boardId/:postId")
	.get((req, res) => {
		res.send(
			`Getting boards, boardId: ${req.params.boardId}, postId: ${req.params.postId}`
		);
	})
	.post((req, res) => {
		res.send(
			`Posting boards, boardId: ${req.params.boardId}, postId: ${req.params.postId}`
		);
	})
	.delete((req, res) => {
		res.send(
			`Deleting boards, boardId: ${req.params.boardId}, postId: ${req.params.postId}`
		);
	});

// boardId와 postId에 해당하는 댓글에 대한 처리
router
	.route("/:boardId/:postId/comment")
	.post((req, res) => {
		res.send(
			`Posting comment, boardId: ${req.params.boardId}, postId: ${req.params.postId}`
		);
	})
	.delete((req, res) => {
		res.send(
			`Deleting comment, boardId: ${req.params.boardId}, postId: ${req.params.postId}`
		);
	});

export default router;
