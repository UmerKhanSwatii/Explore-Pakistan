import React, { useEffect, useState } from "react";
import UserMenu from "../../../components/Layout/UserMenu/UserMenu";
import Layout from "../../../components/Layout/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import ServiceReviews from "../../../components/ServiceReviews/ServiceReviews";
import { Modal } from "antd";

const History = () => {
  const [purchased, setPurchased] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  //get purchased history
  const getPurchasedHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/user/get-purchased-history"
      );
      if (res?.data?.success) {
        setPurchased(res.data.purchasedServices);
        console.warn(purchased);
      } else {
        setPurchased([]);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getPurchasedHistory();
  }, []);
  return (
    <Layout>
      <div>
        <div className="container-fluid py-5 seller-dashboard-background">
          <div className="row gap-3 ">
            <div className="col-3">
              <UserMenu />
            </div>
            <div className="col-8 px-5  bg-white rounded-4 pb-3">
              <div className="h2 my-4" style={{ color: "#3A6A3B" }}>
                History
              </div>

              {purchased.length === 0 ? (
                <>
                  <h4 className="text-center my-5" style={{ color: "#3A6A3B" }}>
                    No purchased history
                  </h4>
                </>
              ) : (
                <>
                  <div className="d-flex flex-row flex-wrap gap-5">
                    {purchased?.map((p) => (
                      <>
                        <div className="card   " style={{ width: 280 }}>
                          <img
                            className="card-img-top w-100 "
                            style={{ height: "250px" }}
                            src={p?.service?.profilePic?.url}
                            alt="Card image"
                          />
                          <div className="card-body">
                            <p
                              className="card-title fw-bold"
                              style={{ fontSize: "17px" }}
                            >
                              {p.service?.name}
                            </p>
                            <p className="card-text">
                              {p.service?.description?.substring(0, 50)}...
                            </p>
                            <Link className="text-decoration-none">
                              <button
                                className="btn text-light px-5"
                                style={{ background: "#1dbf73" }}
                                onClick={() => setIsVisible(true)}
                              >
                                Add reviews
                              </button>
                            </Link>
                          </div>
                        </div>
                        <Modal
                          visible={isVisible}
                          onCancel={() => setIsVisible(false)}
                          footer={null}
                        >
                          <div>
                            <ServiceReviews serviceId={p.service?._id} />
                          </div>
                        </Modal>
                      </>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
