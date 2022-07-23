import React, { useState, useEffect, useContext } from "react";
import { CardEvento } from "../component/cardEvento.jsx";

import { HOSTNAME } from "../component/config";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Navbar } from "../component/navbar.jsx";
export const Eventos = () => {
  const { store, actions } = useContext(Context);
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
       // cambie este navigate, layout estaba con "p" no con "P" y me estaba dando problemas
      navigate("/zonaprivada");
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
    <Navbar/>
      <div className="container">
        <div className="text-center">
        <h1>Eventos</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
          {eventos.map((evento, index) => {
            if (evento.estado !== "Cancelado") {
              return (
                <div key={index}>
                  <CardEvento
                    evento_id={evento.id}
                    creador={evento.creador.id}
                    name={evento.actividad.nombre}
                    src={evento.actividad.imagen}
                    text={evento.actividad.descripcion}
                    tipo={evento.actividad.tipo_de_actividad}
                    cupos_disponibles={evento.cupos_disponibles}
                    max_participantes= {evento.maximo_participantes}
                    estado={evento.estado}
                    // edadMaxima={evento.edadMaxima}
                    // edadMinima={evento.edadMinima}
                    fecha_y_hora={evento.fecha_y_hora}
                    route={"/unirseEvento/" + evento.id}
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
