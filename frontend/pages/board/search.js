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
					setBoards(boards);
				} else {
					const err = await response.text();
					console.log("err", err);
				}
			})();

		}
	}, [router.isReady, router.query?.content]);

	return (
		<ul>
			{boards &&
				boards.map((ele) => (
					<Link key={ele.postKey} href={`/board/${ele.categoryKey}/${ele.postKey}`}>
						<a>
							<li>{ele.title}</li>
						</a>
					</Link>
				))}
		</ul>
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
					<BoardHeader boardId={articlePost?.categoryName} />
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
