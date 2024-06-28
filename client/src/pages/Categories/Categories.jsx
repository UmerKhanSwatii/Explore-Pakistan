import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  //get all category function
  const getAllCategoryFunction = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/category"
      );
      console.warn(res.data);
      if (res.data.success) {
        setCategories(res?.data?.categories);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getAllCategoryFunction();
  }, []);

  return (
    <div className="container my-5 pb-5">
      <h2 className="my-5 all-headings-textColor">Explore by categories</h2>
      <div className="d-flex flex-row flex-wrap gap-5 justify-content-center ">
        {categories?.map((c) => {
          return (
            <>
              <Link
                to={`/category/${c.name}`}
                className="text-decoration-none text-dark"
              >
                <div
                  key={c._id}
                  className="   d-flex flex-column gap-3 justify-content-center justify-content-center align-items-center "
                  style={{
                    height: "190px",
                    width: "275px",
                  }}
                >
                  <img
                    className="rounded-4"
                    style={{ width: "100%", height: "155px" }}
                    src={c?.profilePic?.url}
                    alt="pic not found"
                  />
                  <div
                    style={{ fontSize: "18px" }}
                    className="text-color-header"
                  >
                    {" "}
                    {c.name}
                  </div>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
