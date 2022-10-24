import expressLoader from "./express.js";
import mariadb from "./mariadb.js";
import Logger from "./logger.js";
import passport from "./passport.js";

export default async function (app) {
	try {
		const conn = await mariadb.getConnection();
		Logger.info("💿DB Loaded and Pool created📀");
	} catch {
		Logger.error("💣Cannot Load DB and Create Pool");
	}


	passport(app);
	expressLoader(app);
	Logger.info("🚅Express loaded");

	// more loaders

	// ... Initialize agenda.js
	// ... or Redis, or Whatedver
}
