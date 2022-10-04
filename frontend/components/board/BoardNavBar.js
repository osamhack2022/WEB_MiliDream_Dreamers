//board 전용 네비게이션 바 / 좌측바 - 네이버 카페 처럼.

export default function BoardNavBar() {
  return (
    <>
      <ul>
        {/*게시물 좌측*/}
        <li>
          <ul>
            <li>공지사항</li>
            <li>실시간 인기 게시판</li>
            <li>자유게시판</li>
          </ul>
        </li>
        {/*게시물 출력 template*/}
        <li>
          <div>복무지 별 커뮤니티</div>
          <ul>
            <li>커뮤니티1</li>
            <li>커뮤니티2</li>
            <li>커뮤니티3</li>
            <li>커뮤니티4</li>
            <li>커뮤니티5</li>
          </ul>
        </li>
        <li>
          <div>관심사 별 커뮤니티</div>
          <ul>
            <li>커뮤니티1</li>
            <li>커뮤니티2</li>
            <li>커뮤니티3</li>
            <li>커뮤니티4</li>
            <li>커뮤니티5</li>
          </ul>
        </li>
        
        <li>
          <ul>
            <li>버그 신고하기</li>
            <li>건의사항</li>
          </ul>
        </li>

        {/*게시판 페이징 template 
        <li>
          <div>&lt;</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>&gt;</div>
        </li>
        or 무한 스크롤??*/}

        {/*게시글 검색 기능 - 따로 분리해야 할 듯*/}
        <li>
          <div>
            <select>
              <option value="All">제목 + 내용</option>
              <option value="Title">제목</option>
              <option value="Content">내용</option>
            </select>
            <input />
            <input type="button" value="검색"/>
          </div>
        </li>

      </ul>
    </>
  )
}