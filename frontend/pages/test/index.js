import { TestNavBar, Posting } from "./_component";
import { useContext, useEffect } from "react";
import { myContext } from "./_hook";
import Link from "next/link";

function ShowLoggedIn({ user }) {
	if (user) return <div>You are logged in as {user.userName}</div>;
	else return <div>You are not logged in!</div>;
}

function ShowPostList({ post }) {
	return (
		<>
			<p>PostList:</p>
			<ul>
				{post.map((ele) => {
					return (
						<li key={ele.postKey}>
							<Link href={`/test/board/${ele.postKey}`}>
								<a>{ele.title}</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default function testMain() {
	const { user, post, getPostFromAPI, careerPost, getUserFromAPI } =
		useContext(myContext);
	useEffect(() => {
		(async () => {
			getPostFromAPI();
			getUserFromAPI();
		})();
	}, []);

	return (
		<>
			<TestNavBar></TestNavBar>
			<ShowLoggedIn user={user} />

			<ShowPostList title={"PostList:"} post={post} />
			<ShowPostList title={"CareerPost List:"} post={careerPost} />

			{user ? <Posting /> : <></>}
		</>
	);
}
