//id별 네모네모하게 제목이랑 안에 글들 보여주는 것

export default function BoardMiniView(props) {
  return (
    <>
      {/* type:string 에 따라 백에서 다른 값 받아옴. */}

      <table>
        <tr>
          <th>
            <h3 className="boardName">{`${props.type} 게시판`}</h3>
          </th>
        </tr>
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
      </table>

      <style jsx>{`
        table {
          margin: 0px;
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
    </>
  )
}