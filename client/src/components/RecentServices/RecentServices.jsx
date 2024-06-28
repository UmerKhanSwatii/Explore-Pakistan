import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentServices = () => {
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
  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <div className="contanier-fluid my-5 py-5 ms-5">
      <h2 className="h2 ms-3 all-headings-textColor">Most Recent Services</h2>
      <div className="d-flex flex-row flex-wrap  mt-5 gap-5  justify-content-center rounded-4">
        {services?.map((s) => (
          <Link to={`/single-service/${s.slug}`}>
            <div key={s._id} className="main my-2 mx-2   ">
              <img
                src={s?.profilePic?.url}
                alt={s.image}
                className="rounded-4"
                style={{ width: "360px", height: "360px" }}
              />
              <div className="body">
                <h4 className=" h3 text-light">{s.name}</h4>
                <p className="text-light">
                  {new Date(s.startDate).toLocaleDateString()}
                </p>
                <div className="text-light h5">{s.price}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentServices;
