import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);

  //get all services
  const getAllServices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/service/get-service"
      );
      if (res?.data?.success) {
        setServices(res?.data?.services);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <Layout>
      <div className="container-fluid my-5">
        <h5 className="text-center my-3">
          {services.length < 1
            ? "No Service found"
            : `${services?.length} services found`}
        </h5>
        <div className="container d-flex flex-wrap my-5 gap-4  justify-content-center">
          {services?.map((s) => {
            return (
              <div
                className="card mx-3 pb-3 mb-3 border-0"
                key={s._id}
                style={{ width: "350px" }}
              >
                <img
                  src={s?.profilePic?.url}
                  alt={s.image}
                  style={{ height: "280px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{s.name}</h5>
                  <p className="card-text">
                    {s.description.substring(0, 100)}...
                  </p>
                  <Link to={`/single-service/${s.slug}`}>
                    <button
                      className="btn text-light w-100 "
                      style={{ background: "#1dbf73" }}
                    >
                      View
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Services;
