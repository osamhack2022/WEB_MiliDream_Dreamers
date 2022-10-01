import { Router } from 'express';
import accounts from './routes/accounts';
import mariadbTest from './routes/mariadbTest';

export default () => {
	const app = Router();
	// declare function imported
	mariadbTest(app);
	accounts(app);

	return app;
}