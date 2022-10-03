import { Router } from "express";
import * as accounts from "../../services/accounts";

const route = Router();

// POST /accounts/signin
route.post("/signin", async (req, res) => {
	return res.status(501).json({ error: "Not Implemented😥" });
});
// DELETE /accounts/signout
route.delete("/signout", async (req, res) => {
	return res.status(501).json({ error: "Not Implemented😥" });
});
// POST /accounts/signup
route.post("/signup", async (req, res) => {
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
// POST /accounts/attempt
route.post("/attempt", async (req, res) => {
	const { token, username, userId } = req.body;
	const result = await accounts.attempt({ token, username, userId });
	return res.status(result.status).json({ ...result, status: undefined });
});

export default route;