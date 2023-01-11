import React, { useEffect, useState, useContext } from "react";
import { obtenerActividades } from "../api.js";
import { Card } from "../component/card.jsx";
import { Context } from "../store/appContext.js";
import { Navbar } from "../component/navbar.jsx";
import "../../styles/home.css";
import "../../styles/index.css";

export const Actividades = () => {
  const { store, actions } = useContext(Context);
  const [actividadesCards, setActividadesCards] = useState([]);

  useEffect(() => {
    obtenerActividades().then((data) => {
      const actividades = data.data;
      actions.agregarActividades(actividades);
      let cardsActividades = actividades.map((actividad, index) => {
        return (
          <div key={index}>
            <Card
              homeCard={false}
              forzarHeight={true}
              name={actividad.nombre}
              src={actividad.imagen}
              tipo={actividad.tipo_de_actividad}
              button=" Crear Evento "
              route={"crearevento/" + actividad.id}
            />
          </div>
        );
      });
      setActividadesCards(cardsActividades);
    });
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="text-center py-4">
          <h3 className="my-3" id="titulosPaginas">
            Crea Eventos Con Las Actividades Favoritas De Tus Hijos
          </h3>
        </div>
        <div className="card-group mb-5">
          <div className="row row-cols-1 row-cols-sm-3 g-4">
            {actividadesCards}
          </div>
        </div>
      </div>
    </div>
  );
};
