import { config } from "dotenv";
import axios from "axios";
config();
const PORT = process.env.PORT || 3000;
const baseUrl = `http://127.0.0.1:${PORT}/`;

async function test() {
	test_accounts();
}

async function test_accounts() {
	{
		let tokenTest = await axios.get(baseUrl + "accounts/signup-token");
		//let result = tokenTest.json();

		console.log(tokenTest.data);
	}
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

test();