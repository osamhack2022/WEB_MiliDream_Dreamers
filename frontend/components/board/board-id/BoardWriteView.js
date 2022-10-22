import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function displayedAt(createdAt) {
	const milliSeconds = Date.parse(new Date()) - Date.parse(createdAt)
	const seconds = milliSeconds / 1000
	if (seconds < 60) return `방금 전`
	const minutes = seconds / 60
	if (minutes < 60) return `${Math.floor(minutes)}분 전`
	const hours = minutes / 60
	if (hours < 24) return `${Math.floor(hours)}시간 전`
	const days = hours / 24
	if (days < 7) return `${Math.floor(days)}일 전`
	const weeks = days / 7
	if (weeks < 5) return `${Math.floor(weeks)}주 전`
	const months = days / 30
	if (months < 12) return `${Math.floor(months)}개월 전`
	const years = days / 365
	return `${Math.floor(years)}년 전`
}

function ContentRow({ article }) {
	//console.log(article);
	const router = useRouter();
	return (
		<Link href={{
			pathname: `/board/${router.query["board-id"]}/${article.postKey}`,
		}}>
			<a>
				<tr>
					<th scope="row" className="count content">{article.postKey}</th>
					<td className="title content">{article.title}</td>
					<td className="writeUser content">{article.userKey}</td>
					<td className="time content gray">{displayedAt(article.postTime)}</td>
					<td className="viewCount content gray">{article.viewCount}</td>
					<td className="heart content gray">{article.recommend}</td>
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
	useEffect(() => {
		(async () => {
			const results = await (await fetch(`/api/board?categoryKey=1`, { method: 'GET' })).json();
			setBoard(results.boards);
		})();
	}, []);
	//console.log(board);

	return (
		<div className="table-box">
			<table className="table">
				<thead className="table-light">
					<tr>
						<th scope="col count" className="count titleBar"></th>
						<th scope="col title" className="title titleBar">글 제목</th>
						<th scope="col writeUser" className="writeUser titleBar">작성자</th>
						<th scope="col time" className="time titleBar">시간</th>
						<th scope="col viewCount" className="veiwCount titleBar">조회수</th>
						<th scope="col heart" className="heart titleBar">공감</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">
					{board && board.slice(0).reverse().map((article) => <ContentRow key={article.postKey} article={article} />)}
				</tbody>
			</table>
			<nav aria-label="Page navigation example">
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
			</nav>
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
        /*위까지는 table 관련 css 작업 // 아래부터는 pagenation botton css 작업*/
        nav {
          display: flex;
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