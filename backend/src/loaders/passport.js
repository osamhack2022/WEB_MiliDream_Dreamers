import passport from "passport";
import passportLocal from "passport-local";
import Account from "../models/Account.js";
import session, { MemoryStore } from "express-session";
import dotenv from "dotenv";

const LocalStrategy = passportLocal.Strategy;
dotenv.config();

export default function (app) {
	app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true, store: new MemoryStore() }));
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(new LocalStrategy(
		{ usernameField: "id" },
		async function (username, password, done) {
			const result = await Account.login({ userId: username, password });
			if (result === false) return done(null, false); // 로그인 실패

			return done(null, result);
		}));

	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser(function (id, done) {
		done(null, id);
	});


	return app;
}