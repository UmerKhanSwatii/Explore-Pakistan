import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const CatgeoryBaseService = () => {
  const { name } = useParams();
  console.warn(name);
  const [services, setServices] = useState([]);

  const CatgeoryBaseService = async () => {
    try {
      console.warn(name);
      const res = await axios.get(
        `http://localhost:8080/api/v1/service/service-type/${name}`
      );

      if (res?.data?.success) {
        setServices(res.data.services);
      } else {
        console.warn(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    CatgeoryBaseService();
  }, []);
  return (
    <Layout>
      <div className="container py-5">
        {!services || services.length === 0 ? (
          <>
            <h4 className=" text-center">No Service found</h4>
          </>
        ) : (
          <>
            <h4 className="text-center">{services.length} service found</h4>
            <div className="d-flex flex-row flex-wrap  mt-5 gap-5  justify-content-center">
              {services?.map((service) => (
                <Link to={`/single-service/${service.slug}`}>
                  <div key={service._id} className="main my-2 mx-2   ">
                    <img
                      src={service?.profilePic.url}
                      alt={service.image}
                      className="rounded-4"
                      style={{ width: "360px", height: "360px" }}
                    />
                    <div className="body">
                      <h4 className=" h3 text-light">{service.name}</h4>
                      <p className="text-light">
                        {new Date(service.startDate).toLocaleDateString()}
                      </p>
                      <div className="text-light h5">{service.price}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CatgeoryBaseService;
