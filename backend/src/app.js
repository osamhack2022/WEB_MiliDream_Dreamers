import loaders from "./loaders/index.js";
import Logger from "./loaders/logger.js";
import express, { application } from "express";

const app = express();

function startServer() {
	const PORT = process.env.PORT || 3000;

	loaders(app);

	app.listen(PORT, (err) => {
		if (err) {
			console.log(err);
			return;
		}
		Logger.info(`
        ##########################################
         🛡️ Server listening on port: ${PORT} 🛡️
        ##########################################
        `);
	});
}

startServer();
