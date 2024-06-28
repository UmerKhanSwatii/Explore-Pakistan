import axios from "axios";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./CityBaseServices.css";
import { Link } from "react-router-dom";
const CityBaseServices = ({ name }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const [services, setServices] = useState([]);
  const getCityBaseServices = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/service/get-services-cityName/${name}`
      );
      console.warn(res);
      if (res?.data?.success) {
        setServices(res.data.filteredServices);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getCityBaseServices();
  }, []);
  return (
    <>
      <div className="container-fluid my-5 py-2 ms-5">
        <h2 className=" all-headings-textColor"> {`Services in ${name}`}</h2>
        <Slider {...settings} className="  my-5 ">
          {services?.map((s) => (
            <Link to={`/single-service/${s.slug}`}>
              <div className=" main  ">
                <img
                  style={{ width: "360px", height: "360px" }}
                  src={s?.profilePic?.url}
                  alt="Card image"
                  className="rounded-4"
                />

                <div className="body">
                  <h4 className=" h3 text-light">{s.name}</h4>
                  <p className="text-light">
                    {new Date(s.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default CityBaseServices;
