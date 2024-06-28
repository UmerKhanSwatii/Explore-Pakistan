import React, { useEffect, useState } from "react";

import axios from "axios";
import { Select } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";
const { Option } = Select;
const UpdateService = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescritpion] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [category, setCategory] = useState("");

  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    console.warn(id);
  }, [id]);
  //get all category function
  const getAllCategoryFunction = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/category"
      );
      console.warn(res.data);
      if (res.data.success) {
        setCategories(res?.data?.categories);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //GET SINGLE PRODUCT
  const getSingleService = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/service/get-service/${params.slug}`
      );
      if (data?.success) {
        setName(data?.service?.name);
        setId(data?.service?._id);
        setCity(data?.service?.city);
        setStartDate(data?.service?.startDate);
        setEndDate(data?.service?.endDate);
        setPrice(data?.service?.price);
        setImage(data?.service?.profilePic);

        setCategory(data?.service?.category);
        setDescritpion(data?.service?.description);
      } else {
        alert(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //create attraction fucntion
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.warn(id);
      const serviceData = new FormData();
      serviceData.append("file", image);

      serviceData.append("name", name);
      serviceData.append("startDate", startDate);
      serviceData.append("endDate", endDate);
      serviceData.append("category", category);
      serviceData.append("price", price);
      serviceData.append("city", city);
      serviceData.append("description", description);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/service/update-service/${id}`,

        serviceData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/seller/services");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //handle Delete
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/service/delete-service/${id}`
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/dashboard/seller/services");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getAllCategoryFunction();
    getSingleService();
  }, []);
  return (
    <>
      <div className="container-fluid py-5">
        <div className="row ">
          <div className="col-3">
            <SellerMenu />
          </div>
          <div className="col-8 border rounded-4 px-5 py-5">
            <div className="h2 mb-3" style={{ color: "#3A6A3B" }}>
              Update Service
            </div>
            <div className="">
              <Select
                className="w-50 "
                placeholder="Select Category"
                value={category}
                size="large"
                showSearch
                onChange={(value) => setCategory(value)}
              >
                {categories.map((c) => {
                  return (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div>
              <input
                className="form-control w-50 my-3"
                type="file"
                placeholder="Upload images"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="my-3">
              <div>
                <input
                  className="form-control w-50 my-3"
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  className="form-control w-50 my-3"
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <DatePicker
                  className="form-control my-3" // Apply custom class
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  scrollableYearDropdown
                  scrollableMonthYearDropdown
                  isClearable
                  placeholderText="Enter a start date" // Placeholder text
                />
              </div>
              <div>
                <DatePicker
                  className="form-control my-3" // Apply custom class
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={new Date()}
                  scrollableYearDropdown
                  scrollableMonthYearDropdown
                  isClearable
                  placeholderText="Enter a end date" // Placeholder text
                />
              </div>
              <div className="my-3">
                <input
                  className="form-control w-50 my-3 "
                  placeholder="Enter price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="my-3">
                <textarea
                  className="form-control w-50 my-3 "
                  style={{ height: "20vh" }}
                  placeholder="Enter description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescritpion(e.target.value)}
                />
              </div>

              <div className="my-3">
                <button className="btn btn-warning" onClick={handleUpdate}>
                  Update Service
                </button>
                <button className="btn btn-danger ms-2" onClick={handleDelete}>
                  Delete Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateService;
