import React, { useEffect, useState, useContext } from "react";
import { Card } from "./card.jsx";
import { useNavigate } from "react-router-dom";
import { config } from "../component/config.js";
import { CardEvento } from "../component/cardEvento.jsx";
import { Context } from "../store/appContext.js";
import { HOSTNAME } from "../component/config";
import { Navbar } from "../component/navbar.jsx";
export const MisEventos = () => {

{/* ------ FORMA1 -------------------------------- */}

  const { store, actions } = useContext(Context);
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
       // cambie este navigate, layout estaba con "p" no con "P" y me estaba dando problemas
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
        setEventos(json.data);
        setEventos(json1.data);
        actions.agregarEventos(json.data);
        actions.agregarEventos(json1.data);

      };

      fetchData().catch((error) => {
        console.log(error);
      });
    }
  }, []);





{/* ------ FORMA2 -------------------------------- */}
  // const [actividades, setActividades] = useState([]);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.token) {
  //      // cambie este navigate, layout estaba con "p" no con "P" y me estaba dando problemas
  //     navigate("/zonaprivada");
  //   } else {
  //     const fetchData = async () => {
  //       const response = await fetch(HOSTNAME + "/eventoscreados/usuario", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.token}`,
  //         },
  //       });
  //       const json = await response.json();
  //       setActividades(json.data);
  //     };

  //     fetchData().catch((error) => {
  //       console.log(error);
  //     });
  //   }
  // }, []);

  return (
    <>
    <Navbar/>
      {/* <h1>Mis eventos</h1> */}
{/* ------ FORMA1 -------------------------------- */}

<div className="container">
        <div className="text-center">
        <h1> Mis eventos</h1>
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
      {/* ------ FORMA2 -------------------------------- */}

      {/* <div className="container">
        <div className="text-center">
          <h1 className="my-3"> Mis eventos</h1>
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
      </div> */}
    </>
  );
};