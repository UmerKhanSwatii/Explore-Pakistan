import React, { useEffect, useState } from "react";

import axios from "axios";

import { Select } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";

const { Option } = Select;
const AddService = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  const [description, setDescritpion] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const [price, setPrice] = useState("");
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
  useEffect(() => {
    getCities();
  }, []);

  //create attraction fucntion
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const serviceData = new FormData();
      serviceData.append("file", image);
      serviceData.append("name", name);
      serviceData.append("startDate", startDate);
      serviceData.append("endDate", endDate);
      serviceData.append("category", category);
      serviceData.append("price", price);
      serviceData.append("city", city);
      serviceData.append("description", description);

      const res = await axios.post(
        "http://localhost:8080/api/v1/service/create-service",
        serviceData
      );
      console.warn(res);
      if (res?.data?.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/category"
      );
      if (res?.data?.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <>
      <>
        <div className="container-fluid py-5">
          <div className="row ">
            <div className="col-3">
              <SellerMenu />
            </div>
            <div className="col-8 border rounded-4 px-5 py-5">
              <div className="h2 mb-3" style={{ color: "#3A6A3B" }}>
                Create Service
              </div>

              <div className="my-5">
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
                    type="file"
                    placeholder="Upload images"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div>
                  <Select
                    style={{ width: "456px" }}
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
                <div className="">
                  <Select
                    className="w-50"
                    placeholder="Select category"
                    size="large"
                    showSearch
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => {
                      return (
                        <Option key={c._id} value={c.name}>
                          {c.name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>

                <div className="my-3">
                  <button
                    className="btn text-light mt-2"
                    style={{ background: "#1dbf73" }}
                    onClick={handleCreate}
                  >
                    Create Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default AddService;
