import { TestNavBar, Posting } from "./_component"
import { useContext, useEffect } from "react";
import { myContext } from "./_hook"
import Link from "next/link";

function showLoggedIn(user) {
	console.log("user is ", user)
	if (user)
		return <div>
			You are logged in as {user.userName}
		</div>
	else
		return <div>
			You are not logged in!
		</div>
}

export default function testMain() {
	const { user, post, getPostFromAPI, setUser, canAPI, careerPost, getUserFromAPI } = useContext(myContext)
	useEffect(() => {
		(async () => {
			getPostFromAPI();
			getUserFromAPI();
		})();
	}, [])

	return <>
		<TestNavBar></TestNavBar>
		{showLoggedIn(user)}

		<p>PostList:</p>
		<ul>
			{post.map(ele => {
				return <li key={ele.postKey}>
					<Link href={`/test/board/${ele.postKey}`}><a>{ele.title}</a></Link>
				</li>
			})}
		</ul>

		<p>CareerPost List:</p>
		<ul>
			{careerPost.map(ele => {
				return <li key={ele.postKey}>
					<Link href={`/test/board/${ele.postKey}`}><a>{ele.title}</a></Link>
				</li>
			})}
		</ul>

		{Posting()}

	</>
}