import { Router } from "express";
import mariadbTest from "../../services/mariadbTest";


const route = Router();

export default function (app /*Router*/) {
	app.use('/', route);
	route.get('/db-test', async (res, req) => {
		return req.send(await mariadbTest());
	});
}