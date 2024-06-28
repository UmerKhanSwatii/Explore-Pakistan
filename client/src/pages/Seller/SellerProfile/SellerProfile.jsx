import React, { useEffect, useState } from "react";
import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";

import "./SellerProfile.css";
import axios from "axios";

import { useAuth } from "../../../context/auth";
import { Select } from "antd";
import { toast } from "react-toastify";
import Layout from "../../../components/Layout/Layout/Layout.jsx";

const SellerProfile = () => {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const [auth, setAuth] = useAuth();
  console.warn(auth);

  const [cities, setCities] = useState([]);

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

  //get user
  const getUser = async () => {
    try {
      const id = auth?.user?._id;
      setId(id);
      const res = await axios.get(
        `http://localhost:8080/api/v1/user/single-user/${id}`
      );
      console.warn(res);
      if (res?.data?.success) {
        setId(res?.data?.user?._id);
        setName(res?.data?.user.name);

        setEmail(res?.data?.user.email);

        setPhone(res?.data?.user.phone);
        setCity(res?.data?.user?.city);
      }
    } catch (error) {}
  };

  //handleUpdate
  const handleUpdate = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("file", image);
    userData.append("name", name);

    userData.append("phone", phone);
    userData.append("city", city);
    userData.append("email", email);
    try {
      const res = await axios.put(
        "http://localhost:8080/api/v1/user/update",
        userData
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        getUser();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getUser();
    getCities();
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid py-5 user-dashboard-background">
          <div className="row  justify-content-center align-items-center gap-3">
            <div className="col-3 ">
              <SellerMenu />
            </div>
            <div
              className=" col-8  border rounded-4 px-5 py-5  bg-light d-flex flex-column gap-5  "
              style={{ minHeight: "90vh" }}
            >
              <h4 style={{ color: "#3A6A3B" }} className="ps-3 w-100 ">
                Personal Information
              </h4>
              <div className="w-75 ">
                <div>
                  <input
                    className="form-control w-50 my-3"
                    type="file"
                    placeholder="Upload images"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="w-75  my-3">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control "
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-75 my-3">
                  <label className="form-label">Email </label>
                  <input
                    className="form-control "
                    disabled
                    type="email"
                    placeholder="Enter Email "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="w-75 my-3">
                  <label className="form-label">Contact Number</label>
                  <input
                    className="form-control "
                    type="Number"
                    placeholder="Enter Contact Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="w-75 d-flex flex-column gap-1 ">
                  <label className="form-label">City</label>
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
                </div>

                <div className="w-75  mt-4">
                  <button
                    type="submit"
                    className="btn text-light w-100"
                    style={{ background: "#1dbf73" }}
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SellerProfile;
