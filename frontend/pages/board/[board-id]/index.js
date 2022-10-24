import BoardUser from "../../../components/board/BoardUser";
import BoardSearchBar from "../../../components/board/BoardSearchBar";
import BoardNavBar from "../../../components/board/BoardNavBar";
import BoardCenter from "../../../components/board/BoardCenter";
import BoardWriteView from "../../../components/board/board-id/BoardWriteView";
import BoardHeader from "../../../components/board/BoardHeader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function board_id(props) {
	//이전 페이지 (BoardMiniView 등)에서 넘어올 때 Link query로 다음 인자를 받아와야 한다. { type, boardId };;
	const router = useRouter();
	const boardId = router.query["board-id"];
	const type = router.query["type"];
	//const category = props?.boards;
	console.log("props", props)
	//console.log("category, query", category, router.query)

	const [article, setArticle] = useState();
	useEffect(() => {
		(async () => {
			const results = await (await fetch(`/api/board/category`, { method: 'GET' })).json();
			setArticle(results.category);
		})();
	}, []);
	console.log(article)
	//const articlePost = article && article.slice(0).find((x) => x.postKey == articleId)


	return (
		<div>
			<div className="container">
				<div className="headerB">
					<BoardHeader type={type} boardId={""} />
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
					<BoardWriteView />
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
            "userInfo header header"
            "userInfo banner banner"
            "navBar   banner banner"
            "navBar   miniB  miniB"
              "navBar   miniB  miniB"
              "navBar   .      .    "
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

export const getServerSideProps = async () => {
	try {
		const response = await fetch(config.API_ENDPOINT + "/api/board/category");		//endpoint는 localhost라 배포 시 오류나는지 확인 필요
		//ISSUE : https://yceffort.kr/2021/10/get-absolute-url-in-nextjs 참고하여 추후 각 실행 환경마다 바뀌는 절대경로에 대한 처리 필요.
		if (response.status >= 400) {
			const response = await fetch("http://20.249.6.135:8080/board/category")
			const boards = await response.json();
			return {
				props: {
					boards
				}
			}
		}
		else {
			const boards = await response.json();
			return {
				props: {
					boards
				}
			}
		}
	} catch {
		return {
			props: {
				boards: { category: [] }
			}
		}
	}
}

