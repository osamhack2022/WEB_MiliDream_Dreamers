import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { TestNavBar } from "../_component";
import { myContext } from "../_hook";

function Comment({ comment, user }) {
	return (
		<div key={comment.commentKey}>
			{`userKey:${comment.userKey}`} <button>답글</button>
			{comment.userKey === user.userKey ? (
				<>
					<button>수정</button>
					<button>Delete</button>
				</>
			) : (
				<></>
			)}
			<br />
			{comment.body}
		</div>
	);
}

function RecommendButton({ myPost, user }) {
	const unRecommend = async () => {
		const response = await fetch(`/api/board/${id}/recommend`, {
			method: "DELETE",
			body: JSON.stringify({
				userKey: user.userKey,
			}),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			setPost({
				...myPost,
				recommenders: myPost.recommenders.filter((ele) => ele !== user.userKey),
			});
		}
	};
	const doRecommend = async () => {
		const response = await fetch(`/api/board/${id}/recommend`, {
			method: "POST",
			body: JSON.stringify({
				userKey: user.userKey,
			}),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			setPost({
				...myPost,
				recommenders: [...myPost.recommenders, user.userKey],
			});
		}
	};
	const userExists = myPost.recommenders.some((ele) => ele === user.userKey);
	if (userExists) return <button onClick={unRecommend}>추천 해제</button>;
	else return <button onClick={doRecommend}>추천!</button>;
}

export default function postBoardId({ post }) {
	const { user, getUserFromAPI, userLoading } = useContext(myContext);
	const router = useRouter();
	useEffect(() => {
		(async () => {
			getUserFromAPI();
		})();
	}, []);
	useEffect(() => {
		if (!userLoading && !user) router.push("/test");
	}, [user, userLoading]);
	const id = router.query.id;

	const [myPost, setPost] = useState(post);

	const commentBody = useRef();
	const onSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch("/api/comment", {
			method: "POST",
			body: JSON.stringify({
				userKey: user.userKey,
				postKey: id,
				body: commentBody.current.value,
			}),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			/*const data = await response.json();
			setPost({
				comments: [...myPost.comments, data],
				...myPost
			})*/
			router.reload();
		}
	};
	return (
		<>
			<TestNavBar />
			{myPost && user ? (
				<>
					<h1>{myPost.title}</h1>

					<p>{myPost.body}</p>

					<h3>Comments</h3>

					<ul>
						{myPost.comments.map((ele) => {
							return (
								<div key={ele.commentKey}>
									<Comment comment={ele} user={user} />
									{ele.childComments.map((childEle) => {
										return (
											<Comment
												key={ele.commentKey}
												comment={childEle}
												user={user}
											/>
										);
									})}
								</div>
							);
						})}
					</ul>

					<p>Recommend: {myPost.recommenders.length}</p>
					<RecommendButton myPost={myPost} user={user} />

					<form onSubmit={onSubmit}>
						<label>
							<span>CommentBody</span>
							<textarea name="commentBody" ref={commentBody} required />
						</label>
						<div className="submit">
							<button type="submit">Comment!</button>
						</div>
					</form>
				</>
			) : (
				<h1>Loading</h1>
			)}
		</>
	);
}

export async function getServerSideProps({ query }) {
	const { id } = query;
	const response = await fetch(`http://localhost:3000/api/board/${id}`);
	const data = await response.json();
	console.log(data);
	return { props: { post: data[0] } };
}
