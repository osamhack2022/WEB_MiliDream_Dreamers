import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Posting, TestNavBar } from "../_component";
import { useMyContext } from "../_hook";

function RecommendButton({ postKey, myPost, user, setPost }) {
	const unRecommend = async () => {
		const response = await fetch(`/api/board/${postKey}/recommend`, {
			method: "DELETE",
		});
		if (response.ok) {
			await getPost(postKey, setPost);
		} else {
			const data = await response.json();
			console.log("err:", data);
		}
	};
	const doRecommend = async () => {
		const response = await fetch(`/api/board/${postKey}/recommend`, {
			method: "POST",
			body: JSON.stringify({
				userKey: user.userKey,
			}),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			await getPost(postKey, setPost);
		}
	};
	const userExists = myPost.recommenders.some((ele) => ele === user.userKey);
	if (userExists) return <button onClick={unRecommend}>추천 해제</button>;
	else return <button onClick={doRecommend}>추천!</button>;
}

const onSubmit = async (e, parent, postKey, setPost, commentBody) => {
	e.preventDefault();

	const response = await fetch("/api/comment", {
		method: "POST",
		body: JSON.stringify({
			postKey: postKey,
			body: commentBody.current.value,
			parentKey: parent,
		}),
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		commentBody.current.value = "";
		await getPost(postKey, setPost);
	}
};

export default function postBoardId() {
	const [myPost, setPost] = useState(undefined);
	const { user, getUserFromAPI, userLoading } = useMyContext();
	const router = useRouter();
	const id = router.query.id;

	const CommentArea = ({ myPost, postKey, setPost }) => {
		return (
			<ul>
				{myPost.comments.map((ele) => (
					<div key={ele.commentKey}>
						<MainComment comment={ele} postKey={postKey} setPost={setPost} />
						<ul>
							{ele.childComments.map((childEle) => (
								<li key={childEle.commentKey}>
									<SubComment
										comment={childEle}
										postKey={postKey}
										setPost={setPost}
									/>
								</li>
							))}
						</ul>
					</div>
				))}
			</ul>
		);
	};

	const MainComment = ({ comment, postKey, setPost }) => {
		const [dapSt, setDap] = useState(false);
		const dap = dapSt ? (
			<button onClick={() => setDap(false)}>답글 취소</button>
		) : (
			<button onClick={() => setDap(true)}>답글</button>
		);
		return (
			<CommentParent
				comment={comment}
				dap={dap}
				dapSt={dapSt}
				postKey={postKey}
				setPost={setPost}
			/>
		);
	};

	const SubComment = ({ comment, postKey, setPost }) => {
		return (
			<CommentParent
				comment={comment}
				dap={<></>}
				dapSt={false}
				postKey={postKey}
				setPost={setPost}
			/>
		);
	};

	const CommentParent = ({ comment, dap, dapSt, postKey, setPost }) => {
		const [isFix, setFix] = useState(false);
		const fixBody = useRef();

		const CommentButton = () => {
			if (comment.userKey !== user.userKey) {
				return;
			}

			let FixButton;
			if (isFix) {
				FixButton = (
					<>
						<button
							onClick={() => {
								setFix(false);
								fixBody.current.value = comment.body;
							}}
						>
							수정 취소
						</button>
						<button onClick={() => putComment(setFix)}>수정 완료</button>
					</>
				);
			} else {
				FixButton = (
					<button
						onClick={() => {
							setFix(true);
						}}
					>
						수정
					</button>
				);
			}

			return (
				<>
					{FixButton}
					<button onClick={() => deleteComment(comment.commentKey)}>
						삭제
					</button>
				</>
			);
		};

		const putComment = async (setFix) => {
			const response = await fetch(`/api/comment/${comment.commentKey}`, {
				method: "PUT",
				body: JSON.stringify({ body: fixBody.current.value }),
				headers: { "Content-Type": "application/json" },
			});
			if (response.ok) {
				setFix(false);
				await getPost(id, setPost);
			}
		};

		const deleteComment = async (commentKey) => {
			const response = await fetch(`/api/comment/${commentKey}`, {
				method: "DELETE",
			});
			if (response.ok) {
				await getPost(id, setPost);
			}
		};

		return (
			<div>
				userKey:{comment.userKey}
				{dap}
				<CommentButton />
				<br />
				{isFix ? (
					<textarea
						name={"commentFix"}
						ref={fixBody}
						defaultValue={comment.body}
					></textarea>
				) : (
					comment.body
				)}
				<br />
				{dapSt ? (
					<PostCommentForm
						parent={comment.commentKey}
						postKey={postKey}
						setPost={setPost}
					/>
				) : (
					<></>
				)}
			</div>
		);
	};

	const PostCommentForm = ({ parent, postKey, setPost }) => {
		const commentBody = useRef();
		return (
			<form
				onSubmit={(e) => onSubmit(e, parent, postKey, setPost, commentBody)}
			>
				<label>
					<span>CommentBody</span>
					<textarea name="commentBody" ref={commentBody} required />
				</label>
				<div className="submit">
					<button type="submit">Comment!</button>
				</div>
			</form>
		);
	};

	useEffect(() => {
		(async () => {
			getUserFromAPI();
		})();
	}, []);

	useEffect(() => {
		if (!router.isReady) return;
		getPost(router.query.id, setPost);
	}, [router.isReady]);

	useEffect(() => {
		if (!userLoading && !user) router.push("/test");
	}, [user, userLoading]);

	const BigPost = () => {
		if (!myPost) {
			return (
				<>
					<h1>Loading</h1>
				</>
			);
		}
		return (
			<>
				<h1>{myPost.title}</h1>

				<p>{myPost.body}</p>

				<h3>Comments</h3>
				<CommentArea
					myPost={myPost}
					user={user}
					postKey={id}
					setPost={setPost}
				/>

				<p>Recommend: {myPost.recommenders.length}</p>
				<RecommendButton
					postKey={id}
					myPost={myPost}
					user={user}
					setPost={setPost}
				/>

				<PostCommentForm parent={undefined} postKey={id} setPost={setPost} />
			</>
		);
	};

	const SmallPost = ({ postKey }) => {
		const [smallPost, setSmallPost] = useState(undefined);
		useEffect(() => {
			getPost(postKey, setSmallPost);
		}, []);
		if (!smallPost) {
			return (
				<>
					<h1>Loading</h1>
				</>
			);
		}
		return (
			<>
				<h1>{smallPost.title}</h1>

				<p>{smallPost.body}</p>

				<h3>Comments</h3>
				<CommentArea
					myPost={smallPost}
					user={user}
					postKey={postKey}
					setPost={setSmallPost}
				/>

				<p>Recommend: {myPost.recommenders.length}</p>
				<RecommendButton
					postKey={postKey}
					myPost={smallPost}
					user={user}
					setPost={setSmallPost}
				/>

				<PostCommentForm
					parent={undefined}
					postKey={postKey}
					setPost={setSmallPost}
				/>
			</>
		);
	};

	const CareerPost = () => {
		const reloadPost = () => {
			getPost(id, setPost);
		};
		return (
			<>
				<h1>CareerPost</h1>
				<BigPost />
				<h2>Get People!</h2>
				{myPost.recruitPosts.map((ele) => {
					console.log("smallpostele:", ele);
					return <SmallPost key={ele.postKey} postKey={ele.postKey} />;
				})}
				<Posting careerPostKey={id} reloadPost={reloadPost} />
			</>
		);
	};

	if (!myPost || !user) {
		return (
			<>
				<TestNavBar />
				<h1>Loading</h1>
			</>
		);
	}
	return (
		<>
			<TestNavBar />
			{myPost.categoryKey === 1 ? <CareerPost /> : <BigPost />}
		</>
	);
}

async function getPost(id, setPost) {
	const response = await fetch(`/api/board/${id}`);
	const data = await response.json();
	setPost(data);
	return data;
}
