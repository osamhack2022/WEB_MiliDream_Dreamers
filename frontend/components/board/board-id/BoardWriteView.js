import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { displayedAt } from "../../../utils/strings";

function ContentRow({ article }) {
	const router = useRouter();
	const [articleUser, setArticleUser] = useState("");
	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/user/${article.userKey}`);
			const data = await response.json();
			setArticleUser(data.userName)
		})();
	}, [])
	return (
		<Link href={{
			pathname: `/board/${router.query["board-id"]}/${article.postKey}`,
		}}>
			<a>
				<tr>
					<th scope="row" className="count content">{article.postKey}</th>
					<td className="title content">{article.title}</td>
					<td className="writeUser content">{articleUser}</td>
					<td className="time content gray">{displayedAt(article.postTime)}</td>
					<td className="viewCount content gray">{article.viewCount}</td>
					<td className="heart content gray">{article.recommenderCount}</td>
					<style jsx>{`
					.title.content:after {
						content: "[${article.comments.length}]";
						margin-left: .5em;
					}
					`}</style>
					{//<td onClick={() => location.href = `/board/${boardId}/${postKey}`} className="title content">{title}</td>
					}
				</tr>
			</a>
		</Link>
	)
}

export default function BoardWriteView() {
	function pagenation() {
		console.log("아직 페이지 버튼 눌럿을 때 페이지 이동하는거 미완성입니다아아아아아");
	}
	const [board, setBoard] = useState();
	const router = useRouter();
	useEffect(() => {
		if (router.isReady) {
			(async () => {
				const results = await (await fetch(`/api/board?categoryKey=` + router.query["board-id"], { method: 'GET' })).json();
				setBoard(results);
			})();
		}
	}, [router.isReady, router.query["board-id"]]);

	return (
		<div>
			<div className="table-box">
				<table className="table">
					<thead className="table-light">
						<tr>
							<th scope="col count" className="count titleBar"></th>
							<th scope="col title" className="title titleBar">글 제목</th>
							<th scope="col writeUser" className="writeUser titleBar">작성자</th>
							<th scope="col time" className="time titleBar">시간</th>
							<th scope="col viewCount" className="viewCount titleBar">조회수</th>
							<th scope="col heart" className="heart titleBar">공감</th>
						</tr>
					</thead>
					<tbody className="table-group-divider">
						{board && board?.boards.slice(0).reverse().map((article) => <ContentRow key={article.postKey} article={article} />)}
					</tbody>
				</table>

				{/* <nav aria-label="Page navigation example">
					<ul className="pagination">
						<li className="page-item">
							<a className="page-link" href="#" aria-label="Previous">
								<span aria-hidden="true">&laquo;</span>
							</a>
						</li>
						<li className="page-item"><a className="page-link" href="#">1</a></li>
						<li className="page-item active" aria-current="page"><a className="page-link" href="#">2</a></li>
						<li className="page-item"><a className="page-link" href="#">3</a></li>
						<li className="page-item"><a className="page-link" href="#">4</a></li>
						<li className="page-item"><a className="page-link" href="#">5</a></li>
						<li className="page-item">
							<a className="page-link" onClick={pagenation} aria-label="Next">
								<span aria-hidden="true">&raquo;</span>
							</a>
						</li>
					</ul>
				</nav> */}

			</div>
			<div className="row write-btn">
				<a className="btn btn-secondary" onClick={() => { router.push(`/board/${router.query["board-id"]}/write`) }}>글 작성</a>
			</div>
			<style global jsx>{`
			a {
				color: transparent;
			}
			a:hover {
				color: transparent;
			}
			.table-box {
			border: 1px solid #A593E0;
			}
			.table {
			--bs-table-color: #A593E0;
			--bs-table-border-color: transparent;
			width: 1000px;
			display: flex;
			flex-direction: column;
			text-align: center;
			}
			.table-light {
			--bs-table-color: white;
			--bs-table-bg: #A593E0;
			--bs-table-border-color: #A593E0;
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
			tbody > a {
			display: flex;
			flex-direction: column;
			}
			tbody > a:after {
			content: "";
			display: block;
			width: 970px;
			border-bottom: 1px solid #A593E0;
			margin-left: 15px;
			}
			thead > tr {
			height: 45px;
			}
			tbody > a {
			height: 40px;
			}
			.count { width: 95px; }
			.title { width: 540px; }
			.writeUser { width: 125px; }
			.time { width: 85px; }
			.viewCount { width: 70px; }
			.heart { width: 85px; }
			.title.content {
			text-align: start;
			}
			.title.content:after {
			content: "[5]";
			margin-left: .5em;
			}
			.title.content:after {
				content: "[5]";
				margin-left: .5em;
			}

			/* 글 작성 버튼 관련*/
			
			.write-btn{
				width: 1000px;
				margin: auto;
				margin-top: 15px;
				
			}
			.btn-secondary {
				background-color: #a593e0;
				border-color: #a593e0;
			}
			/*위까지는 table 관련 css 작업 // 아래부터는 pagenation botton css 작업*/
			nav.page {
			display: none;
			justify-content: center;
			}
			ul {
			cursor: pointer;
			}
		`}</style>
		</div>

		// <div className="list-group">
		//   <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
		//     글 제목 작성자 시간 조회수 공감
		//   </a>
		//   <div className="list-group-item">
		//     <ul className="list-group list-group-flush">
		//       <a href="#" className="list-group-item list-group-item-action">게시글 제목 1</a>
		//       <a href="#" className="list-group-item list-group-item-action">게시글 제목 2</a>
		//       <a href="#" className="list-group-item list-group-item-action">게시글 제목 3</a>
		//       <a href="#" className="list-group-item list-group-item-action">게시글 제목 4</a>
		//       <a href="#" className="list-group-item list-group-item-action">게시글 제목 5</a>
		//     </ul>
		//   </div>
		//   <style jsx>{`
		//     .list-group {
		//       width: 492px;
		//       --bs-list-group-border-color: #A593E0;
		//       --bs-list-group-active-border-color: #A593E0;
		//     }
		//     .list-group-item.list-group-item-action.active {
		//       background-color: #A593E0;
		//       font-family: 'Noto Sans KR';
		//       font-style: normal;
		//       font-weight: 600;
		//       font-size: 20px;
		//       align-items: center;
		//     }
		//     .list-group-item {
		//       padding-left: 13px;
		//       padding-right: 13px;
		//     }
		//     .list-group.list-group-flush {
		//       display: contents;
		//       font-family: 'Noto Sans KR';
		//       font-style: normal;
		//       font-weight: 500;
		//       font-size: 15px;
		//       line-height: 22px;
		//       align-items: center;
		//       color: #000000;
		//     }
		//   `}</style>
		// </div>
	)
}