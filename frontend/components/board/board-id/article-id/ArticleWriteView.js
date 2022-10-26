import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { displayedAt } from "../../../../utils/strings";
import Image from "next/image";

function reportModal(e) {
	e.preventDefault();
	console.log('ggggg');
	return (
		<div className="modal fade" id="reportModalDiv" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">게시글 신고</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						게시글 신고 요청이 접수되었습니다.
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" className="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
	)
}

function ContentRow({ comment }) {
	//const router = useRouter();
	//console.log(comment)
	const [user, setUser] = useState();
	const router = useRouter();
	useEffect(() => {
		(async () => {
			const results = await (await fetch(`/api/user/${Number(comment?.userKey)}`, { method: 'GET' })).json();
			setUser(results);
		})();
	}, []);
	//console.log(user?.userName)
	return (
		<tr className="comment">
			<td className="content1">
				<div className="name">{user?.userName}</div>
				<div className="date">{displayedAt(comment?.commentTime)}</div>
			</td>
			<td className="content2">{comment?.body}</td>
			{/* <td className="content">수정</td>
					<td className="content">삭제</td> */}
		</tr>

	)
}

export default function ArticleWriteView({ post, articleId, doReload }) {
	const [user, setUser] = useState();
	const [recommendWord, setRecommendWord] = useState("");
	const router = useRouter();
	useEffect(() => {
		(async () => {
			console.log(post?.userKey)
			const results = await (await fetch(`/api/user/${Number(post?.userKey)}`, { method: 'GET' })).json();
			console.log(results)
			setUser(results);
		})();
	}, [post?.userKey]);

	const onRecommendClick = async e => {
		const response = await fetch(`/api/board/${router.query["article-id"]}/recommend`, {
			method: "POST",
		})
		if (response.ok) {
			setRecommendWord("게시글에 공감하셨습니다!")
			doReload();
		} else {
			setRecommendWord("이미 공감한 게시글입니다!")
		}
	}

	const onCommentSubmit = async (e) => {
		console.log(document.querySelector("#exampleFormControlTextarea1").value)
		const response = await fetch("/api/comment", {
			method: "POST",
			body: JSON.stringify({
				postKey: articleId,
				body: document.querySelector("#exampleFormControlTextarea1").value,
			}),
			headers: { 'Content-Type': 'application/json' }
		})
		if (response.ok) {
			doReload();
			document.querySelector("#exampleFormControlTextarea1").value = ""
		}
	}

	//console.log(post)
	return (
		<div>
			<div className="modal fade" id="reportModalDiv" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">게시글 신고</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							게시글 신고 요청이 접수되었습니다.
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							{/* <button type="button" className="btn btn-primary">Save changes</button> */}
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="recommendModalDiv" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">게시글 공감</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							{recommendWord}
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							{/* <button type="button" className="btn btn-primary">Save changes</button> */}
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">게시글 댓글</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							댓글 달기 완료!
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							{/* <button type="button" className="btn btn-primary">Save changes</button> */}
						</div>
					</div>
				</div>
			</div>
			<div className="table-box">
				<table className="table">
					<tbody>
						<tr className="mainTitle">
							<th scope="col count" className="count titleBar">{post?.title}</th>
							<td>
								<div className="title titleBar">{user?.userName}</div>
								<div className="writeUser titleBar">{displayedAt(post?.postTime)}</div>
								<div className="time titleBar">조회수 {post?.viewCount}</div>
								<div className="veiwCount titleBar">수정</div>
								<div className="heart titleBar">삭제</div>
								<div className="comments">댓글수 [{post?.comments.length}]</div>
							</td>
						</tr>
						<tr className="mainBody">
							<th scope="col count" className="count titleBar">{post?.body}//Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</th>
							<td className="body">
								<p>공감수: {post?.recommenderCount}</p>
								<a type="button" data-bs-toggle="modal" data-bs-target="#recommendModalDiv" onClick={onRecommendClick}>
									<Image src={`/article/recommendBtn.png`} width="131px" height="50px" />
								</a>
								<a type="button" data-bs-toggle="modal" data-bs-target="#reportModalDiv">
									<Image src={`/article/reportBtn.png`} width="131px" height="50px" />
								</a>
							</td>
							{/* <td scope="col time" className="time titleBar">익명댓글달기 버튼</td> */}
							<td className="writeComment">
								<div className="mb-3">
									{/* <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label> */}
									<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="댓글을 입력해 주세요"></textarea>
									<button type="button" data-bs-toggle="modal" data-bs-target="#commentModal" onClick={onCommentSubmit}>
										등록
									</button>
								</div>
							</td>
						</tr>
						{post?.comments.slice(0).map((comment) => <ContentRow key={comment.commentKey} comment={comment} />)}
					</tbody>
				</table>
			</div>
			<style global jsx>{`
				.mainTitle {
					height: 80px;		
				}
				.mainTitle > th {
					margin-left: 15px;
					height: 40px;
					display: block;
					text-align: left;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 600;
					font-size: 20px;
				}
				.mainTitle > td {
					display: flex;
					height: 40px;
				}
				.mainTitle > td > div {
					margin-left : 15px;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 400;
					font-size: 13px;
					line-height: 19px;
					color: rgba(0, 0, 0, 0.5);
				}
				.mainTitle > td > div:after {
					content: "|";
					margin-left : 15px;
				}

				//아래부터 body 내용. 위는 title
				.mainBody {
					height: max-content;
					display: flex;
					flex-direction: column;
				}
				.mainBody > th {
					min-height : 300px;
					text-align: left;
					margin-left: 15px;
					display: block;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 500;
					font-size: 15px;
					line-height: 22px;
					color: #000000;
				}
				.mainBody > .body {
					
				}
				//아래는 댓글창 관련
				.mb-3 {
					display: flex;
				}
				.mb-3 > button {
					border: transparent;
					background: #A593E0;
					box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
					border-radius: 5px;
					cursor: pointer;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 400;
					font-size: 15px;
					line-height: 22px;
					text-align: center;
					color: #FFFFFF;
					margin-left: 10px;
					width: 60px;
				}
				.comment {
					display: flex;
					flex-direction: column;
				}
				.content1 {
					padding: 0px;
					display: flex;
					justify-content: space-between;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 500;
					font-size: 15px;
					line-height: 22px;
					display: flex;
					align-items: center;
					color: #000000;
					margin-left: 20px;
				}
				.content1 > .date {
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 500;
					font-size: 12px;
					line-height: 17px;
					align-items: center;
					color: #A7A7A7;
					margin-right: 30px;
				}
				.content2 {
					text-align: left;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 500;
					font-size: 12px;
					line-height: 17px;
					color: #000000;
					margin-left: 20px;
				}
				//아래는 table 기본 속성
				.table-box {
					border: 2px solid #A7A7A7;
					min-height: 850px;
					overflow: auto;
				}
				.table {
				--bs-table-color: black;
				--bs-table-border-color: transparent;
				width: 1000px;
				display: flex;
				flex-direction: column;
				text-align: center;
				min-height: 850px;
				margin: 0px;
				}
				.table-light {
				--bs-table-color: white;
				--bs-table-bg: transparent;
				--bs-table-border-color: transparent;
				}
				.content {
				font-family: 'Noto Sans KR';
				font-style: normal;
				font-weight: 400;
				font-size: 15px;
				line-height: 22px;
				color: black;
				}
				.gray {
				color: #A7A7A7;
				}
				tbody {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				min-height: 850px;
				}
				tr:after {
				content: "";
				display: block;
				width: 970px;
				border-bottom: 1px solid #A7A7A7;
				margin-left: 15px;
				}
				tbody > tr {
				height: 60px;
				}
				.title.content {
				text-align: start;
				}
			`}</style>
		</div>
	)
}