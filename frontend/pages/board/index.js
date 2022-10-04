import BoardUser from "../../components/board/BoardUser";
import BoardSearchBar from "../../components/board/BoardSearchBar";
import BoardNavBar from "../../components/board/BoardNavBar";
import BoardCenter from "../../components/board/BoardCenter";
import BoardMiniView from "../../components/board/BoardMiniView";

export default function board() {
  return (
      <>
        <h1>게시판 메인 페이지</h1>
        <BoardUser />
        <BoardSearchBar />
        <BoardNavBar />
        <BoardCenter />
        <div className="BoardMain">
          <BoardMiniView type="popular" />
          <BoardMiniView type="free" />
          <BoardMiniView type="recommendPlace" />
          <BoardMiniView type="recommendHobby" />
        </div>
        <style jsx>{`
          .BoardMain {
            display: flex;
          }
        `}</style>
      </>
  )
}