import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const UserMenu = () => {
  const [auth, setAuth] = useAuth();
  const [image, setImage] = useState("");

  return (
    <>
      <div
        className="container-fluid  rounded-4 bg-white justify-content-center d-flex  justify-content-center align-items-center "
        style={{ height: "90vh" }}
      >
        <ul className="text-center list-unstyled ">
          <div style={{ width: "50%", height: "50%", margin: "auto" }}>
            <img
              src={auth?.user?.profilePic.url}
              className=" my-3 rounded-circle  "
              alt="logo"
              style={{ width: "80%", height: "70%" }}
            />
          </div>
          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/user/profile"
            >
              Profile
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/user/orders"
            >
              Orders
            </NavLink>
          </li>
          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/user/notifications"
            >
              Notifications
            </NavLink>
          </li>
          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/user/reports"
            >
              Report a problem
            </NavLink>
          </li>

          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/user/history"
            >
              History
            </NavLink>
          </li>

          <li className="py-3 ">
            {" "}
            <NavLink className="text-dark text-decoration-none" to="/messages">
              Messsages
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
