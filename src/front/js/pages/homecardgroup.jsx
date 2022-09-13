import React, { useEffect, useState } from "react";
import { Card } from "../component/card.jsx";
import { Navbar } from "../component/navbar.jsx";
import { config } from "../component/config.js";
import { useNavigate } from "react-router-dom";
import { obtenerDatosPerfil } from "../api.js";

import "../../styles/index.css";

export const HomeCardGroup = () => {
  const navigate = useNavigate();
  const [datosUsuario, setDatosUsuario] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem(config.jwt.nameToken);
    if (!token) {
      navigate("/");
    } else {
      obtenerDatosPerfil()
        .then((data) => {
          setDatosUsuario(data.data);
          console.log(data);
        })
        .catch((error) => {
          const errorStr = JSON.stringify(error);
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        {datosUsuario.nombre && (
          <div className="mt-2 pt-2 mb-1">
            <h3 id="bienvenida">¡Bienvenid@ {datosUsuario.nombre}!</h3>
          </div>
        )}
        <div className="pb-4 mb-4">
          <div className="card-group">
            <Card
            homeCard={true}
            home={true}
              src="https://res.cloudinary.com/daint2d1l/image/upload/v1662377335/Home/1_heqf6d.png"
              text={"Crea Eventos Con Las Actividades Favoritas De Tus Hijos."}
              name="Actividades"
              route={"actividades"}
              button="Ir"
            />

            <Card
            homeCard={true}
            home={true}
              src="https://res.cloudinary.com/daint2d1l/image/upload/v1662377339/Home/2_ch0p1u.png"
              text={"Únete Y Participa En Los Eventos Creados En Tu Provincia."}
              name="Eventos"
              route={"eventos"}
              button="Ir"
            />

            <Card
            homeCard={true}
            home={true}
              src="https://res.cloudinary.com/daint2d1l/image/upload/v1662377344/Home/3_hd34cg.png"
              text={
                "Accede, Maneja Y Obten Todos Los Detalles De Tus Eventos, Futuros Y Pasados"
              }
              name="Mis Eventos"
              route={"miseventos"}
              button="Ir"
            />

            <Card
            homeCard={true}
            home={true}
              src="https://res.cloudinary.com/daint2d1l/image/upload/v1662378588/Home/4_jfps84.png"
              text={
                "Edita Tu Información, Maneja Tus Favoritos, Revisa Tus Invitaciones"
              }
              name="Mi Perfil"
              route={"miperfil"}
              button="Ir"
            />
         
         </div>
        </div>
        
      </div>
    </>
  );
};
