import expressLoader from 'express'
// import mysqlLoader from ''
import Logger from './logger';

export default async ({expressApp}) => {
    // const mysqlConnection = await mysqlLoader();
    // Logger.info('💿DB Initialized📀');
    await expressLoader({ app: expressApp });
    Logger.info('🚅Express Intialized');

    // more loaders

    // ... Initialize agenda.js
    // ... or Redis, or Whatedver

}