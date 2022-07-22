import React, { useEffect, useState, useContext } from "react";
import { obtenerActividades } from "../api.js";
import { Card } from "../component/card.jsx";
import { Context } from "../store/appContext.js";

export const Actividades = () => {
  const {store,actions} = useContext(Context)
  const [actividadesCards, setActividadesCards] = useState([]);
  
  useEffect(() => {
    obtenerActividades().then((data) => {
      const actividades = data.data;
      actions.agregarActividades(actividades)
      let cardsActividades = actividades.map((actividad) => {
        return (
          <Card
            name={actividad.nombre}
            src={actividad.imagen}
            text={actividad.descripcion}
            tipo={actividad.tipo_de_actividad}
            button=" Crear Evento "
            route={"crearevento/" + actividad.id}
          />
        );
      });
      
      setActividadesCards(cardsActividades);
    });
  }, []);
  return (
    <div>
      <div className="container">
        <div className="text-center">
          <h1 className="my-3">Actividades</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
          {actividadesCards}
        </div>
      </div>
    </div>
  );
};
