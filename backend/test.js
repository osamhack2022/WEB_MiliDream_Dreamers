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
	await test_accounts();
	const testAccount = await getTestAccount();
	await test_user();
	await deleteTestAccount();
}

async function getTestAccount() {
	let testData = {};
	testData.userId = await randomText(5);
	testData.userName = await randomText(5);
	testData.password = await randomText(20);
	const dataLogEnabled = false;
	try { // 토큰
		let tokenRequest = await client.get(baseUrl + "accounts/signup-token");
		expect(tokenRequest.status).toBe(200);
		let responseData = tokenRequest.data;
		expectRegex(responseData?.token).toBe(/^[0-9a-f]{16}$/);
		testData.token = responseData?.token ?? "DEBUG";
	}
	catch (ex) { console.error(ex.message); }
	try { // 회원가입
		let registerRequest = await client.post(baseUrl + "accounts/account",
			{ userId: testData.userId, password: testData.password, userName: testData.userName, userClass: 1, token: testData.token }
		);
		let responseData = registerRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(registerRequest.status).toBe(200);
	}
	catch (ex) { console.error(ex.message); }
	try { // 로그인
		let loginRequest = await client.post(baseUrl + "accounts/sign",
			{ id: testData.userId, password: testData.password }

		);
		let responseData = loginRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(loginRequest.status).toBe(200);
		return testData;
	}
	catch (ex) { console.error(ex.message); }
	return undefined;
}

async function test_accounts() {
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

	try { // 로그아웃 401
		let logoutRequest = await client.delete(baseUrl + "accounts/sign");
		let responseData = logoutRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(logoutRequest.status).toBe(401);


		console.log("[DELETE /accounts/sign 401] Success");
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

async function deleteTestAccount() {
	try { // 회원탈퇴
		let removeAccountRequest = await client.delete(baseUrl + "accounts/account");
		expect(removeAccountRequest.status).toBe(200);
	}
	catch (ex) { console.error(ex.message); }
}

async function test_user() {
	const dataLogEnabled = true;
	let userId;

	try { // GET /user -> expected return 401 when not logon
		let userRequest = await axios.get(baseUrl + "user", { validateStatus: false });
		let responseData = userRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(userRequest.status).toBe(401);

		console.log("[GET /user noauth] Success");
	}
	catch (ex) { console.error(ex.message); }

	try { // GET /user -> expected return redirect GET /user/{:userId}
		let userRequest = await client.get(baseUrl + "user");
		let responseData = userRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(userRequest.status).toBe(200);
		userId = userRequest.request?.path.split("/")[2] * 1;

		console.log(`[GET /user auth] Success->${userId}`);
	}
	catch (ex) { console.error(ex.message); }

	try { // PUT /user/:userId -> change password
		const new_password = await randomText(20);
		let userRequest = await client.put(baseUrl + "user/" + userId,
			{ new_password }
		);
		let responseData = userRequest.data;
		dataLogEnabled && console.log(responseData);
		expect(userRequest.status).toBe(200);

		console.log(`[POST /user/${userId} auth] Success->pw:${new_password}`);
	}
	catch (ex) { console.error(ex.message); }

	/** @TODO test avatar upload */
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