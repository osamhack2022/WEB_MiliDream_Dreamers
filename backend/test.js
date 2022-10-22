import { config } from "dotenv";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import tough from "tough-cookie";
import crypto from "crypto";
config();
const PORT = process.env.PORT || 3000;
const baseUrl = `http://127.0.0.1:${PORT}/`;
const cookieJar = new tough.CookieJar();
const axiosConfig = { validateStatus: false, jar: cookieJar };
const client = wrapper(axios.create(axiosConfig));
let testData = {};

async function test() {
	test_accounts();
}

async function test_accounts() {
	let lastToken = "";
	const dataLogEnabled = false;
	try { // 토큰
		let tokenRequest = await client.get(baseUrl + "accounts/signup-token");
		expect(tokenRequest.status).toBe(200);

		let responseData = tokenRequest.data;

		expectRegex(responseData?.token).toBe(/^[0-9a-f]{16}$/);
		testData.token = responseData?.token ?? "DEBUG";

		console.log("[GET /accounts/signup-token] Success");
	}
	catch (ex) { console.error(ex.message); }

	try { // 회원가입 시도
		testData.userId = await randomText(5);
		testData.userName = await randomText(5);
		testData.password = await randomText(20);
		console.log("testData", testData);
		let attemptRequest = await client.post(baseUrl + "accounts/attempt",
			{ userId: testData.userId, userName: testData.userName, token: testData.token }

		);
		let responseData = attemptRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(attemptRequest.status).toBe(200);


		console.log("[POST /accounts/attempt] Success");
	}
	catch (ex) { console.error(ex.message) }

	try { // 회원가입
		let registerRequest = await client.post(baseUrl + "accounts/account",
			{ userId: testData.userId, password: testData.password, userName: testData.userName, userClass: 1, token: testData.token }

		);
		let responseData = registerRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(registerRequest.status).toBe(200);

		console.log("[POST /accounts/account] Success");
	}
	catch (ex) { console.error(ex.message); }

	try {
		let loginRequest = await client.post(baseUrl + "accounts/sign",
			{ id: testData.userId, password: testData.password }

		);
		let responseData = loginRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(loginRequest.status).toBe(200);


		console.log("[POST /accounts/sign] Success");
	}
	catch (ex) { console.error(ex.message); }

	try {
		let getUserRequest = await client.get(baseUrl + "accounts/sign");
		let responseData = getUserRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(getUserRequest.status).toBe(200);


		console.log("[GET /accounts/sign] Success");
	}
	catch (ex) { console.error(ex.message); }

	try { // 로그아웃 200
		let logoutRequest = await client.delete(baseUrl + "accounts/sign");
		let responseData = logoutRequest.data;
		//console.log(responseData);
		expect(logoutRequest.status).toBe(200);


		console.log("[DELETE /accounts/sign 200] Success");
	}
	catch (ex) { console.error(ex.message); }

	try { // 로그아웃 400
		let logoutRequest = await client.delete(baseUrl + "accounts/sign");
		let responseData = logoutRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(logoutRequest.status).toBe(400);


		console.log("[DELETE /accounts/sign 400] Success");
	}
	catch (ex) { console.error(ex.message); }

	try { // login again
		let loginRequest = await client.post(baseUrl + "accounts/sign",
			{ id: testData.userId, password: testData.password }

		);
		let responseData = loginRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(loginRequest.status).toBe(200);


		console.log("[POST /accounts/sign] Success");
	}
	catch (ex) { console.error(ex.message); }

	try { // 회원탈퇴
		let removeAccountRequest = await client.delete(baseUrl + "accounts/account");
		let responseData = removeAccountRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(removeAccountRequest.status).toBe(200);


		console.log("[DELETE /accounts/account] Success");
	}
	catch (ex) { console.error(ex.message); }
}

function expect(result) {
	return {
		toBe: function (expected) {
			if (result !== expected) {
				throw new Error(result + ' is not equal to ' + expected);
			}
		}
	}
}

function expectRegex(result) {
	return {
		toBe: function (expectedRegex) {
			if (expectedRegex.test(result)) {
				throw new Error(result + ' does not match to ' + expectedRegex);
			}
		}
	}
}

async function randomText(hexBytes) {
	const token = await new Promise((resolve, _) => {
		crypto.randomBytes(hexBytes, function (_, buffer) {
			resolve(buffer.toString("hex"));
		});
	});
	return token;
}

test();