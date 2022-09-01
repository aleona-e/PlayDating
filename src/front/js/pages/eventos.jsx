import React, { useState, useEffect, useContext } from "react";
import { CardEvento } from "../component/cardEvento.jsx";
import { HOSTNAME } from "../component/config";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Navbar } from "../component/navbar.jsx";
import "../../styles/eventos.css";
import "../../styles/index.css";

export const Eventos = () => {
  const { actions } = useContext(Context);
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/");
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
      };

      fetchData().catch((error) => {
        console.log(error);
      });
    }
  }, []);

  const esEventoFuturo = (fecha) => {
    const tiempoTrans = Date.now();
    const fechaActual = new Date(tiempoTrans);
    const fechaEvento = new Date(fecha);
    return fechaActual < fechaEvento;
  };

  const sortedArray = (eventos) => {
    eventos.sort((a, b) => {
      const fechaEventoA = new Date(a.fecha_y_hora);
      const fechaEventoB = new Date(b.fecha_y_hora);
      if (fechaEventoA > fechaEventoB) {
        return 1;
      } else if (fechaEventoB > fechaEventoA) {
        return -1;
      } else {
        return 0;
      }
    });
    return eventos;
  };

  return (
    <>
      <Navbar />
      <div className="container pagina"       
      >
        <div className="text-center p-3 ">
          <h3 id="titulosPaginas">Participa En Los Eventos Creados En Tu Zona</h3>
        </div>
        {eventos.length === 0 && (
            <div className="mt-1">
              <h5>Aún no hay eventos en esta provincia</h5>
            </div>
          )}
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-1 mb-5">
          
          {sortedArray(eventos).map((evento, index) => {
            if (
              (evento.estado !== "Cancelado") &
              esEventoFuturo(evento.fecha_y_hora)
            ) {
              return (
                <div key={index}>
                  <CardEvento
                    forzarHeight={true}
                    evento_id={evento.id}
                    participantes={evento.participantes}
                    creador={evento.creador.id}
                    name={evento.actividad.nombre}
                    src={evento.actividad.imagen}
                    text={evento.actividad.descripcion}
                    tipo={evento.actividad.tipo_de_actividad}
                    cupos_disponibles={evento.cupos_disponibles}
                    max_participantes={evento.maximo_participantes}
                    estado={evento.estado}
                    fecha_y_hora={evento.fecha_y_hora}
                    route={"/detalleEvento/" + evento.id}
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
