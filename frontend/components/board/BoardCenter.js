//게시판 위, 중앙에 사진 및 제목 등
import Image from "next/image";

export default function BoardCenter() {
  const imageList = ["army1_503.jpg", "book_1280.jpg", "books_1280.jpg", "gwanghwamun_1280.jpg", "korea_1280.jpg"];
  const imageComponentList = imageList.map((name) => <Image 
    className="d-block w-100"
    key={name}
    alt={`board center picture ${name}`}
    src={`/board-center/${name}`}
    //sizes="50vw"
    //width="100vw" height="100vh"
    width="1000px" height="574px"
    //layout="responsive"
    placeholder="Loding..."/>);
  //console.log(imageComponentList);

  return (
    <div>
      {/*imageComponentList*/}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            {imageComponentList[0]}
          </div>
          <div className="carousel-item">
            {imageComponentList[1]}
          </div>
          <div className="carousel-item">
            {imageComponentList[2]}
          </div>
          <div className="carousel-item">
            {imageComponentList[3]}
          </div>
          <div className="carousel-item">
            {imageComponentList[4]}
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <style jsx>{`
        .carousel-control-prev, .carousel-control-next {
          z-index: -1;
        }
        #carouselExampleIndicators:hover > .carousel-control-prev, #carouselExampleIndicators:hover > .carousel-control-next {
          z-index: 1;
        }
        #carouselExampleIndicators {
          width: 1000px;
          height: 400px;
          overflow: hidden;
          /*margin-left: 50px;*/
        }
        #carouselExampleIndicators > .carousel-inner .carousel-item.active {

        }
        `}</style>
    </div>
  )
}