import BoardUser from "../../../../components/board/BoardUser";
import BoardSearchBar from "../../../../components/board/BoardSearchBar";
import BoardNavBar from "../../../../components/board/BoardNavBar";
import BoardCenter from "../../../../components/board/BoardCenter";
import BoardHeader from "../../../../components/board/BoardHeader";
import { useRouter } from "next/router";

export default function article_id() {
  //이전 페이지 (BoardMiniView 등)에서 넘어올 때 Link query로 다음 인자를 받아와야 한다. { type, boardId };;
  const router = useRouter();
  const articleId = router.query["article-id"];
  const boardId = router.query["board-id"];
  const type = router.query["type"];
  return (
    <div>
      <div className="container">
        <div className="headerB">
          <BoardHeader type={type} boardId={boardId}/>
        </div>
        <div className="userInfo">
          <BoardUser />
        </div>
        <div className="navBar">
          <BoardSearchBar placeHolder="게시판 검색" />
          <BoardNavBar />
        </div>
        <div className="banner">
          <BoardCenter />
        </div>
        <div className="BoardMain">
          
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