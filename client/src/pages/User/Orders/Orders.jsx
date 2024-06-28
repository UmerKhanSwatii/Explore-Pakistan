import React, { useEffect, useState } from "react";

import { useAuth } from "../../../context/auth";
import Layout from "../../../components/Layout/Layout/Layout";
import UserMenu from "../../../components/Layout/UserMenu/UserMenu";
import axios from "axios";

const Tickets = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  //get orders
  const getOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/user/get-orders/${auth?.user?._id}`
      );
      if (res?.data?.success) {
        setOrders(res.data.orders);
      } else {
        console.warn(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Layout>
      <div className="container-fluid py-5 user-dashboard-background">
        <div className="row  justify-content-center align-items-center gap-3">
          <div className="col-3 ">
            <UserMenu />
          </div>
          <div
            className="col-8 border rounded-4 px-5 py-5 bg-light"
            style={{ minHeight: "80vh" }}
          >
            <div className="h2 mb-5" style={{ color: "#3A6A3B" }}>
              Orders
            </div>
            {orders?.length === 0 ? (
              <div
                className="w-25 mx-auto text-center"
                style={{ color: "#3A6A3B" }}
              >
                "No orders found"
              </div>
            ) : (
              <table className="table table-striped table-hover w-100">
                <thead>
                  <tr>
                    <th>Reference Number</th>
                    <th>Service Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Price</th>
                    <th>Buyer</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((o) => (
                    <>
                      <tr key={o._id}>
                        <td>{o._id}</td>
                        <td>{o.service.name}</td>
                        <td>
                          {new Date(o.service.startDate).toLocaleDateString()}
                        </td>
                        <td>
                        {new Date(o.service.endDate).toLocaleDateString()}
                        </td>
                        <td>{o?.amount}</td>
                        <td>{o.buyer.name}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tickets;
