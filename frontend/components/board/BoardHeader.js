import BoardSearchBar from "./BoardSearchBar";

export default function BoardHeader() {
  return (
    <div className="headerB">
      <h1>커뮤니티 | 메인</h1>
      <BoardSearchBar placeHolder="게시글 검색"/>
      <style jsx>{`
        .headerB { 
          border-top: 3px solid #566270;
          border-bottom: 3px solid #566270;
          width: 1000px;
          display: flex;
          justify-content: space-between;
        }
        .headerB > h1 {
          color: #A593E0;
          font-family: 'Noto Sans KR';
          font-style: normal;
          font-weight: 700;
          font-size: 30px;
          line-height: 43px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  )
}