import { useRouter } from "next/router";
import { useContext, useEffect } from "react"
import {myContext} from "./_hook"
import { TestNavBar } from "./_component";

function showInfo(user){
	console.log(user)
	if (!user) return;
	return <>
		<ul>
			<li>
				UserKey: {user.userKey}
			</li>
			<li>UserId: {user.userId}</li>
			<li>userName: {user.userName}</li>
			<li>userClass: {user.userClass}</li>
		</ul>
	
	</>
}

export default function profilePage(){
	const {user, canAPI, setUser, deleteUser} = useContext(myContext);
	const router = useRouter();
	useEffect(()=>{
		if (!user) {router.push("/test")}
	}, [user])

	const handleExit = async()=>{
		if (canAPI){
			const response = await fetch("/api/accounts/account", {
				method: "DELETE",
				body: JSON.stringify({
					id: user.userId
				}),
				headers: { 'Content-Type': 'application/json' },
			})
			console.log(response)
			if (response.ok){
				setUser(undefined)
				deleteUser(user)
			}
		} else {
			setUser(undefined)
				deleteUser(user)
		}
	}

	return <>
	<TestNavBar></TestNavBar>
		{showInfo(user)}
		<button onClick={handleExit}>회원탈퇴</button>
	</>
}