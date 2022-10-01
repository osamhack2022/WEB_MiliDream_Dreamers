import expressLoader from './express';
import * as mariadb from './mariadb';
import Logger from './logger';

export default async ({ expressApp }) => {
	const conn = await mariadb.getConnection();
	Logger.info('💿DB Loaded and Pool created📀');

	await expressLoader({ app: expressApp });
	Logger.info('🚅Express loaded');

	// more loaders

	// ... Initialize agenda.js
	// ... or Redis, or Whatedver

}