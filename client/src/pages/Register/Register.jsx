import React, { useEffect, useMemo, useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Select } from "antd";
import countryList from "react-select-country-list";
const Register = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //get cities
  const getCities = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/cities/get");
      console.warn(res);
      if (res?.data?.success) {
        setCities(res?.data?.cities);
        console.warn(cities);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // form submit function

  const handleSubmitExplorer = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          name,
          email,
          password,
          city,
          phone,
          role,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res?.data?.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getCities();
  }, []);
  return (
    <>
      <div className="container-fluid  " style={{ height: "115vh" }}>
        <div className="row">
          <div className="col-6 w-50 sign_up__image"></div>
          <div
            className="col-6 d-flex justify-content-center align-items-center"
            style={{ height: "115vh" }}
          >
            <div className="d-flex flex-column w-50 gap-3">
              <h2 className="text-center" style={{ color: "#3A6A3B" }}>
                Register
              </h2>
              <form
                onSubmit={handleSubmitExplorer}
                className="d-flex flex-column  mt-3 gap-1"
              >
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control my-1"
                  type="text"
                  placeholder="eg.John"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />

                <label className="form-label">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control my-1"
                  type="email"
                  placeholder="eg.abc@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <label className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control my-1"
                  type="password"
                  placeholder="eg.Choose your own password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <label className="form-label">
                  Contact Number <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control my-1"
                  type="Number"
                  placeholder="eg.0322-9913853"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <label className="form-label">
                  Your favourite game <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control my-1"
                  type="text"
                  placeholder="eg.hockey"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                />
                <label className="form-label">
                  Role <span className="text-danger">*</span>
                </label>
                <Select
                  className="my-2"
                  placeholder="Select Role"
                  size="large"
                  showSearch
                  onChange={(value) => setRole(value)}
                >
                  <Select.Option value="Seller">Seller</Select.Option>
                  <Select.Option value="User">User</Select.Option>
                </Select>
                <label className="form-label">
                  City <span className="text-danger">*</span>
                </label>
                <Select
                  placeholder="Select a city"
                  size="large"
                  showSearch
                  onChange={(value) => setCity(value)}
                >
                  {cities?.map((c) => {
                    return (
                      <Option key={c._id} value={c._id}>
                        {c.cityName}
                      </Option>
                    );
                  })}
                </Select>

                <button
                  className="btn text-light mt-4"
                  style={{ background: "#1dbf73" }}
                >
                  Sign up
                </button>
              </form>

              <Link
                to="/login"
                className="text-primary mx-auto mt-2 text-decoration-none"
              >
                or Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
