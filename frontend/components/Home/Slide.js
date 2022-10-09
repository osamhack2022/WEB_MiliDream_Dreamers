import { Component } from "react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class Slide extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      // 이미지 비율에 따라 화면 변경 adaptiveHeight: true,
    };
    return (
      <div className="Slide">
        <Slider {...settings}>
          <div>
            <h3>Advertisement_1</h3>
          </div>
          <div>
            <h3>Advertisement_2</h3>
          </div>
          <div>
            <h3>Advertisement_3</h3>
          </div>
          <div>
            <h3>Advertisement_4</h3>
          </div>
          <div>
            <h3>Advertisement_5</h3>
          </div>
          <div>
            <h3>Advertisement_6</h3>
          </div>
        </Slider>

        <style jsx>
          {`
            .Slide {
              display: auto;
              position: absolute;
              top: 1200px;
              width: 100%;
              height: 350px;
              justify-content: center;
              align-items: center;
            }
            div {
              text-align: center;
              justify-content: center;
              align-items: center;
              background-color: #fffff3;
              line-height: 210px;
            }
            img {
              width: 200px;
              display: block;
              margin: 0px auto;
              cursor: pointer;
            }
            h3 {
              font-size: 50px;
            }
          `}
        </style>
      </div>
    );
  }
}
