import { Router } from "express";
import * as accounts from "../../services/accounts";

const route = Router();

// POST /accounts/sign
route.post("/sign", async (req, res) => {
	// TODO: 로그인 코드 구현
	return res.status(501).json({ error: "Not Implemented😥" });
});

// DELETE /accounts/sign
route.delete("/sign", async (req, res) => {
	// TODO: 로그아웃 코드 구현
	return res.status(501).json({ error: "Not Implemented😥" });
});

// POST /accounts/account
route.post("/account", async (req, res) => {
	const { token, username, userId, password } = req.body;
	const result = await accounts.signup({ token, username, userId, password });
	return res.status(result.status).json({ ...result, status: undefined });
});

// GET /accounts/signup-token
route.get("/signup-token", async (req, res) => {
	const agreements = req.query?.agreements;
	if (!agreements) return res.status(400).json({ error: "agreements list (string[]) required." });

	const result = await accounts.generateSigninToken(agreements);
	return res.status(result.status).json({ ...result, status: undefined });
});

// DELETE /accounts/account
route.delete("/account", async (req, res) => {
	// TODO: 회원탈퇴 구현

	return res.status(501).json({ error: "Not Implemented😥" });
});

// POST /accounts/attempt
route.post("/attempt", async (req, res) => {
	const { token, username, userId } = req.body;
	const result = await accounts.attempt({ token, username, userId });
	return res.status(result.status).json({ ...result, status: undefined });
});

export default route;