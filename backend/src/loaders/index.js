import expressLoader from './express';
import mariadbLoader from './mariadb';
// import mysqlLoader from ''
import Logger from './logger';

export default async ({ expressApp }) => {
	const mariaPool = await mariadbLoader();
	Logger.info('💿DB Loaded and Pool created📀');

	await expressLoader({ app: expressApp });
	Logger.info('🚅Express loaded');

	// more loaders

	// ... Initialize agenda.js
	// ... or Redis, or Whatedver

}