import { Router } from "express";
import passport from "passport";
import Logger from "../../loaders/logger";
import * as AccountService from "../../services/accounts";

const route = Router();

// GET /accounts/sign
route.get("/sign", async (req,res)=>{
	if (!req.user) return res.status(401).end();

	return res.status(200).json(req.user);
});

// POST /accounts/sign (application/json)
// {
//   id: string,
//   password: string
// }
route.post("/sign", passport.authenticate('local'), async (req, res) => {
	return res.status(200).json(req.user);
	// 폼 형식 불일치시 400 코드 반환
	// 실패시 401 코드 반환
	// 성공시 200 코드 반환 &&
	// req.user에 유저 정보 들어감
});

// DELETE /accounts/sign
route.delete("/sign", async (req, res) => {
	req.logout();
	req.session.save((err) => {
		if (err) Logger.error(err);
	});
	return res.status(200).end();
});

// POST /accounts/account
// 회원가입
route.post("/account", async (req, res) => {
	const { token, username, id: userId, passwd: password, classType } = req.body;
	const result = await AccountService.signup({ token, username, userId, password, classType });

	if (result.success) Logger.info(`[Accounts] ${userId} 유저가 회원가입했습니다.`);
	return res.status(result.status).json({ ...result, status: undefined });
});

// GET /accounts/signup-token
route.get("/signup-token", async (req, res) => {
	// const agreements = req.query?.agreements;
	// if (!agreements) return res.status(400).json({ error: "agreements list string(split by comma(,)) required." });

	const result = await AccountService.generateSigninToken();
	return res.status(result.status).json({ ...result, status: undefined });
});


// DELETE /accounts/account
// 회원탈퇴
route.delete("/account", async (req, res) => {
	if (req.user && req.user.userId == req.body.id) {
		await AccountService.remove({ userId: req.body.id });
	} else {
		return res.status(401).send("Unauthorized");
	}

	return res.status(200).send("");
});

// POST /accounts/attempt
route.post("/attempt", async (req, res) => {
	const { token, username, userId } = req.body;
	const result = await AccountService.attempt({ token, username, userId });
	return res.status(result.status).json({ ...result, status: undefined });
});

export default route;
