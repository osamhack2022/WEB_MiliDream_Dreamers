import { Router } from "express";
import passport from "passport";
import Logger from "../../loaders/logger.js";
import * as AccountService from "../../services/accounts.js";
import { checkUserExist } from "../middlewares/index.js";

const route = Router();

route
	.route("/sign")
	.get(
		checkUserExist,
		/**
		 * API: GET /accounts/sign
		 *
		 * req의 쿠키와 세션으로 user의 정보를 반환함
		 */
		(req, res) => {
			return res.status(200).json(req.user);
		}
	)
	.post(
		passport.authenticate("local"),
		/**
		 * API: POST /accounts/sign
		 * body: {id, password}
		 *
		 * id와 password를 이용해 유저를 로그인시킴
		 * 폼 형식 불일치 시 400 코드 반환
		 * 실패 시 401, 성공 시 200 코드와 유저 정보 반환
		 * 성공 시 같은 세션 요청하면 req.user에 유저 정보 들어감
		 */
		(req, res) => {
			return res.status(200).json(req.user);
		}
	)
	.delete(
		checkUserExist,
		/**
		 * API: DELETE /accounts/sign
		 * 로그아웃함
		 */
		(req, res) => {
			req.logout(() => {
				req.session.save((err) => {
					if (err) {
						Logger.error(err);
						res.status(400).json({
							err: "로그아웃하는 데에 문제가 있음",
						});
					}
				});
			});
			return res.status(200).end();
		}
	);

route
	.route("/account")
	.post(
		/**
		 * API: POST /accounts/account
		 * req.body = {userId, password, userName, userClass, token}
		 * 회원가입
		 */
		async (req, res) => {
			const { userId } = req.body;
			try {
				await AccountService.signup(req.body);
				Logger.info(`[Accounts] ${userId} 유저가 회원가입했습니다.`);
				return res.status(200).end();
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		}
	)
	.delete(
		checkUserExist,
		/**
		 * API: DELETE /accounts/account
		 * 회원탈퇴
		 */
		async (req, res) => {
			try {
				await AccountService.remove({ userKey: req.user.userKey });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}

			req.logOut((err) => {
				if (err) {
					res.status(400).json({ err: err.message });
				}
				res.status(200).end();
			});
		}
	);

/**
 * API: GET /accounts/signup-token
 * 회원가입 토큰 발행
 */
route.get("/signup-token", async (req, res) => {
	// const agreements = req.query?.agreements;
	// if (!agreements) return res.status(400).json({ error: "agreements list string(split by comma(,)) required." });

	const token = await AccountService.generateSigninToken();
	return res.status(200).json({ token });
});

/**
 * API: POST /accounts/attempt
 * 회원가입 폼 입력값 확인
 */
route.post("/attempt", async (req, res) => {
	const { token, userName, userId } = req.body;
	try {
		await AccountService.attempt({ token, userName, userId });
		return res.status(200).end();
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
});

export default route;
