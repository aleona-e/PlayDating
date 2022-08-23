import React, { useState } from "react";
import { MisFavoritos } from "../component/MisFavoritos.jsx";
import { Navbar } from "../component/navbar.jsx";
import { MiPerfil } from "../component/miperfil.jsx";

export const MiperfilDos = () => {
  const [nombre, setNombre] = useState("");

  const notificarNombreUsuario = (nombre) => {
    setNombre(nombre);
  };
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="mt-4 pt-3">
          <h3>¡Bienvenid@ {nombre}!</h3>
        </div>
        <div className="row">
          <div className="col-8">
            <MiPerfil notificarNombre={notificarNombreUsuario} />
          </div>
          <div className="col-4">
            <div clasName="mx-auto">
            <MisFavoritos />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
