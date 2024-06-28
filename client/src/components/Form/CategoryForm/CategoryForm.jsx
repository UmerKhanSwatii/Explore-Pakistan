import React from "react";

const CategoryForm = ({ handleSubmit, value, setName, setImage }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="w-100">
        <input
          className="form-control w-50"
          value={value.name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category"
        />

        <input
          className="form-control w-75 my-3"
          type="file"
          placeholder="Upload images"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          className="btn text-light mt-2"
          style={{ background: "#1dbf73" }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
