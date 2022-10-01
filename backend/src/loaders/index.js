import expressLoader from './express';
import mariadbLoader from './mariadb';
// import mysqlLoader from ''
import Logger from './logger';

export default async ({ expressApp }) => {
	const mariaPool = await mariadbLoader();
	Logger.info('💿DB Loaded and Pool created📀');

	// 참고용 테스트 쿼리 날리는 부분입니다. 나중에 삭제해주세요.
	const testConnection = await mariaPool.getConnection();
	const result = await testConnection.query(`SELECT VERSION();`);
	Logger.info(`DB Version: ${Object.values(result['0'])[0]}`);
	testConnection.release();


	await expressLoader({ app: expressApp });
	Logger.info('🚅Express loaded');

	// more loaders

	// ... Initialize agenda.js
	// ... or Redis, or Whatedver

}