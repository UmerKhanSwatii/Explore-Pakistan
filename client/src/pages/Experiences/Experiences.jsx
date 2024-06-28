import React from "react";
import Layout from "../../components/Layout/Layout/Layout";

import CityBaseServices from "../../components/CityBaseServices/CityBaseServices";

const Experiences = () => {
  return (
    <Layout>
      {/* Swat services */}
      <CityBaseServices name={"Swat"} />

      {/* Mansehra services */}
      <CityBaseServices name={"Mansehra"} />
      {/* Hunza services */}
      <CityBaseServices name={"Hunza"} />
      {/* Kalam services */}
      <CityBaseServices name={"Kalam"} />
    </Layout>
  );
};

export default Experiences;
