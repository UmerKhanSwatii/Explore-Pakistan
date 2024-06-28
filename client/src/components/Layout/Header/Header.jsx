import React from "react";
import { useAuth } from "../../../context/auth";

import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import SearchInput from "../../SearchInput/SearchInput";
import { useTheme } from "../../../context/ThemeContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [theme, setTheme] = useTheme();
  console.warn(auth);
  const [image, setImage] = useState("");

  const getImage = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/v1/user/get-photo/${auth?.user?._id}`
    );
    if (res) {
      setImage(res?.data);
      console.warn("hello");
    }
  };
  useEffect(() => {
    getImage();
  }, []);
  const navigate = useNavigate();

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
    navigate("/login");
  };

  // //handle theme
  const handleTheme = () => {
    setTheme((prevState) => {
      const newTheme = prevState === "dark" ? "light" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <>
      <div className="container-fluid   ">
        <div className="row  ">
          <div
            className="col-12  d-flex flex-row justify-content-between  mx-auto py-3   "
            style={{ width: "85%" }}
          >
            <div className="d-flex   gap-2   h-100">
              <Link to="/See&Do">
                <img
                  src="/images/logo.png "
                  className="  h-100  "
                  style={{ width: "100px" }}
                />
              </Link>
              <ul
                className=" list-unstyled d-flex gap-5  h-100  align-items-center ms-3"
                style={{ fontSize: "16px", fontWeight: 500 }}
              >
                <NavLink
                  to="/See&Do"
                  className="text-decoration-none text-color-header"
                >
                  <li>Explore</li>
                </NavLink>

                <NavLink
                  to="/travel-essentials"
                  className="text-decoration-none text-color-header"
                >
                  <li>Travel essential</li>
                </NavLink>
                <NavLink
                  to="/safarify-calendar"
                  className="text-decoration-none text-color-header"
                >
                  <li>Safarify Calendar</li>
                </NavLink>

                <NavLink
                  to="/experiences"
                  className="text-decoration-none text-color-header"
                >
                  <li>Experiences</li>
                </NavLink>

                <NavLink
                  to="/services"
                  className="text-decoration-none text-color-header"
                >
                  <li>Services</li>
                </NavLink>
              </ul>
            </div>
            <div className=" d-flex align-items-center ">
              {!auth?.user ? (
                <>
                  <div>
                    <Link to="/login">
                      <button
                        className="btn text-light ms-1"
                        style={{ background: "#1dbf73" }}
                      >
                        Sign In
                      </button>
                    </Link>
                    <Link to="/register">
                      <button
                        className="btn text-light ms-1"
                        style={{ background: "#1dbf73" }}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div class="dropdown">
                    <img
                      className="dropdown-toggle rounded-circle border"
                      data-bs-toggle="dropdown"
                      style={{ width: "30px", height: "30px" }}
                      src={auth?.user?.profilePic?.url}
                    />

                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          {auth?.user?.name}
                        </a>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item bg-transparent text-dark"
                          to={`/dashboard/${
                            auth?.user?.role === "Admin"
                              ? "admin/user"
                              : auth?.user?.role === "Seller"
                              ? "seller/profile"
                              : "user/profile"
                          }`}
                          onClick={handleTheme}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li onClick={handleLogout}>
                        <NavLink className="dropdown-item bg-transparent text-dark">
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-12 w-75  mx-auto  d-flex flex-column justify-content-center align-items-center gap-2   py-5 ">
            <div className="h4 text-color-search">
              Book the Best, Secure Services with Safarify
            </div>
            <div
              style={{
                width: "400px",
              }}
            >
              <SearchInput />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
