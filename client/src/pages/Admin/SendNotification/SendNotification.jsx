import React, { useEffect, useState } from "react";

import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";

import { toast } from "react-toastify";

const SendNotification = () => {
  const [users, setUsers] = useState([]);

  const [selectAllUsers, setSelectAllUsers] = useState(false);

  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/all-users"
      );
      console.warn(selectAllUsers);

      if (res?.data?.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleUserSelect = (userId) => {
    try {
      setSelectedUsers((prev) => {
        if (prev.includes(userId)) {
          return prev.filter((id) => id !== userId);
        } else {
          return [...prev, userId];
        }
      });
    } catch (error) {
      console.warn(error);
    }
  };

  //handleSelectAll
  const handleSelectAll = () => {
    try {
      setSelectAllUsers(!selectAllUsers);

      setSelectedUsers(selectAllUsers ? [] : users.map((u) => u._id));
    } catch (error) {
      console.warn(error);
    }
  };

  //sendNotification
  const sendNotification = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/admin/send-notification",
        {
          userIds: [...selectedUsers],
          description,
        }
      );

      if (data?.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-8 border rounded-4 px-5 py-5">
            <div className="h2 mb-3" style={{ color: "#3A6A3B" }}>
              Announcement
            </div>
            <div>
              <label className="form-label">
                Description <span className="text-danger"> *</span>
              </label>
              <textarea
                className="form-control"
                style={{ height: "200px" }}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-5 mb-3">
              <label className="form-check-label">Select All Users</label>
              <input
                type="checkbox"
                checked={selectAllUsers}
                onChange={() => handleSelectAll("User")}
                className="form-check-input ms-1"
              />
            </div>
            <table className="table table-striped table-hover w-100">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.role}</td>
                    <td>
                      <input
                        type="checkbox"
                        className="ms-3 form-check-input"
                        checked={selectedUsers.includes(u._id)}
                        onChange={() => handleUserSelect(u._id, "User")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-center mt-5">
              <button
                className="btn text-light px-5"
                style={{ background: "#1dbf73" }}
                onClick={sendNotification}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendNotification;
