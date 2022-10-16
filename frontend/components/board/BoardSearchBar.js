// 게시판 검색 기능

export default function BoardSearchBar({ placeHolder }) {
  return (
    <div>
      {/* bootstrap */}
      <nav className="navbar navbar-light">
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder={placeHolder} aria-label="Search" />
          <button className="btn btn-outline-success my-sm-0" type="submit"><i className="fa fa-search"></i></button>
        </form>
      </nav>
      <style jsx>{`
        .form-inline {
          display: flex;
        }
        .form-control.mr-sm-2 {
          border: 1px solid #566270;
          border-right: 0px;
          border-radius: 0px;
          height: 50px;
          /* outline: 1px solid #566270; */
        }
        .form-control.mr-sm-2::placeholder {
          color: #A593E0;
        }
        .btn {
          border: 1px solid #566270;
          border-left: 0px;
          border-radius: 0px;
          color: #A593E0;
        }
        .navbar {
          display: block;
        }
      `}</style>
    </div>
  )
}