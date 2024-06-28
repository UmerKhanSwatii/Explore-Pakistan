import React, { useEffect, useState } from "react";

import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";
import CategoryForm from "../../../components/Form/CategoryForm/CategoryForm";
import { Modal } from "antd";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [visible, setVisible] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updateImage, setUpdateImage] = useState("");
  const [selected, setSelected] = useState(null);

  //handle form
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const categoryData = new FormData();
      categoryData.append("name", name);
      categoryData.append("file", image);
      const res = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        categoryData
      );
      if (res?.data?.success) {
        toast.success(`${res?.data?.category?.name} is created`);
        getAllCategoryFunction();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //handle delete
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${id}`
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        getAllCategoryFunction();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const categoryData = new FormData();
      categoryData.append("name", updateName);
      categoryData.append("file", updateImage);
      const res = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected}`,
        categoryData
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);

        setUpdateName("");
        setSelected(null);

        setVisible(false);
        getAllCategoryFunction();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
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
  useEffect(() => {
    getAllCategoryFunction();
  }, []);
  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-8 border rounded-4 px-5 py-5">
            <div className="h2 mb-3" style={{ color: "#3A6A3B" }}>
              Manage categories
            </div>
            <div className="mt-4 mb-3">
              <form onSubmit={handleForm} className="w-50">
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category"
                />
                <div>
                  <input
                    className="form-control w-50 my-3"
                    type="file"
                    placeholder="Upload images"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <button
                  className="btn text-light mt-2"
                  style={{ background: "#1dbf73" }}
                >
                  Submit
                </button>
              </form>
            </div>
            <table className="table table-striped table-hover w-75">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <>
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setVisible(true);
                            setSelected(c._id);
                            setUpdateName(c.name);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-3"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            visible={visible}
            footer={null}
            onCancel={() => setVisible(false)}
          >
            <CategoryForm
              handleSubmit={handleUpdate}
              value={{ name: updateName, image: updateImage }}
              setName={setUpdateName}
              setImage={setUpdateImage}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
