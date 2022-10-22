import BoardUser from "../../components/board/BoardUser";
import BoardSearchBar from "../../components/board/BoardSearchBar";
import BoardNavBar from "../../components/board/BoardNavBar";
import BoardCenter from "../../components/board/BoardCenter";
import BoardMiniView from "../../components/board/BoardMiniView";
import BoardHeader from "../../components/board/BoardHeader";

export default function board() {
  return (
      <div>
        <div className="container">
          <div className="headerB">
            <BoardHeader type="main" boardId="MAIN"/>
          </div>
          <div className="userInfo">          
            <BoardUser />
          </div>
          <div className="navBar">
            <BoardSearchBar placeHolder="게시판 검색"/>
            <BoardNavBar />
          </div>
          <div className="banner">
            <BoardCenter />
          </div>
          <div className="BoardMain">
            <BoardMiniView type="hobby" boardId="인기 게시판" />
            <BoardMiniView type="hobby" boardId="자유 게시판" />
            <BoardMiniView type="hobby" boardId="추천 복무지 게시판" />
            <BoardMiniView type="hobby" boardId="추천 관심사 게시판" />
            <BoardMiniView type="place" boardId="56사단" />
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