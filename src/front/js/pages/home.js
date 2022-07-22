import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { Card } from "../component/card.jsx";
import { ImagenesCarrusel } from "../component/ImagenesCarrusel.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container">
        <div className="text-center mt-5">
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <ImagenesCarrusel/>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
