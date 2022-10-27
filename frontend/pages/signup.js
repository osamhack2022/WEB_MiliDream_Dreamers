//회원가입 페이지

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RegisterForm from "../components/Register/Form";
import { GlobalState } from "../states/GlobalState";

export default function SignUp() {
	const user = GlobalState(state => state.user);
	const router = useRouter();

	/** 사용자가 로그인한 상태라면 회원가입 페이지에서 메인페이지로 이동합니다. */
	useEffect(() => { if (user) { router.push("/") } }, [user]);
	
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
