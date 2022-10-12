//게시판 안에 각 유저별 로그인 정보 보여주는거.
import Image from "next/image";

export default function BoardUser(props) {
  return (
    <div>
      <div className={"box"}>
        <div className={"image"}>
          <Image     
            className="user-image"
            alt={`user image`}
            src={`/board-user/user.svg`}
            width="90px" height="90px"
            placeholder="user main img..."
            priority={true} />
          <div className="detail">
            <div className={"userId"}>유저아이디</div>
            <a className={"profile"} href="#">프로필 상세보기</a>
          </div>
        </div>
        <div className="detail">
          <div className={"rank"}>
            <div className="header">계급 | </div>
            <div className="content"> 상병 2호봉</div>
          </div>
          <div className={"place"}>
            <div className="header">복무지 | </div>
            <div className="content">{`수도방위사령부 제56보병사단 정보통신대대`}</div>
          </div>
          <div className={"career-type"}>
            <div className="header">진로유형 | </div>
            <div className="content"> 자기계발</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .box {
          /* margin: 20px; */
          border: 1px solid gray;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          width: 300px;
          height: 216px;
        }
        .image {
          display: flex;
        }
        .image > .detail {
          padding-left : 20px;
        }
        .detail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left : 7px;
        }
        .userId {
          font-family: 'Noto Sans KR';
          font-style: normal;
          font-weight: 600;
          font-size: 17px;
          line-height: 25px;
          color: #000000;
        }
        .profile {
          font-family: 'Noto Sans KR';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          text-decoration-line: underline;
          color: #A593E0;
          cursor: pointer;
        }
        .header {
          color: #A7A7A7;
          white-space: nowrap;
        }
        .content {
          color: #000000;
          margin-left: 5px;
        }
        .box > .detail > * {
          display: flex;
          line-height: 17px;
          font-weight: 400;
          font-size: 12px;
          font-family: 'Noto Sans KR';
          font-style: normal;
        }
      `}</style>
    </div>
  )
}