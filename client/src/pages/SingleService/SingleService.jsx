import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout/Layout";
import Rating from "../../components/Rating/Rating";
import { useAuth } from "../../context/auth";

const SingleService = () => {
  const { slug } = useParams();
  const [service, setService] = useState([]);
  const [auth, setAuth] = useAuth();
  console.warn(auth);

  const navigate = useNavigate();
  const getSingleService = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/service/get-service/${slug}`
      );
      if (res?.data?.success) {
        setService(res.data.service);
      } else {
        console.warn(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getSingleService();
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid my-5">
          <div className="row">
            <div className="col-7  px-5 pt-3 d-flex flex-column gap-4   ">
              <div className="h2 text-color-heading">{service.name}</div>
              <div>{`Validate between ${new Date(
                service.startDate
              ).toLocaleDateString()} and ${new Date(
                service.endDate
              ).toLocaleDateString()}`}</div>
              {service?.averageRating !== 0 && (
                <>
                  <div className="d-flex flex-column gap-2">
                    <div className="h4">Average Rating</div>
                    <div>{<Rating rating={service.averageRating} />}</div>
                  </div>

                  <div className="d-flex flex-column gap-2 ">
                    <div className="h4"> Reviews</div>
                    <div className="d-flex flex-column gap-3">
                      {service?.reviews?.map((r) => (
                        <div className="d-flex flex-column gap-2">
                          <div className="fw-bold">{r?.user?.name}</div>
                          <div>{r?.reviews}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="d-flex flex-column gap-2">
                <div className="h4">Price</div>
                <div>{service.price} Rs</div>
              </div>
              {!auth?.token ? (
                <>
                  <button
                    className="btn text-light   "
                    style={{ background: "#1dbf73", width: "300px" }}
                    onClick={() =>
                      navigate("/login", { state: { service: service } })
                    }
                  >
                    Please Login
                  </button>
                </>
              ) : auth?.token && auth?.user?.role === "User" ? (
                <>
                  <button
                    className="btn text-light   "
                    style={{ background: "#1dbf73", width: "300px" }}
                    onClick={() =>
                      navigate("/payment", { state: { service: service } })
                    }
                  >
                    Book Now
                  </button>
                </>
              ) : (
                <button
                  className="btn text-light   "
                  style={{ background: "#1dbf73", width: "300px" }}
                  onClick={() =>
                    navigate("/register", { state: { service: service } })
                  }
                >
                  Register as explorer
                </button>
              )}
              <div className="d-flex flex-column gap-2">
                <div className="h4">About</div>
                <div>{service.description}SAR</div>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="h4">Terms & Conditions</div>
                <ul className="">
                  <li
                    className="text-color-search text-decoration-none py-2"
                    style={{ fontSize: 18 }}
                  >
                    You can use your tickets anytime at any day between 22
                    February 2024 and 3 March 2024
                  </li>
                  <li
                    className="text-color-search text-decoration-none py-2"
                    style={{ fontSize: 18 }}
                  >
                    Due to limited capacity, admission to experience is subject
                    to availability and on a first come first served basis.
                  </li>
                  <li
                    className="text-color-search text-decoration-none py-2"
                    style={{ fontSize: 18 }}
                  >
                    All sales are final. No refunds allowed.
                  </li>
                  <li
                    className="text-color-search text-decoration-none py-2"
                    style={{ fontSize: 18 }}
                  >
                    Tickets included in the bundle are "Regular" type.
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-5 ">
              <img
                className="rounded-4"
                style={{ width: "100%", height: "700px" }}
                src={service?.profilePic?.url}
                alt="Card image"
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SingleService;
