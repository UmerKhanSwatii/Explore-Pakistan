import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import "./SeeandDo.css";

import Carousel from "../../components/Carousel/Carousel";

import { useAuth } from "../../context/auth";
import Categories from "../Categories/Categories";
import { useTheme } from "../../context/ThemeContext";
import CityBaseServices from "../../components/CityBaseServices/CityBaseServices";
import RecentServices from "../../components/RecentServices/RecentServices";

const SeeandDo = () => {
  const [auth, setAuth] = useAuth();
  console.warn(auth?.token);

  const [theme, setTheme] = useTheme();
  //handle theme
  const handleTheme = () => {
    setTheme((prevState) => {
      const newTheme = prevState === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <Layout>
      {/* carousel */}
      <div className="theme-btn" onClick={handleTheme}>
        {theme === "light" ? (
          <img src="/images/moon.png" width={"30px"} />
        ) : (
          <img src="/images/sun.png" width={"30px"} />
        )}
      </div>

      <Carousel />

      {/* explore by categories */}
      <Categories />
      {/* riyadh services */}
      <CityBaseServices name={"Swat"} />
      {/* recent attractions */}
      <RecentServices />
    </Layout>
  );
};

export default SeeandDo;
