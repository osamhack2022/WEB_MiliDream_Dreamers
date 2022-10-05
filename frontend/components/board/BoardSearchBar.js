// 게시판 검색 기능

export default function BoardSearchBar() {
  return (
    <div>
      {/* bootstrap */}
      <nav className="navbar navbar-light bg-light">
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="게시판 검색" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
    </div>
  )
}