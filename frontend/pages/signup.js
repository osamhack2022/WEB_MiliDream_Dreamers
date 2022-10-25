//회원가입 페이지

import { useEffect, useState } from "react";
import RegisterForm from "../components/Register/Form";

export default function SignUp() {
	const [token, setToken] = useState("");
	useEffect(() => {
		(async () => {
			const result = await (await fetch(`/api/accounts/signup-token`, { method: 'GET' })).json();
			setToken(result?.token);
		})();
	}, []);

	return (
		<div>
			<RegisterForm token={token}></RegisterForm>
		</div>
	);
}
