import React, { useState, useEffect, useContext } from "react";
import { CardEvento } from "../component/cardEvento.jsx";

import { HOSTNAME } from "../component/config";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Eventos = () => {
  const { store, actions } = useContext(Context);
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/zonaPrivada");
    } else {
      const fetchData = async () => {
        const response = await fetch(HOSTNAME + "/eventos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        const json = await response.json();
        setEventos(json.data);
        actions.agregarEventos(json.data);
      };

      fetchData().catch((error) => {
        console.log(error);
      });
    }
  }, []);

  return (
    <>
      <div className="container">
        <h1>Eventos</h1>
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-1">
          {eventos.map((evento, index) => {
            if (a.estado !== "Cancelado") {
              return (
                <div key={index}>
                  <CardEvento
                    name={evento.actividad.nombre}
                    src={evento.actividad.imagen}
                    text={evento.actividad.descripcion}
                    tipo={evento.actividad.tipo_de_actividad}
                    max_participantes={evento.maximo_participantes}
                    min_participantes={evento.minimo_participantes}
                    // edadMaxima={evento.edadMaxima}
                    // edadMinima={evento.edadMinima}
                    fecha_y_hora={evento.fecha_y_hora}

                    //button="Unirme"
                    //route={"unirseEvento/" + evento.id}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
