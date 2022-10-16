//id별 네모네모하게 제목이랑 안에 글들 보여주는 것

export default function BoardMiniView({ type, boardId }) {
  
  return (
    <div className="list-group">
      <a href={`board/${boardId}`} className="list-group-item list-group-item-action active" aria-current="true">
        {`${boardId} 게시판`}
      </a>
      <div className="list-group-item">
        <ul className="list-group list-group-flush">
          <a href="#" className="list-group-item list-group-item-action">게시글 제목 1</a>
          <a href="#" className="list-group-item list-group-item-action">게시글 제목 2</a>
          <a href="#" className="list-group-item list-group-item-action">게시글 제목 3</a>
          <a href="#" className="list-group-item list-group-item-action">게시글 제목 4</a>
          <a href="#" className="list-group-item list-group-item-action">게시글 제목 5</a>
        </ul>
      </div>
      <style jsx>{`
        .list-group {
          width: 492px;
          --bs-list-group-border-color: #A593E0;
          --bs-list-group-active-border-color: #A593E0;
        }
        .list-group-item.list-group-item-action.active {
          background-color: #A593E0;
          font-family: 'Noto Sans KR';
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          align-items: center;
        }
        .list-group-item {
          padding-left: 13px;
          padding-right: 13px;

        }
        .list-group.list-group-flush {
          display: contents;
          font-family: 'Noto Sans KR';
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 22px;
          align-items: center;
          color: #000000;
        }
      `}</style>
    </div>
  )

  
  


  /* type:string 에 따라 백에서 다른 값 받아옴. */
  /*
  return (
    <div>
      

      <table>
        <thead>
          <tr>
            <th>
              <h3 className="boardName">{`${props.type} 게시판`}</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a>
                <div>게시글 제목 1</div>
                <div>n분 전</div>
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a>
                <div>게시글 제목 2</div>
                <div>n분 전</div>
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a>
                <div>게시글 제목 3</div>
                <div>n분 전</div>
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a>
                <div>게시글 제목 4</div>
                <div>n분 전</div>
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a>
                <div>게시글 제목 5</div>
                <div>n분 전</div>
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <style jsx>{`
        table {
          margin: 10px;
          border: 1px solid purple;
          width: 300px;
        }
        .boardName {
          margin: 0px;
          text-align: left;
        }
        tr {
          padding-left: 10px;
        }
        a {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
        }
      `}</style>
    </div>
  )*/
}