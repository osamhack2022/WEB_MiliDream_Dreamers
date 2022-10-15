import { Router } from "express";
import BoardService from "../../services/board";
import RecommendService from "../../services/recommend";
/**
 * @todo multer 머지 후 app.post에 upload.array('postImages') 적용
 */
const router = Router();

const REQUIRE_SESSION_MSG = "Method requires authentication.";
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
			/** @todo 유저 인증 추후 활성화 */
			// if (!req.user) res.status(401).json({ err: REQUIRE_SESSION_MSG });
			const postDTO = { ...req.body, userKey: req.user.userId || 1 };
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
	.get((req, res) => {
		RecommendService.getRecommendbyBoardId(req.params.boardId);

		res.send(`Getting board recommend, boardId is ${req.params.boardId}`);
	})
	.post((req, res) => {
		RecommendService.postRecommendbyBoardId(req.params.boardId);

		res.send(`Uploading board recommend, boardId is ${req.params.boardId}`);
	})
	.delete((req, res) => {
		RecommendService.deleteRecommendbyBoardId(req.params.boardId);

		res.send(`Deleting board recommend, boardId is ${req.params.boardId}`);
	});

export default router;
