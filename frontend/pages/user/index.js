import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UserIndex() {
	const router = useRouter();
	useEffect(async () => {
		const userInfo = await (await fetch("/api/accounts/sign")).json();
		const userKey = userInfo.userKey;
		router.push(`/user/${userKey}`);
	}, []);
	return (
		<>
		</>
	)
}