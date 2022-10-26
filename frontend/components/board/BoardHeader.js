import BoardSearchBar from "./BoardSearchBar";

export default function BoardHeader({ type, boardId }) {
	//console.log(type, boardId);
	if (boardId === "MAIN") {
		return (
			<div className="headerB">
				<h1>커뮤니티 | {boardId}</h1>
				<BoardSearchBar placeHolder="게시글 검색" />
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
          margin-left: 15px;
          margin-bottom: 0px;
        }
      `}</style>
			</div>
		)
	}
	else {
		return (
			<div>
				<div className="headerB">
					<h1>커뮤니티 | {boardId}</h1>
					<BoardSearchBar placeHolder="게시글 검색" />
				</div>
				<div className="header2">
					{`장병들을 위한 ${boardId} 커뮤니티입니다. ${boardId} 화이팅!!`}
				</div>
				<style jsx>{`
        .headerB { 
          border-top: 3px solid #566270;
          border-bottom: 3px solid rgba(86, 98, 112, 0.7);
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
          margin-left: 15px;
          margin-bottom: 0px;
        }
        .header2 {
          font-family: 'Noto Sans KR';
          font-style: normal;
          font-weight: 400;
          font-size: 15px;
          line-height: 22px;
          color: rgba(86, 98, 112, 0.8);
          padding-left : 15px;
          display: flex;
          align-items: center;
          height: 50px;
          border-bottom: 3px solid #566270;
        }
      `}</style>
			</div>
		)
	}
}