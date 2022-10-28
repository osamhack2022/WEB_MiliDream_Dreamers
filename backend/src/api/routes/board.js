// @ts-check

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
	.get(
		/**
		 * API: GET /board
		 *
		 * `categoryKey`가 없다면 대회글과 사람모집글을 제외한 모든 게시글을 가져옵니다.
		 * `categoryKey`가 주어진다면 그 `categoryKey`에 해당하는 게시글을 가져옵니다.
		 *
		 * @param {import("express").Request} req
		 * @param {import("express").Response} res
		 */
		async (req, res) => {
			try {
				const boards = await BoardService.getAllBoards(req.query);
				res.status(200).json({ boards });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		}
	)
	.post(
		checkUserExist,
		/**
		 * API: POST /board
		 *
		 * body: {categoryKey: number; title: string; body: string; careerPostKey?: number;}
		 *
		 * 로그인되어 있는 상태여야 합니다.
		 * 게시글을 작성한 입력한 정보를 바탕으로 그 게시글을 DB에 추가시킵니다.
		 * 성공한다면 `200` 코드와 `postKey`를 반환합니다.
		 * 실패한다면 `400` 코드와 오류 메시지를 반환합니다.
		 *
		 * @param {import("express").Request} req
		 * @param {import("express").Response} res
		 */
		async (req, res) => {
			try {
				/** @type {{categoryKey: number; title: string; body: string; userKey: number; careerPostKey?: number;}} */
				const postDTO = {
					...req.body,
					categoryKey: Number(req.body.categoryKey),
					// @ts-ignore
					userKey: req.user.userKey,
				};
				const postKey = await BoardService.postBoard(postDTO);
				res.status(200).json({ postKey });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		}
	);

router.get(
	"/query",
	/**
	 * API: GET /board/query
	 * query: {title, userName, content, tag}
	 *
	 * query에 입력한 정보를 바탕으로 게시글을 검색하여 그 결과를 반환합니다.
	 *
	 * @param {import("express").Request<{}, any, any, {
	 *    title?: string;
	 *    userName?: string;
	 *    content?: string;
	 *    tag?: string;
	 *}>} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		try {
			const boards = await BoardService.queryBoard(req.query);
			res.status(200).json({ boards });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}
);

router.get(
	"/category",
	/**
	 * API: GET /board/category
	 *
	 * 카테고리 목록을 반환합니다.
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		try {
			const category = await BoardService.getAllCategories();
			res.status(200).json({ category });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}
);

// boardId만 주어진 경우
router
	.route("/:boardId")
	.get(
		/**
		 * API : GET /board/:boardId
		 *
		 * boardId에 해당하는 게시글을 반환합니다.
		 *
		 * @param {import("express").Request} req
		 * @param {import("express").Response} res
		 */
		async (req, res) => {
			try {
				const board = await BoardService.getbyBoardId(
					Number(req.params.boardId),
					// @ts-ignore
					req.user?.userKey
				);
				res.status(200).json({ board });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		}
	)
	.all(checkUserExist)
	.put(
		/**
		 * API: PUT /board/:boardId
		 *
		 * `boardId`인 게시글을 주어진 정보로 수정합니다.
		 *
		 * @param {import("express").Request} req
		 * @param {import("express").Response} res
		 */
		async (req, res) => {
			try {
				/** @type {{title: string; body: string;}} */
				const postDTO = req.body;
				// @ts-ignore
				await BoardService.fixbyBoardId(req.params.boardId, {
					...postDTO,
					// @ts-ignore
					userKey: req.user.userKey,
				});
				res.status(200).end();
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		}
	)
	.delete(
		/**
		 * API: DELETE /board/:boardId
		 *
		 * 로그인되어 있어야 합니다.
		 * boardId인 게시글을 삭제합니다.
		 *
		 * @param {import("express").Request} req
		 * @param {import("express").Response} res
		 */
		async (req, res) => {
			try {
				await BoardService.deletebyBoardId(
					// @ts-ignore
					req.params.boardId,
					// @ts-ignore
					req.user.userKey
				);
				res.status(200).end();
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		}
	);

router
	.route("/:boardId/recommend")
	.get(
		/**
		 * API: GET /board/:boardId/recommend
		 *
		 * boardId인 게시글에 추천한 사람 리스트를 반환합니다.
		 *
		 * @param {import("express").Request} req
		 * @param {import("express").Response} res
		 */
		async (req, res) => {
			try {
				const recommenderList =
					await RecommendService.getRecommendbyBoardId(
						// @ts-ignore
						req.params.boardId
					);
				res.status(200).json({ recommenderList });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		}
	)
	.post(
		checkUserExist,
		/**
		 * API: POST /board/:boardId/recommend
		 *
		 * 로그인되어 있어야 합니다.
		 * boardId에 대해 로그인한 사용자의 추천을 추가합니다.
		 * 이미 추천했다면 실패합니다.
		 *
		 * @param {import("express").Request} req
		 * @param {import("express").Response} res
		 */
		async (req, res) => {
			try {
				const recommendCount =
					await RecommendService.postRecommendbyBoardId(
						// @ts-ignore
						req.params.boardId,
						// @ts-ignore
						req.user.userKey
					);
				res.status(200).json({ recommendCount });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		}
	)
	.delete(
		checkUserExist,
		/**
		 * API: DELETE /board/:boardId/recommend
		 *
		 * 로그인되어 있어야 합니다.
		 * 로그인되어 있는 유저가 boardId에 한 추천을 삭제합니다.
		 * 만약 추천하지 않았다면 `400` 에러를 에러 메시지와 함께 반환합니다.
		 * 성공적으로 추천을 삭제했다면 처리 후 추천수를 반환합니다.
		 *
		 * @param {import("express").Request} req
		 * @param {import("express").Response} res
		 */
		async (req, res) => {
			try {
				const recommendCount =
					await RecommendService.deleteRecommendbyBoardId(
						// @ts-ignore
						req.params.boardId,
						// @ts-ignore
						req.user.userKey
					);
				res.status(200).json({ recommendCount });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		}
	);

export default router;
