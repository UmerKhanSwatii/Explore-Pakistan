import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { useTheme } from "../../../context/ThemeContext";
const AdminMenu = () => {
  const [auth, setAuth] = useAuth();

  const [theme, setTheme] = useTheme();

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
    toast.success("Logout successfully");
    navigate("/login");
  };
  return (
    <>
      <div
        className="container-fluid    rounded-3 d-flex flex-column justify-content-center align-items-center py-4"
        style={{ minHeight: "80vh", backgroundColor: "#4E894F" }}
      >
        <div className="h2 fw-bold text-light">Admin Panel</div>
        <ul className="text-center list-unstyled ">
          <li className="py-3 ">
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/send-notification"
            >
              Send notifications
            </NavLink>
          </li>

          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/submitted-reports"
            >
              submitted reports
            </NavLink>
          </li>
          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/create-category"
            >
              Create Category
            </NavLink>
          </li>

          <li className="py-3 ">
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/user"
            >
              Users
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink className="text-white text-decoration-none" to="/See&Do">
              Safarify
            </NavLink>
          </li>
          <li className="py-3 d-flex flex-column gap-2  text-light">
            <div>{auth?.user?.email}</div>
            <div
              className="text-white text-decoration-none "
              onClick={handleLogout}
            >
              <span>Logout</span>
              <img
                src="/images/Logout.png"
                alt="pic not found"
                className="mx-2"
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
