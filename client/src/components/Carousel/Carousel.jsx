import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
const Carousel = ({ zones }) => {
  console.warn(zones);
  const settings = {
    dots: true,
  infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className=" container d-flex flex-column gap-3">
      <Slider {...settings} className=" container mb-5">
        <div>
          <img
            style={{ width: "100%", height: "700px", borderRadius: "5px" }}
            src="./images/carousel3.jpg"
            alt="img not found"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", height: "700px", borderRadius: "5px" }}
            src="./images/carousel2.jpg"
            alt="img not found"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", height: "700px", borderRadius: "5px" }}
            src="/images/carousel_1.jpg"
            alt="img not found"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
