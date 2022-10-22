import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMyContext } from "./_hook";
import { TestNavBar } from "./_component";

function ShowInfo({ user }) {
	if (!user) return <></>;
	return (
		<>
			<ul>
				<li>UserKey: {user.userKey}</li>
				<li>UserId: {user.userId}</li>
				<li>userName: {user.userName}</li>
				<li>userClass: {user.userClass}</li>
			</ul>
		</>
	);
}

export default function profilePage() {
	const { user, setUser, deleteUser, userLoading } = useMyContext();
	const router = useRouter();

	useEffect(() => {
		if (!userLoading && !user) {
			router.push("/test");
		}
	}, [user, userLoading]);

	const handleExit = async () => {
		const response = await fetch("/api/accounts/account", {
			method: "DELETE",
			body: JSON.stringify({
				id: user.userId,
			}),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			setUser(undefined);
			deleteUser(user);
		}
	};

	return (
		<>
			<TestNavBar></TestNavBar>
			<ShowInfo user={user} />
			<button onClick={handleExit}>회원탈퇴</button>
		</>
	);
}
