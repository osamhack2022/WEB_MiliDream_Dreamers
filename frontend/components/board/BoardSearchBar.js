// 게시판 검색 기능

export default function BoardSearchBar() {
  return (
    <>
      {/* bootstrap */}
      <nav class="navbar navbar-light bg-light">
        <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="게시판 검색" aria-label="Search" />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
    </>
  )
}