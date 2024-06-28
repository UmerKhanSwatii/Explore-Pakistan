import React from "react";
import Layout from "../../components/Layout/Layout/Layout";

const AboutSaudi = () => {
  return (
    <Layout>
      <div className="container my-5">
        <div className="row mt-5">
          <div className="col">
            <h2 all-headings-textColor>Discover Pakistan</h2>
            <p>
              Welcome to the fascinating land of Pakistan, a country rich in
              culture and breathtaking natural beauty. From ancient historical
              sites to modern marvels, Pakistan offers a diverse array of
              experiences for travelers.
            </p>
            <p>
              Explore the country's vibrant culture, indulge in traditional
              Pakistani hospitality, and embark on unforgettable adventures
              across its diverse landscapes.
            </p>
          </div>
        </div>
        <div className="row mt-5 text-center py-3">
          <div className="col">
            <div className="d-flex justify-content-center align-items-center gap-5">
              <img
                src="/images/pakistan1.jpg"
                alt="Culture and Heritage"
                className="img-fluid rounded-4 mt-5"
                style={{ width: "400px", height: "600px" }}
              />
              <img
                src="/images/pakistan2.jpg"
                alt="Natural Wonders"
                className="img-fluid rounded-4 mb-5"
                style={{ width: "400px", height: "600px" }}
              />
              <img
                src="/images/pakistan3.jpg"
                alt="Modern Marvels"
                className="img-fluid rounded-4 mt-5"
                style={{ width: "400px", height: "600px" }}
              />
            </div>
          </div>
        </div>
        <div className="row mt-5 pt-3">
          <div className="col">
            <h2 all-headings-textColor>Explore Cultural Heritage</h2>
            <p>
              Immerse yourself in the rich history and cultural heritage of
              Pakistan. Visit ancient archaeological sites such as Mohenjo-daro
              and Taxila, both UNESCO World Heritage Sites, and marvel at their
              impressive ruins and historical artifacts.
            </p>
            <p>
              Experience traditional Pakistani hospitality with a visit to a
              local family's home for a traditional meal. Engage with locals,
              learn about their customs, and savor the flavors of authentic
              Pakistani cuisine.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h2 all-headings-textColor>Discover Natural Wonders</h2>
            <p>
              Pakistan is blessed with breathtaking natural landscapes, from the
              stunning peaks of the Karakoram Range to the lush valleys of Swat
              and Hunza. Explore the crystal-clear waters of Lake Saif-ul-Malook
              and discover vibrant flora and fauna.
            </p>
            <p>
              Venture into the heart of the desert on an exhilarating safari and
              witness the mesmerizing beauty of the Thar Desert's sand dunes.
              Explore hidden valleys, ancient caravan routes, and encounter the
              nomadic tribes that call the desert home.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h2 all-headings-textColor>Experience Modern Marvels</h2>
            <p>
              Pakistan's modern cities are architectural marvels that blend
              innovation with tradition. Explore the towering skyscrapers of
              Karachi and the bustling developments of Islamabad, and witness
              the country's rapid technological advancement.
            </p>
            <p>
              Visit the iconic Pakistan Monument in Islamabad and immerse
              yourself in the history and culture showcased in the adjoining
              museum. Experience cultural events and educational programs that
              highlight the best of Pakistan's arts and heritage.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h2 all-headings-textColor>Plan Your Adventure</h2>
            <ul
              style={{ fontSize: "16px" }}
              className="d-flex flex-column gap-3"
            >
              <li>Discover ancient rock art in the Baltistan region</li>
              <li>Explore the historical Lahore Fort and Badshahi Mosque</li>
              <li>Experience the vibrant culture of Lahore and Karachi</li>
              <li>Indulge in traditional Pakistani cuisine and hospitality</li>
              <li>Visit the UNESCO World Heritage Site of Rohtas Fort</li>
              <li>Embark on a journey to the serene valleys of Hunza</li>
              <li>Explore the bustling bazaars of Peshawar</li>
              <li>Discover the natural beauty of the Kaghan Valley</li>
              <li>Experience the adrenaline rush of mountain trekking</li>
              <li>
                Relax and rejuvenate in luxury resorts in Murree and Nathia Gali
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutSaudi;
