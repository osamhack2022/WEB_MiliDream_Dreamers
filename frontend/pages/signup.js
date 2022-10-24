//회원가입 페이지

import { useEffect, useState } from "react";
import RegisterForm from "../components/Register/Form";

export default function SignUp() {
	const [token, setToken] = useState("");
	useEffect(() => {
		(async () => {
			const results = await (await fetch(`/api/accounts/signup-token`, { method: 'GET' })).json();
			if (results.success) setToken(results.join_token);
			else console.error("getTokenFail");
		})();
	}, []);

	console.log(token);

	return (
		<div>
			<RegisterForm token={token}></RegisterForm>
		</div>
	);
}
