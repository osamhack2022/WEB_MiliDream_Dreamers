import BoardUser from "../../components/board/BoardUser";
import BoardSearchBar from "../../components/board/BoardSearchBar";
import BoardNavBar from "../../components/board/BoardNavBar";
import BoardCenter from "../../components/board/BoardCenter";
import BoardMiniView from "../../components/board/BoardMiniView";
import BoardHeader from "../../components/board/BoardHeader";

export default function board(props) {
	const category = props?.boards;
	//console.log(category.category)
	return (
		<div>
			<div className="container">
				<div className="headerB">
					<BoardHeader type="main" boardId="MAIN" />
				</div>
				<div className="userInfo">
					<BoardUser />
				</div>
				<div className="navBar">
					<BoardSearchBar placeHolder="게시판 검색" />
					<BoardNavBar props={category} />
				</div>
				<div className="banner">
					<BoardCenter />
				</div>
				<div className="BoardMain">
					{category.category && category.category.slice(0).reverse().map((article) => <BoardMiniView key={article.categoryKey} link={article.categoryKey} type="hobby" boardId={article.categoryName} />)}
					{/* <BoardMiniView type="hobby" boardId="인기 게시판" />
					<BoardMiniView type="hobby" boardId="자유 게시판" />
					<BoardMiniView type="hobby" boardId="추천 복무지 게시판" />
					<BoardMiniView type="hobby" boardId="추천 관심사 게시판" />
					<BoardMiniView type="place" boardId="56사단" /> */}
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
	const response = await fetch("http://milidream.ml/api/board/category");
	//console.log(response.status)
	if (response.status >= 500) {
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
}


//ISSUE : https://yceffort.kr/2021/10/get-absolute-url-in-nextjs 참고하여 추후 각 실행 환경마다 바뀌는 절대경로에 대한 처리 필요.

//아래 코드로 시도했으나, github codespace의 변화무쌍한 url 처리 실패.. 추후 다시 시도

// import { IncomingMessage } from 'http'

// function getAbsoluteURL(req) {
//   // 로컬은 http, 프로덕션은 https 라는 가정
//   const protocol = req ? 'https:' : 'http:'
//   let host = req
//     ? req.headers['x-forwarded-host'] || req.headers['host']
//     : window.location.host

//   // 주소에 local이라는 문자열이 들어가 있다면,
//   // 또는 별도의 환경변수를 주입하고 있다면 그것을 사용해도된다.
//   // process.env.RECT_APP_PROFILES === 'local'
//   if ((host || '').toString().indexOf('local') > -1) {
//     // 개발자 머신에서 실행했을 때 로컬
//     host = 'localhost:3000'
//   }

//   return {
//     protocol: protocol,
//     host: host,
//     origin: protocol + '//' + host,
//   }
// }

  
//   async function getUser(id, options) {
// 	const absoluteURL = getAbsoluteURL(options?.req).origin
// 	const response = await fetch(
// 	  options?.req ? absoluteURL : '' + `/api/board/category`,
// 	)
// 	const result = await response.json()
// 	return result
//   }

//   export const getServerSideProps = async (ctx) => {
// 	const { req } = ctx
// 	const userId = ctx.query?.userId
  
// 	const user = await getUser(userId, { req })
// 	return {
// 	  props: {
// 		user,
// 	  },
// 	}
//   }