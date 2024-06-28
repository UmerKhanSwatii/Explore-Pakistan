import React from "react";
import Layout from "../../components/Layout/Layout/Layout";
import { useSearch } from "../../context/search";
import { Link } from "react-router-dom";

const Search = () => {
  const [value, setValue] = useSearch();
  return (
    <>
      <Layout>
        <div className="container-fluid my-5">
          <div className="text-center h2">{`Search for ${value.keyword}`}</div>
          <div className="text-center my-3">
            {value?.result?.length < 1
              ? "No Service found"
              : `${value?.result?.length} services found`}
          </div>
          <div className="container d-flex flex-wrap my-5 gap-4  justify-content-center">
            {value.result?.map((s) => {
              return (
                <div
                  className="card mx-3 mb-3 border-0"
                  key={s._id}
                  style={{ width: "350px" }}
                >
                  <img
                    className="card-img-top "
                    style={{ height: "280px" }}
                    src={s?.profilePic.url}
                    alt="Card image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{s.name}</h5>
                    <p className="card-text">
                      {s.description.substring(0, 100)}...
                    </p>
                    <Link to={`/single-service/${s.slug}`}>
                      <button
                        className="btn text-light w-100 "
                        style={{ background: "#1dbf73" }}
                      >
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Search;
