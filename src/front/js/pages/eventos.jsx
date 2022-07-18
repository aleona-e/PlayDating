import React, { useState, useEffect } from "react";
import { CardEvento } from "../component/cardEvento.jsx";
import "../../styles/eventos.css";
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
    // const data = [
    //   {
    //     name: "jugar al futbol",
    //     src: "",
    //     text: "descripcion",
    //     tipo: "exterior",
    //     max_participantes: 8,
    //     min_participantes: 2,
    //     edadMaxima:9,
    //     edadMinima:1,
    //     fecha_y_hora: "5-agosto-2022",
    //   },
    //   {
    //     name: "nadar",
    //     src: "",
    //     text: "descripcion",
    //     tipo: "interior",
    //     max_participantes: 8,
    //     min_participantes: 2,
    //     edadMaxima:9,
    //     edadMinima:1,
    //     fecha_y_hora: "45-agosto-2022",
    //   },
    // ];
    // setActividades(data);
  }, []);

  return (
    <>
      <div className="container">
        <h1>Eventos</h1>
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-1">
          {actividades.map((a, index) => {
            return (
              <div key={index}>
                <CardEvento
                  name={a.actividad.nombre}
                  src={a.actividad.imagen}
                  text={a.actividad.descripcion}
                  tipo={a.actividad.tipo_de_actividad}
                  max_participantes={a.maximo_participantes}
                  min_participantes={a.minimo_participantes}
                  // edadMaxima={a.edadMaxima}
                  // edadMinima={a.edadMinima}
                  fecha_y_hora={a.fecha_y_hora}
      
                  button="Unirme"
                  route={"crearevento/"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
