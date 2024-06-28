import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";
import { useAuth } from "../../../context/auth";

const Services = () => {
  const [services, setServices] = useState([]);
  const [auth, setAuth] = useAuth();

  const [loading, setLoading] = useState(false);

  //get all products
  const getAllServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/v1/service/single/${auth?.user?._id}`
      );

      if (res?.data?.success) {
        setLoading(false);
        setServices(res?.data?.services);
      } else {
        setLoading(false);
        alert(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <>
      <>
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-3">
              <SellerMenu />
            </div>
            <div className="col-8 border rounded-4 px-5 py-5">
              <div className="h2 mb-3" style={{ color: "#3A6A3B" }}>
                Services
              </div>
              <div
                className="w-25 mx-auto  text-center my-5"
                style={{ color: "#3A6A3B", fontSize: "20px" }}
              >
                {services?.length} services present
              </div>
              <table className="table table-striped table-hover w-100">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services?.map((a) => {
                    return (
                      <>
                        <tr key={a._id}>
                          <td>
                            {" "}
                            <img
                              src={a?.profilePic.url}
                              alt={a.image}
                              style={{ width: "100px", height: "100px" }}
                            />
                          </td>
                          <td>{a.name}</td>
                          <td>{new Date(a.startDate).toLocaleDateString()}</td>
                          <td>{new Date(a.endDate).toLocaleDateString()}</td>
                          <td>{a.price}</td>

                          <td>
                            <Link
                              className="text-decoration-none"
                              to={`/dashboard/seller/services/${a.slug}`}
                            >
                              <button className="btn btn-warning"> Edit</button>
                            </Link>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Services;
