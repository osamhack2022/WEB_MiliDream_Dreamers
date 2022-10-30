import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
//
import BoardUser from "../../components/board/BoardUser";
import BoardSearchBar from "../../components/board/BoardSearchBar";
import BoardNavBar from "../../components/board/BoardNavBar";
import BoardCenter from "../../components/board/BoardCenter";
import BoardHeader from "../../components/board/BoardHeader";


function SearchResult() {
	const router = useRouter();
	const [boards, setBoards] = useState([])
	useEffect(() => {
		if (router.isReady) {
			(async () => {
				const { content } = router.query;
				const response = await fetch(
					`/api/board/query?content=${content}`
				);
				if (response.ok) {
					const data = await response.json();
					const { boards } = data;
					console.log(boards);
					if (boards.length === 0) { //검색결과가 아무것도 없을 때
						//alert('검색 결과가 없습니다!');
					}
					setBoards(boards);
				} else {
					const err = await response.text();
					console.log("err", err);
				}
			})();

		}
	}, [router.isReady, router.query?.content]);

	return (
		<div className="list-group">
			<a className="list-group-item list-group-item-action active" aria-current="true">
				{`검색 결과`}
			</a>
			<div className="list-group-item">
				<ul className="list-group list-group-flush">
					{boards &&
						boards.map((ele) => (
							<Link key={ele.postKey} href={`/board/${ele.categoryKey}/${ele.postKey}`}>
								<a className="list-group-item list-group-item-action">{ele.title}</a>
							</Link>
						))}
				</ul>
			</div>
			<style jsx>{`
        .list-group {
          width: 1000px;
          --bs-list-group-border-color: #A593E0;
          --bs-list-group-active-border-color: #A593E0;
        }
        .list-group-item.list-group-item-action.active {
          background-color: #A593E0;
          font-family: 'Noto Sans KR';
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          align-items: center;
        }
        .list-group-item {
          padding-left: 13px;
          padding-right: 13px;

        }
        .list-group.list-group-flush {
          display: contents;
          font-family: 'Noto Sans KR';
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 22px;
          align-items: center;
          color: #000000;
        }
      `}</style>
		</div>
	)
}



export default function BoardFunction() {

	const router = useRouter();
	const boardId = router.query["board-id"];
	const [article, setArticle] = useState();
	useEffect(() => {
		(async () => {
			const results = await (await fetch(`/api/board/category`, { method: 'GET' })).json();
			setArticle(results.category);
		})();
	}, []);
	const articlePost = article && article.slice(0).find((x) => x.categoryKey == boardId)

	return (
		<div>
			<div className="container">
				<div className="headerB">
					<BoardHeader boardId={`검색 결과`} />
				</div>
				<div className="userInfo">
					<BoardUser />
				</div>
				<div className="navBar">
					<BoardSearchBar placeHolder="게시판 검색" />
					<BoardNavBar props={article} />
				</div>
				<div className="banner">
					<BoardCenter />
				</div>
				<div className="BoardMain">
					<SearchResult />
				</div>

			</div>
			<style jsx>{`
				.container {
					display:  grid;
					grid-template-areas:
					"userInfo header header"
					"userInfo banner banner"
					"navBar   banner banner"
					"navBar   miniB  miniB"
					"navBar   miniB  miniB"
					"navBar   miniB  miniB";
					grid-gap: 16px;
					}
					.headerB { grid-area: header; }
					.banner { grid-area: banner; }
					.userInfo { grid-area: userInfo; }
					.navBar { grid-area: navBar; }
					.BoardMain {.
						display: flex;
						grid-area: miniB;
					}
			`}</style>
		</div>

	);
}

// export async function getServerSideProps({ query }) {
// 	const { content } = query;

// 	console.log(content);
// 	const response = await fetch(
// 		`http://localhost:3000/api/board/query?content=${content}`
// 	);
// 	if (response.ok) {
// 		const data = await response.json();

// 		const { boards } = data;
// 		console.log(boards);
// 		return {
// 			props: { boards },
// 		};
// 	} else {
// 		const err = await response.json();
// 		console.log("err", err);
// 	}
// 	return {
// 		props: {},
// 	};
// }
