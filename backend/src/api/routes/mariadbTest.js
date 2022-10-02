import { Router } from "express";
import mariadbTest from "../../services/mariadbTest";

const route = Router();

export default function (app /*Router*/) {
	app.use("/", route);
	route.get("/db-test", async (req, res) => {
		return res.send(await mariadbTest());
	});
}
