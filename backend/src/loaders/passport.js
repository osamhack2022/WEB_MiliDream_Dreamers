import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";

const LocalStrategy = passportLocal.Strategy;

export default function (app) {
	app.use(session({ secret: "DEBUGSECRET" /* TODO: 비밀키 지정 */, resave: true, saveUninitialized: true }));
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(new LocalStrategy(function (username, password, cb) {
		// TODO: 유저 디비 인증 로직
		throw new Error("unimplemented");

		return cb(null, false); // 인증 실패시
		return cb(null, {/* 유저 정보 오브젝트*/ });
	}));

	return app;
}