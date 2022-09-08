import React, { useState } from "react";
import { MisFavoritos } from "../component/MisFavoritos.jsx";
import { Navbar } from "../component/navbar.jsx";
import { MiPerfil } from "../component/miperfil.jsx";
import "../../styles/index.css";
import { MisInvitaciones } from "../component/MisInvitaciones.jsx";

export const MiperfilDos = () => {
  const [nombre, setNombre] = useState("");

  const notificarNombreUsuario = (nombre) => {
    setNombre(nombre);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="mt-4 pt-3">
          <h3 id="bienvenida">¡Hola {nombre}!</h3>
        </div>
        <div className="row justify-content-center">
          <div className="col col-sm-8">
            <MiPerfil notificarNombre={notificarNombreUsuario} />
          </div>
          <div className="col sm-auto">
            <MisFavoritos />
            <MisInvitaciones />
          </div>
        </div>
      </div>
    </>
  );
};
