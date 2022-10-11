import expressLoader from "./express";
import mariadb from "./mariadb";
import Logger from "./logger";
import passport from "./passport";
import multer from "./multer";

export default async function (app) {
	try {
		const conn = await mariadb.getConnection();
		Logger.info("💿DB Loaded and Pool created📀");
	} catch {
		Logger.error("💣Cannot Load DB and Create Pool");
	}


	passport(app);
	multer(app);
	expressLoader(app);
	Logger.info("🚅Express loaded");

	// more loaders

	// ... Initialize agenda.js
	// ... or Redis, or Whatedver
}
