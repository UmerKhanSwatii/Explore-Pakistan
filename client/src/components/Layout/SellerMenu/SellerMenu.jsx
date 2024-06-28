import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import { useTheme } from "../../../context/ThemeContext";

const SellerMenu = () => {
  const [auth, setAuth] = useAuth();
  const [theme, setTheme] = useTheme();

  const [seller, setSeller] = useState();
  const [id, setId] = useState(auth?.user?._id);
  const navigate = useNavigate();
  const [image, setImage] = useState("");

  const getImage = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/v1/user/get-photo/${auth?.user?._id}`
    );
    if (res) {
      setImage(res?.data);
    }
  };
  useEffect(() => {
    getImage();
    console.warn(image);
  }, [image]);

  //handle logout function
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    console.warn(theme);
    setTheme((prevState) => {
      const newTheme = prevState === "dark" ? "light" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
    console.warn(theme);
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    navigate("/login");
  };

  const getSingleSeller = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/user/single-user/${id}`
      );
      if (res?.data?.success) {
        setSeller(res.data.user);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getSingleSeller();
  }, []);
  return (
    <>
      <div
        className="container-fluid   py-5    rounded-3 d-flex justify-content-center align-items-center   "
        style={{ minHeight: "80vh", backgroundColor: "#4E894F" }}
      >
        <ul className="text-center list-unstyled text-light ">
          <div style={{ width: "50%", height: "50%", margin: "auto" }}>
            <img
              src={seller?.profilePic?.url}
              alt="logo"
              className="rounded-circle"
              style={{ width: "80%", height: "70%" }}
            />
          </div>
          <li className="py-2">{seller?.name}</li>

          <li className="py-3 ">
            <NavLink
              className="text-light text-decoration-none"
              to="/dashboard/seller/profile"
            >
              Profile
            </NavLink>
          </li>

          <li className="py-3 ">
            <NavLink
              className="text-light text-decoration-none"
              to="/dashboard/seller/explorer-requests"
            >
              Booking requests
            </NavLink>
          </li>

          <li className="py-3 ">
            {" "}
            <NavLink className="text-light text-decoration-none" to="/messages">
              Messsages
            </NavLink>
          </li>

          <li className="py-3 ">
            <NavLink
              className="text-light text-decoration-none"
              to="/dashboard/seller/reports"
            >
              Report a problem
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-light text-decoration-none"
              to="/dashboard/seller/add-service"
            >
              Add Service
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink className="text-white text-decoration-none" to="/See&Do">
              Safarify
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-light text-decoration-none"
              to="/dashboard/seller/services"
            >
              Services
            </NavLink>
          </li>
          <li className="py-3 d-flex flex-column gap-2  text-light">
            <div>{auth?.user?.email}</div>
            <div className="text-light " onClick={handleLogout}>
              <span>Logout</span>
              <img
                src="/images/Logout.png"
                alt="pic not found"
                className="mx-2"
                style={{
                  width: "17px",
                  height: "17px",
                }}
              />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SellerMenu;
