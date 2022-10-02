import loaders from "./loaders";
import Logger from "./loaders/logger";
import express, { application } from "express";

async function startServer() {
	const PORT = process.env.PORT || 3000;

	const app = express();

	await loaders({ expressApp: app });

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
