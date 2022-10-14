import { Router } from "express";
import BoardService from "../../services/board.js";
import RecommendService from "../../services/recommend.js";

const router = Router();

// 전체 목록을 가져온다.
router
	.route("/")
	.get(async (req, res) => {
		try {
			const result = await BoardService.getAllBoards(req.query);
			res.json(result);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	})
	.post(async (req, res) => {
		try {
			const postDTO = req.body;
			const result = await BoardService.postBoard(postDTO);
			res.json(result);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	});

// 특정 게시글을 가져온다. title과 tags를 query parameter로 받아 검색한다.
router.get("/query", async (req, res) => {
	try {
		const result = await BoardService.queryBoard(req.query);
		res.json(result);
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
});

router.get("/tags", async (req, res) => {
	try {
		const result = await BoardService.getAllTags();
		res.json(result);
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
});

// boardId만 주어진 경우
router
	.route("/:boardId")
	.get(async (req, res) => {
		try {
			const result = await BoardService.getbyBoardId(req.params.boardId);
			res.json(result);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	})
	.put(async (req, res) => {
		try {
			const postDTO = req.body;
			await BoardService.fixbyBoardId(req.params.boardId, postDTO);
			res.status(200).end();
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	})
	.delete(async (req, res) => {
		try {
			await BoardService.deletebyBoardId(req.params.boardId);
			res.status(204).end();
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	});

router
	.route("/:boardId/recommend")
	.get(async (req, res) => {
		try {
			const result = await RecommendService.getRecommendbyBoardId(
				req.params.boardId,
				req.query
			);
			res.status(200).json(result);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	})
	.post(async (req, res) => {
		try {
			await RecommendService.postRecommendbyBoardId(
				req.params.boardId,
				req.body
			);
			res.status(201).end();
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	})
	.delete(async (req, res) => {
		try {
			await RecommendService.deleteRecommendbyBoardId(
				req.params.boardId,
				req.body
			);
			res.status(204).end();
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	});

export default router;
