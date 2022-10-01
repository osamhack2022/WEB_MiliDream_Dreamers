import * as express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import * as helmet from 'helmet';
import morgan from 'morgan'


export default async ({ app }) => {
	app.get('/status', (req, res) => { res.status(200).end(); });
	app.head('/status', (req, res) => { res.status(200).end(); });

	app.get('/method-test', (req, res) => { return res.send(req.method); });
	app.post('/method-test', (req, res) => { return res.send(req.method); });
	app.put('/method-test', (req, res) => { return res.send(req.method); });
	app.delete('/method-test', (req, res) => { return res.send(req.method); });
	//app.all('/method-test', (req, res) => { return res.send(req.method); });


	app.enable('trust proxy'); // app.get('trust proxy) => true

	// cors Setting => 모든 도메인에서 express 서버 포트로 req,res가 가능하도록
	app.use(cors()); // ⚠️배포 시에는 화이트리스트 추가 필요

	// html 에서 지원하지 않는 put 과 delete를 쓰도록 하는 세팅
	app.use(methodOverride());

	// Transforms the raw string of req.body into json
	app.use(express.json());


	// morgan Setting => 요청과 응답에 대한 정보를 콘솔에 기록
	if (process.env.NODE_ENV === 'production') {
		app.use(morgan('combined')); // 배포환경이면
		app.use(helmet({ contentSecurityPolicy: false }));
	} else {
		app.use(morgan('dev')); // 개발환경이면
	}

	// body-parser Setting
	app.use(bodyParser.urlencoded({ extended: false })); // query string로 data 파싱 (객체 중첩 불가 )

	return app;
};