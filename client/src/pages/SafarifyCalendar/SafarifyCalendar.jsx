import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const SafarifyCalendar = () => {
  const [services, setServices] = useState([]);
  const getAllServices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/service/get-service"
      );
      if (res?.data?.success) {
        setServices(res.data.services);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //create new date object
  const currentDate = new Date();
  //different arrays for different dates
  const thisWeek = [];
  const nextWeek = [];
  const thisMonth = [];
  const nextMonth = [];
  const afterNextMonth = [];

  services.forEach((service) => {
    const startDate = new Date(service.startDate);
    const endDate = new Date(service.endDate);

    if (startDate <= currentDate && endDate >= currentDate) {
      thisWeek.push(service);
    } else if (
      startDate >= currentDate &&
      startDate <= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    ) {
      nextWeek.push(service);
    } else if (
      startDate.getMonth() === currentDate.getMonth() &&
      startDate.getFullYear() === currentDate.getFullYear()
    ) {
      thisMonth.push(service);
    } else if (
      (startDate.getMonth() === currentDate.getMonth() + 1 &&
        startDate.getFullYear() === currentDate.getFullYear()) ||
      (startDate.getMonth() === 0 &&
        startDate.getFullYear() === currentDate.getFullYear() + 1)
    ) {
      nextMonth.push(service);
    } else {
      afterNextMonth.push(service);
    }
  });

  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <>
      <Layout>
        <div className="d-flex flex-column gap-3 ms-5 my-5 py-3">
          <div className="h2 ms-2 all-headings-textColor">
            This week service
          </div>
          <div className="d-flex flex-row flex-wrap  mt-3 gap-4 justify-content-center">
            {thisWeek?.map((service) => (
              <Link to={`/single-service/${service.slug}`}>
                <div key={service._id} className="main my-2 mx-2   ">
                  <img
                    style={{ width: "360px", height: "360px" }}
                    src={service?.profilePic.url}
                    alt="Card image"
                    className="rounded-4"
                  />

                  <div className="body">
                    <h4 className=" h3 text-light">{service.name}</h4>
                    <p className="text-light">
                      {new Date(service.startDate).toLocaleDateString()}
                    </p>
                    <div className="text-light h5">{service.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* next week service */}
        <div className="d-flex flex-column gap-3 ms-5 my-5 py-3">
          <div className="h2 ms-2 all-headings-textColor">
            Next week service
          </div>
          <div className="d-flex flex-row flex-wrap  mt-3 gap-4 justify-content-center">
            {nextWeek?.map((service) => (
              <Link to={`/single-service/${service.slug}`}>
                <div key={service._id} className="main my-2 mx-2   ">
                  <img
                    style={{ width: "360px", height: "360px" }}
                    src={service?.profilePic.url}
                    alt="Card image"
                    className="rounded-4"
                  />
                  <div className="body">
                    <h4 className=" h3 text-light">{service.name}</h4>
                    <p className="text-light">
                      {new Date(service.startDate).toLocaleDateString()}
                    </p>
                    <div className="text-light h5">{service.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* this month services */}
        <div className="d-flex flex-column gap-3 ms-5 my-5 py-3">
          <div className="h2 ms-2 all-headings-textColor">
            This Month services
          </div>
          <div className="d-flex flex-row flex-wrap  mt-3 gap-4 justify-content-center">
            {thisMonth?.map((service) => (
              <Link to={`/single-service/${service.slug}`}>
                <div key={service._id} className="main my-2 mx-2   ">
                  <img
                    style={{ width: "360px", height: "360px" }}
                    src={`http://localhost:8080/api/v1/service/get-photo/${service._id}`}
                    alt="Card image"
                    className="rounded-4"
                  />
                  <div className="body">
                    <h4 className=" h3 text-light">{service.name}</h4>
                    <p className="text-light">
                      {new Date(service.startDate).toLocaleDateString()}
                    </p>
                    <div className="text-light h5">{service.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* next month services */}
        <div className="d-flex flex-column gap-3 ms-5 my-5 py-3">
          <div className="h2 ms-2 all-headings-textColor">
            Next Month services
          </div>
          <div className="d-flex flex-row flex-wrap  mt-3 gap-4 justify-content-center">
            {nextMonth?.map((service) => (
              <Link to={`/single-service/${service.slug}`}>
                <div key={service._id} className="main my-2 mx-2   ">
                  <img
                    style={{ width: "360px", height: "360px" }}
                    src={service?.profilePic.url}
                    alt="Card image"
                    className="rounded-4"
                  />
                  <div className="body">
                    <h4 className=" h3 text-light">{service.name}</h4>
                    <p className="text-light">
                      {new Date(service.startDate).toLocaleDateString()}
                    </p>
                    <div className="text-light h5">{service.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* after next month services */}
        <div className="d-flex flex-column gap-3 ms-5 my-5 py-3">
          <div className="h2 ms-2 all-headings-textColor">
            After Next Month services
          </div>
          <div className="d-flex flex-row flex-wrap  mt-3 gap-4 justify-content-center">
            {afterNextMonth?.map((service) => (
              <Link to={`/single-service/${service.slug}`}>
                <div key={service._id} className="main my-2 mx-2   ">
                  <img
                    style={{ width: "360px", height: "360px" }}
                    src={service?.profilePic.url}
                    alt="Card image"
                    className="rounded-4"
                  />
                  <div className="body">
                    <h4 className=" h3 text-light">{service.name}</h4>
                    <p className="text-light">
                      {new Date(service.startDate).toLocaleDateString()}
                    </p>
                    <div className="text-light h5">{service.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SafarifyCalendar;
