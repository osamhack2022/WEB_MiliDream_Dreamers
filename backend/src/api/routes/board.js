import { Router } from "express";
import BoardService from "../../services/board.js";
import RecommendService from "../../services/recommend.js";
import { checkUserExist } from "../middlewares/index.js";
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
			const boards = await BoardService.getAllBoards(req.query);
			res.status(200).json({ boards });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	})
	.post(checkUserExist, async (req, res) => {
		try {
			const postDTO = { ...req.body, userKey: req.user.userKey };
			const postKey = await BoardService.postBoard(postDTO);
			res.status(200).json({ postKey });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	});

// 특정 게시글을 가져온다. title과 tags를 query parameter로 받아 검색한다.
router.get("/query", async (req, res) => {
	try {
		const boards = await BoardService.queryBoard(req.query);
		res.status(200).json({ boards });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
});

router.get("/category", async (req, res) => {
	try {
		const category = await BoardService.getAllCategories();
		res.status(200).json({ category });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
});

// boardId만 주어진 경우
router
	.route("/:boardId")
	.all(checkUserExist)
	.get(async (req, res) => {
		try {
			const board = await BoardService.getbyBoardId(
				req.params.boardId,
				req.user.userKey
			);
			res.status(200).json({ board });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	})
	.put(async (req, res) => {
		try {
			const postDTO = req.body;
			await BoardService.fixbyBoardId(req.params.boardId, {
				...postDTO,
				userKey: req.user.userKey,
			});
			res.status(200).end();
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	})
	.delete(async (req, res) => {
		try {
			await BoardService.deletebyBoardId(
				req.params.boardId,
				req.user.userKey
			);
			res.status(200).end();
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	});

router
	.route("/:boardId/recommend")
	.get(async (req, res) => {
		try {
			const result = await RecommendService.getRecommendbyBoardId(
				req.params.boardId
			);
			res.status(200).json(result);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	})
	.post(checkUserExist, async (req, res) => {
		try {
			const { recommendCount } =
				await RecommendService.postRecommendbyBoardId(
					req.params.boardId,
					req.user.userKey
				);
			res.status(200).json({ recommendCount });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	})
	.delete(checkUserExist, async (req, res) => {
		try {
			const { recommendCount } =
				await RecommendService.deleteRecommendbyBoardId(
					req.params.boardId,
					req.user.userKey
				);
			res.status(200).json({ recommendCount });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	});

export default router;
