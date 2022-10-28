import BoardUser from "../../../../components/board/BoardUser";
import BoardSearchBar from "../../../../components/board/BoardSearchBar";
import BoardNavBar from "../../../../components/board/BoardNavBar";
import ArticleWriteView from "../../../../components/board/board-id/article-id/ArticleWriteView";
import BoardHeader from "../../../../components/board/BoardHeader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GlobalState } from "../../../../states/GlobalState";
import LoginModal from "../../../../components/Login/Modal";

export default function article_id() {
	//이전 페이지 (BoardMiniView 등)에서 넘어올 때 Link query로 다음 인자를 받아와야 한다. { type, boardId };;
	const router = useRouter();
	const articleId = router.query["article-id"];
	const boardId = router.query["board-id"];
	const type = router.query["type"];

	const [articlePost, setArticlePost] = useState();
	const getCategoryList = GlobalState(state => state.getCategoryList);
	const [reload, setReload] = useState(true);
	const user = GlobalState(state => state.user);

	const doReload = () => setReload(true);

	/** 로그인되어 있지 않다면 메인페이지로 이동 */
	useEffect(() => {
		if (!user) {
			router.push("/");
			alert("로그인이 필요합니다.")
			//return (
			//	<button type="button" data-bs-toggle="modal" data-bs-target="#loginModal">시작하기</button>
			//)
		}
	}, [user]);

	useEffect(() => {
		getCategoryList();
	}, [])

	useEffect(() => {
		// router가 준비되어야, 그리고 reload가 켜질 때 fetch 시작
		if (router.isReady && reload) {
			(async () => {
				const results = await (await fetch(`/api/board/${router.query["article-id"]}`, { method: 'GET' })).json();
				setArticlePost(results.board);
			})();
			setReload(false);
		}
	}, [router.isReady, reload]);

	return (
		<div>
			<div className="container">
				<div className="headerB">
					<BoardHeader type={type} boardId={articlePost?.categoryName} />
				</div>
				<div className="userInfo">
					<BoardUser />
				</div>
				<div className="navBar">
					<BoardSearchBar placeHolder="게시판 검색" />
					<BoardNavBar />
				</div>
				<div className="BoardMain">
					<ArticleWriteView post={articlePost} articleId={articleId} doReload={doReload} />
				</div>
				<div className="footer"></div>
			</div>
			<style jsx>{`
			.BoardMain {
				display: flex;
			}
			.container {
				display:  grid;
				grid-template-areas:
				"userInfo header  header"
				"userInfo header  header"
				"navBar   miniB   miniB"
				"navBar   miniB   miniB"
				"navBar   miniB   miniB"
				"navBar   miniB   miniB"
				"footer   footer  footer";
				grid-gap: 16px;
			}
			.headerB { grid-area: header; }
			.banner { grid-area: banner; }
			.userInfo { grid-area: userInfo; }
			.navBar { grid-area: navBar; }
			.BoardMain {
				grid-area: miniB;
				display: contents;
			}
			.footer { grid-area: footer; }
			`}</style>
		</div>
	)
}


// export const getServerSideProps = async () => {
// 	try {
// 		const response = await fetch(config.API_ENDPOINT + "/api/board/category");
// 		if (response.status >= 400) {
// 			const response = await fetch("http://20.249.6.135:8080/board/category")
// 			const boards = await response.json();
// 			return {
// 				props: {
// 					boards
// 				}
// 			}
// 		}
// 		else {
// 			const boards = await response.json();
// 			return {
// 				props: {
// 					boards
// 				}
// 			}
// 		}
// 	} catch {
// 		return {
// 			props: {
// 				boards: { category: [] }
// 			}
// 		}
// 	}
// }
