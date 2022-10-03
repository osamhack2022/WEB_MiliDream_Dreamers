import expressLoader from './express';
import * as mariadb from './mariadb';
import Logger from './logger';

export default async ({ expressApp }) => {
	try {
		const conn = await mariadb.getConnection();
		Logger.info('💿DB Loaded and Pool created📀');
	} catch {
		Logger.crit('💣Cannot Load DB and Create Pool');
	}

	await expressLoader({ app: expressApp });
	Logger.info('🚅Express loaded');

	// more loaders

	// ... Initialize agenda.js
	// ... or Redis, or Whatedver

}