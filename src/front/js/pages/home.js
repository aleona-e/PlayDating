import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Card } from "../component/card.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container">
        <div className="text-center mt-5">
          <h1>HOLA MUNDO</h1>
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="1000">
                <img
                  id="imgCarrusel"
                  src="https://www.etapainfantil.com/wp-content/uploads/2021/02/cuentacuentos.jpg"
                  className="d-block w-100"
                  alt="..."
                ></img>
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  id="imgCarrusel"
                  src="https://www.etapainfantil.com/wp-content/uploads/2021/02/cuentacuentos.jpg"
                  className="d-block w-100"
                  alt="..."
                ></img>
              </div>
              <div className="carousel-item">
                <img
                  id="imgCarrusel"
                  src="https://www.etapainfantil.com/wp-content/uploads/2021/02/cuentacuentos.jpg"
                  className="d-block w-100"
                  alt="..."
                ></img>
              </div>
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
