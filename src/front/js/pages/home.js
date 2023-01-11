import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { obtenerActividades } from "../api.js";
import { Card } from "../component/card.jsx";
import { Navbar } from "../component/navbar.jsx";
import { config } from "../component/config.js";
import "../../styles/home.css";

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
        console.log(actividad)

        return (
          <Card
            forzarHeight={false}
            homeCard={true}
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
      <div className="container">
        <div className="mx-auto">
        <div className="ms-5 ps-5 mt-4 pt-4 pb-2 mx-auto mb-5">
            <h1 className="descripcionAppHome"><span className="descripcionApp palabra-1">Crea </span><span className="descripcionApp palabra-2">Divertidas   </span><span className="descripcionApp palabra-3">Citas  </span><span className="descripcionApp palabra-4">de  </span><span className="descripcionApp palabra-5">Juego  </span><span className="descripcionApp palabra-6">Para  </span><span className="descripcionApp palabra-7">Niños</span><span className="descripcionApp palabra-8"> ! </span></h1>
          </div>
          <div className="carousel slide pb-5 mb-5" data-bs-ride="carousel">
            <div className="carousel-inner mt-4">
              <div className="carousel-item active " data-bs-interval="3000">
                
                  <div className="row row-cols-1 row-cols-sm-3">
                    {actividadesCards[0]}
                    {actividadesCards[1]}
                    {actividadesCards[2]}
                  </div>
                
              </div>

              <div className="carousel-item" data-bs-interval="3000">
                
                  <div className="row row-cols-1 row-cols-sm-3">
                    {actividadesCards[3]}
                    {actividadesCards[4]}
                    {actividadesCards[5]}
                  </div>
                
              </div>

              <div className="carousel-item" data-bs-interval="3000">
                
                  <div className="row row-cols-1 row-cols-sm-3">
                    {actividadesCards[6]}
                    {actividadesCards[7]}
                    {actividadesCards[8]}
                  </div>
                
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};
