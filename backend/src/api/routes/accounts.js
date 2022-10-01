import { Router } from 'express';
import { generateSigninToken, signup } from '../../services/accounts';

const route = Router();

export default function (app /*Router*/) {
	app.use('/accounts', route);
	route.post('/signin', async (res, req) => {
		return req.status(501).json({ error: "Not Implemented😥" });
	});
	route.delete('/signout', async (res, req) => {
		return req.status(501).json({ error: "Not Implemented😥" });
	});
	route.post('/signup', async (res, req) => {
		const { token, nickname: username, id, passwd } = res.body;
		const result = signup({ token, username, id, passwd });
		return req.status(501).json({ error: "Not Implemented😥" });
	});
	route.get('/signup-token', async (res, req) => {
		const result = generateSigninToken();
		return req.status(result.status).json(result);
		//return req.status(501).json({ error: "Not Implemented😥", join_token: "tokenHere" });
	});
}