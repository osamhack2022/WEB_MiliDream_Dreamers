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

async function deletePost(postKey, router) {
	const response = await fetch(`/api/board/${postKey}`, {
		method: "DELETE",
	});
	if (!response.ok) {
		const data = await response.json();
		console.log("delete error:", data);
	} else {
		router.push("/test");
	}
}

async function fixPost(postKey, router, postTitle, postBody, setPost) {
	const response = await fetch(`/api/board/${postKey}`, {
		method: "PUT",
		body: JSON.stringify({
			title: postTitle.current.value,
			body: postBody.current.value,
		}),
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		getPost(postKey, setPost);
		router.push(`/test/board/${postKey}`);
	}
}

const onSubmit = async (e, parent, postKey, setPost, commentBody, setDap) => {
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
		if (parent) setDap(false);
	}
};

function PostDeleteButton({ post, router, user }) {
	if (post.userKey === user.userKey)
		return (
			<button onClick={() => deletePost(post.postKey, router)}>
				게시글 삭제
			</button>
		);
}

function PostFixButton({ post, router, user, isFix, setFix, setPost }) {
	const postbody = useRef();
	const postTitle = useRef();

	if (post.userKey === user.userKey)
		return isFix ? (
			<>
				<button
					onClick={() => {
						setFix(false);
						postbody.current.value = post.body;
					}}
				>
					게시글 수정 취소
				</button>
				<button
					onClick={() =>
						fixPost(post.postKey, router, postTitle, postbody, setPost)
					}
				>
					게시글 수정 확인
				</button>
				<br></br>
				<input
					tyoe={"text"}
					ref={postTitle}
					name="postTitle"
					defaultValue={post.title}
				></input>
				<textarea
					ref={postbody}
					defaultValue={post.body}
					name="postBody"
				></textarea>
				<br />
			</>
		) : (
			<button onClick={() => setFix(true)}>게시글 수정</button>
		);
	return <></>;
}

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
				setDap={setDap}
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

	const CommentParent = ({ comment, dap, dapSt, postKey, setPost, setDap }) => {
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
						<button onClick={() => putComment(setFix, postKey, setPost)}>
							수정 완료
						</button>
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
					<button
						onClick={() => deleteComment(comment.commentKey, postKey, setPost)}
					>
						삭제
					</button>
				</>
			);
		};

		const putComment = async (setFix, postKey, setPost) => {
			const response = await fetch(`/api/comment/${comment.commentKey}`, {
				method: "PUT",
				body: JSON.stringify({ body: fixBody.current.value }),
				headers: { "Content-Type": "application/json" },
			});
			if (response.ok) {
				setFix(false);
				await getPost(postKey, setPost);
			}
		};

		const deleteComment = async (commentKey, postKey, setPost) => {
			const response = await fetch(`/api/comment/${commentKey}`, {
				method: "DELETE",
			});
			if (response.ok) {
				await getPost(postKey, setPost);
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
						setDap={setDap}
					/>
				) : (
					<></>
				)}
			</div>
		);
	};

	const PostCommentForm = ({ parent, postKey, setPost, setDap }) => {
		const commentBody = useRef();
		return (
			<form
				onSubmit={(e) =>
					onSubmit(e, parent, postKey, setPost, commentBody, setDap)
				}
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
		const [isFix, setFix] = useState(false);
		if (!myPost) {
			return (
				<>
					<h1>Loading</h1>
				</>
			);
		}
		return (
			<>
				<PostDeleteButton post={myPost} router={router} user={user} />
				<PostFixButton
					post={myPost}
					router={router}
					user={user}
					isFix={isFix}
					setFix={setFix}
					setPost={setPost}
				/>
				{isFix ? (
					<></>
				) : (
					<>
						<h1>{myPost.title}</h1>
						<p>{myPost.body}</p>
					</>
				)}
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

	const SmallPost = ({ initialPost }) => {
		const [smallPost, setSmallPost] = useState(initialPost);
		const [isFix, setFix] = useState(false);

		if (!smallPost) {
			return (
				<>
					<h1>Loading</h1>
				</>
			);
		}
		return (
			<>
				<PostDeleteButton post={initialPost} router={router} user={user} />
				<PostFixButton
					post={initialPost}
					router={router}
					user={user}
					isFix={isFix}
					setFix={setFix}
					setPost={setSmallPost}
				/>
				{isFix ? (
					<></>
				) : (
					<>
						<h1>{smallPost.title}</h1>

						<p>{smallPost.body}</p>
					</>
				)}
				<h3>Comments</h3>
				<CommentArea
					myPost={smallPost}
					user={user}
					postKey={initialPost.postKey}
					setPost={setSmallPost}
				/>
				<p>Recommend: {smallPost.recommenders.length}</p>
				<RecommendButton
					postKey={initialPost.postKey}
					myPost={smallPost}
					user={user}
					setPost={setSmallPost}
				/>
				<PostCommentForm
					parent={undefined}
					postKey={initialPost.postKey}
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
					return <SmallPost key={ele.postKey} initialPost={ele} />;
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
	setPost(data.board);
	return data.board;
}
