import { config } from "dotenv";
import axios from "axios";
import crypto from "crypto";
config();
const PORT = process.env.PORT || 3000;
const baseUrl = `http://127.0.0.1:${PORT}/`;
const axiosConfig = { validateStatus: false };
let testData = {};

async function test() {
	test_accounts();
}

async function test_accounts() {
	let lastToken = "";
	try {
		let tokenRequest = await axios.get(baseUrl + "accounts/signup-token", axiosConfig);
		expect(tokenRequest.status).toBe(200);

		let responseData = tokenRequest.data;

		expectRegex(responseData?.token).toBe(/^[0-9a-f]{16}$/);
		testData.token = responseData?.token ?? "DEBUG";

		console.log("[GET /accounts/signup-token] Success");
	}
	catch (ex) { console.error(ex.message); }
	try {
		testData.userId = await randomText(5);
		testData.userName = await randomText(5);
		testData.password = await randomText(20);
		console.log(testData);
		let attemptRequest = await axios.post(baseUrl + "accounts/attempt",
			{ userId: testData.userId, userName: testData.userName, token: testData.token },
			axiosConfig
		);
		let responseData = attemptRequest.data;
		console.log(responseData);
		expect(attemptRequest.status).toBe(200);


		console.log("[POST /accounts/attempt] Success");
	}
	catch (ex) { console.error(ex.message) }
	try {
		let registerRequest = await axios.post(baseUrl + "accounts/account",
			{ userId: testData.userId, password: testData.password, userName: testData.userName, userClass: 1, token: testData.token },
			axiosConfig
		);
		let responseData = registerRequest.data;
		console.log(responseData);
		expect(registerRequest.status).toBe(200);

		console.log("[POST /accounts/account] Success");
	}
	catch (ex) { console.error(ex.message) }
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