//게시판 안에 각 유저별 로그인 정보 보여주는거.

export default function BoardUser(props) {
  return (
    <div>
      <div className={"box"}>
        <div className={"image"}>이미지</div>
        <div className={"userId"}>유저아이디</div>
      </div>
      <style jsx>{`
        .box {
          /* margin: 20px; */
          border: 1px solid gray;
          padding: 20px;
          padding-top: 30px;
          display: flex;
          justify-content: space-around;
          width: 300px;
          height: 300px;
        }
        .image {
          /* margin: 10px; */
          border: 1px solid black;
          background-color: gray;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          text-align: center;
        }
        .userId {
          
        }
      `}</style>
    </div>
  )
}