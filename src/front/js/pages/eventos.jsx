import React, { useState, useEffect } from "react";
import { CardEvento } from "../component/cardEvento.jsx";

import { HOSTNAME } from "../component/config";
import { useNavigate } from "react-router-dom";

export const Eventos = () => {
  const [actividades, setActividades] = useState([]);
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
        setActividades(json.data);
      };

      fetchData().catch((error) => {
        console.log(error);
      });
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="text-center">
          <h1 className="my-3">Eventos</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
          {actividades.map((a, index) => {
            if (a.estado !== "Cancelado") {
              return (
                <div key={index}>
                  <CardEvento
                    evento_id={a.id}
                    creador={a.creador}
                    name={a.actividad.nombre}
                    src={a.actividad.imagen}
                    text={a.actividad.descripcion}
                    tipo={a.actividad.tipo_de_actividad}
                    max_participantes={a.maximo_participantes}
                    min_participantes={a.minimo_participantes}
                    estado={a.estado}
                    // edadMaxima={a.edadMaxima}
                    // edadMinima={a.edadMinima}
                    fecha_y_hora={a.fecha_y_hora}
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
