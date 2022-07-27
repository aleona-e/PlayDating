import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../component/config.js";
import { CardEvento } from "../component/cardEvento.jsx";
import { Context } from "../store/appContext.js";
import { HOSTNAME } from "../component/config";
import { Navbar } from "../component/navbar.jsx";
export const MisEventos = () => {
  const { store, actions } = useContext(Context);
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/zonaprivada");
    } else {
      const fetchData = async () => {
        const response = await fetch(HOSTNAME + "/eventoscreados/usuario", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        const response1 = await fetch(HOSTNAME + "/eventos/usuario", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        const json = await response.json();
        const json1 = await response1.json();
        const eventos = json.data.concat(json1.data);
        setEventos(eventos);
        actions.agregarEventos(eventos);
      };
      fetchData().catch((error) => {
        console.log(error);
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="text-center">
          <h1> MIS EVENTOS</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
          {eventos.map((evento, index) => {
            return (
              <div key={index}>
                <CardEvento
                  evento_id={evento.id}
                  creador={evento.creador.id}
                  participantes={evento.participantes}
                  name={evento.actividad.nombre}
                  src={evento.actividad.imagen}
                  text={evento.actividad.descripcion}
                  tipo={evento.actividad.tipo_de_actividad}
                  cupos_disponibles={evento.cupos_disponibles}
                  max_participantes={evento.maximo_participantes}
                  estado={evento.estado}
                  fecha_y_hora={evento.fecha_y_hora}
                  route={"/unirseEvento/" + evento.id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
