import BoardUser from "../../components/board/BoardUser";
import BoardSearchBar from "../../components/board/BoardSearchBar";
import BoardNavBar from "../../components/board/BoardNavBar";
import BoardCenter from "../../components/board/BoardCenter";
import BoardMiniView from "../../components/board/BoardMiniView";

export default function board() {
  return (
      <div>
        <div className="container">
          <div className="headerB">
            <h1>게시판 메인 페이지</h1>
          </div>
          <div className="userInfo">          
            <BoardUser />
          </div>
          <div className="navBar">
            <BoardSearchBar />
            <BoardNavBar />
          </div>
          <div className="banner">
            <BoardCenter />
          </div>
          <div className="BoardMain">
            <BoardMiniView type="popular" />
            <BoardMiniView type="free" />
            <BoardMiniView type="recommendPlace" />
            <BoardMiniView type="recommendHobby" />
          </div>
          <div className="footer">footer</div>
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
              "navBar   miniB  miniB"
              "navBar   miniB  miniB"
              "navBar   .      .    "
              "footer   footer  footer";
          }
          .headerB { grid-area: header; }
          .banner { grid-area: banner; }
          .userInfo { grid-area: userInfo; }
          .navBar { grid-area: navBar; }
          .BoardMain { grid-area: miniB; }
          .footer { grid-area: footer; }
        `}</style>
      </div>
  )
}