import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { obtenerActividades } from "../api.js";
import "../../styles/home.css";
import { Card } from "../component/card.jsx";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar.jsx";

import { config } from "../component/config.js";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [actividadesCards, setActividadesCards] = useState([]);
  const [ocultarConToken, setOcultarConToken] = useState("ocultarConToken");
  const [ocultarSinToken, setOcultarSinToken] = useState("ocultarSinToken");

  useEffect(() => {

    const token = localStorage.getItem(config.jwt.nameToken);
    if (!token) {
      setOcultarSinToken("ocultarSinToken");
      setOcultarConToken("")
    }

    else {
      setOcultarSinToken("");
    }

    obtenerActividades().then((data) => {
      const actividades = data.data;
      actions.agregarActividades(actividades);
      let cardsActividades = actividades.map((actividad, index) => {
        return (
          <Card
            forzarHeight={false}
            name={actividad.nombre}
            src={actividad.imagen}
            
          />
        );
      });
  
      setActividadesCards(cardsActividades);
    });
  }, []);

  return (
    <>

      <Navbar />
      <div className="container ">
        <div className="my-5">
          <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner mt-5">
              <div className="carousel-item active " data-bs-interval="3000">
                <div className="card-group">
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {actividadesCards[0]}
                    {actividadesCards[1]}
                    {actividadesCards[2]}
                  </div>
                </div>
              </div>

              <div className="carousel-item" data-bs-interval="3000">
                <div className="card-group">
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {actividadesCards[3]}
                    {actividadesCards[4]}
                    {actividadesCards[5]}
                  </div>
                </div>
              </div>

              <div className="carousel-item" data-bs-interval="3000">
                <div className="card-group">
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {actividadesCards[6]}
                    {actividadesCards[7]}
                    {actividadesCards[8]}
                  </div>
                </div>
              </div>
            </div>
            <div className="my-5 pb-3 mx-auto">
              <h1 className="descripcionAppHome"><span className="descripcionApp palabra-1">Crea Divertidas </span><span className="descripcionApp palabra-2">Citas de   </span><span className="descripcionApp palabra-3">Juego para  </span><span className="descripcionApp palabra-4">tus hijos!</span></h1>
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
      {/* ----- BOTONES --------
      <div className="text-center mb-5">
        <Link to="/login">
          <div className="grid gap-2 col-6 mx-auto">
            <button id="buttonCardHome" className={"btn btn-lg "  + ocultarConToken}>
              Entra para ver más!
            </button>
          </div>
        </Link>
      </div>
      <div className="text-center mb-5">
        <Link to="/actividades">
          <div className="grid gap-2 col-6 mx-auto">
            <button id="buttonCardHome" className={"btn btn-lg "  + ocultarSinToken}>
              Crear evento
            </button>
          </div>
        </Link>
  </div>*/}
    </>
  );
};
