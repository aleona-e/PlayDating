import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { obtenerActividades } from "../api.js";
import "../../styles/home.css";
import { Card } from "../component/card.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const [actividadesCards, setActividadesCards] = useState([]);
  useEffect(() => {
    obtenerActividades().then((data) => {
      const actividades = data.data;
      actions.agregarActividades(actividades);
      let cardsActividades = actividades.map((actividad) => {
        return (
          <Card
            name={actividad.nombre}
            src={actividad.imagen}
            text={actividad.descripcion}
            tipo={actividad.tipo_de_actividad}
            button=" Logeate y unete! "
            route={"login"}
          />
        );
      });
      // console.log("actividadID:", actividades[0])
      // console.log("actividadID:", actividades)
      setActividadesCards(cardsActividades);
    });
  }, []);

  return (
    <>
      <div className="container ">
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner mt-5">
            <div className="carousel-item active " data-bs-interval="3000">
              {actividadesCards[0]}
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              {actividadesCards[1]}
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              {actividadesCards[2]}
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              {actividadesCards[3]}
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              {actividadesCards[4]}
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              {actividadesCards[5]}
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              {actividadesCards[6]}
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              {actividadesCards[7]}
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              {actividadesCards[8]}
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
    </>
  );
};
