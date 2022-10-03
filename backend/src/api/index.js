import { Router } from 'express';
// import routes files here
import mariadbTest from './routes/mariadbTest';

export default () => {
	const app = Router();
	// declare function imported
	mariadbTest(app);

	return app;
}