//게시판 위, 중앙에 사진 및 제목 등
import Image from "next/image";

export default function BoardCenter() {
  const imageList = ["army1_503.jpg", "book_1280.jpg", "books_1280.jpg", "gwanghwamun_1280.jpg", "korea_1280.jpg"];
  const imageComponentList = imageList.map((name) => <Image 
    key={name}
    alt={`board center picture ${name}`}
    src={`/board-center/${name}`}
    width="500px" height="300px"
    placeholder="Loading..."/>);
  console.log(imageComponentList);

  return (
    <div>
      {imageComponentList}
    </div>
  )
}