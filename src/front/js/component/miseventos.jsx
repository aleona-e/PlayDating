import React, { useEffect, useState, useContext } from "react";
import { Card } from "./card.jsx";
import { useNavigate } from "react-router-dom";
import { config } from "../component/config.js";
import { CardEvento } from "../component/cardEvento.jsx";

import { HOSTNAME } from "../component/config";

export const MisEventos = () => {
    // const [datos, obtenerDatos] = useState([]);
    // const navigate = useNavigate()

    // useEffect(() => {
    //     const token = localStorage.getItem(config.jwt.nameToken);
    //     if (!token) {
    //       navigate("/login");
    //     }
    
    //     fetch(HOSTNAME + "/eventoscreados/usuario", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    
    //     })
    //       .then((res) => {
    //         return res.json();
    //       })
    //       .then((data) => {
    //         // setLoading(true)
    
    //         console.log("soy la data", data.data);
    //         obtenerDatos(data.data)
    //         // localStorage.setItem("token", data.token)
    //         // data.user_id
    //         // navegar para /user/id
    
    //       })
    //       .catch((e) => {
    //         console.error(e);
    //         navigate(`/zonaprivada`);
    
    //       });
    
    //   }, []);

    const [actividades, setActividades] = useState([]);
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
          setActividades(json.data);
        };
  
        fetchData().catch((error) => {
          console.log(error);
        });
      }
    }, []);
    
    return (
        <>
        {/* <h1>Mis eventos</h1> */}
            {/* <div className="row row-cols-1 row-cols-md-2 g-4 mt-1">
                <Card
                    name="Evento Cuentos"
                    src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="+ Información"
                    route={"card"}
                />
                <Card
                    name="Evento Baloncesto"
                    src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="+ Información"
                />
                <Card
                    name="Evento Parque"
                    src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="+ Información"
                />
                <Card
                    name="Evento futbol"
                    src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="+ Información"
                />
            </div> */}

<div className="container">
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
      </div>
        </>
    );
};