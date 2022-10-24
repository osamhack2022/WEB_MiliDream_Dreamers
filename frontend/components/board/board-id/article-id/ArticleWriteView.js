import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { displayedAt } from "../../../../utils/strings";
import Image from "next/image";

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
				<div className="content">{user?.userName}</div>
				<div className="content">{displayedAt(comment?.commentTime)}</div>
			</td>
			<td className="content2">{comment?.body}</td>
			{/* <td className="content">수정</td>
					<td className="content">삭제</td> */}
		</tr>

	)
}

export default function ArticleWriteView({ post, articleId }) {
	const [user, setUser] = useState();
	const router = useRouter();
	useEffect(() => {
		(async () => {
			const results = await (await fetch(`/api/user/${Number(post?.userKey)}`, { method: 'GET' })).json();
			setUser(results);
		})();
	}, []);

	//console.log(post)
	return (
		<div>
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
							<th scope="col count" className="count titleBar">{post?.body}//내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가 내용추가</th>
							<td className="body">
								<Image src={`/article/recommendBtn.png`} width="131px" height="50px" />
								<Image src={`/article/reportBtn.png`} width="131px" height="50px" />
							</td>
							{/* <td scope="col time" className="time titleBar">익명댓글달기 버튼</td> */}
							<td className="writeComment">
								<div className="mb-3">
									{/* <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label> */}
									<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="댓글을 입력해 주세요"></textarea>
									<div className="heart titleBar">등록 버튼</div>
								</div>
							</td>
						</tr>
						{post?.comments.slice(0).map((comment) => <ContentRow comment={comment} />)}
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
				.comment {
					display: flex;
					flex-direction: column;
				}
				.content1 {
					padding: 0px;
					display: flex;
				}
				.content2 {
					padding: 0px;
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