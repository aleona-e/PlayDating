import React from "react";
import { Card } from "./card.jsx";
import { Navbar } from "../component/navbar.jsx";

export const HomeCardGroup = () => {
  return (
    <>
      <Navbar />

      <div className="p-5">
        <div className="card-group mt-4">
          <Card
            name="Actividades"
            src="https://res.cloudinary.com/daint2d1l/image/upload/v1658477832/Home/11_zt2ju9.png"
            text={"Crea Eventos Con Las Actividades Favoritas De Tus Hijos."}
            button="Ir"
            route={"actividades"}
          />
          <Card
            name="Eventos"
            src="https://res.cloudinary.com/daint2d1l/image/upload/v1658496142/Home/5_yvbobb.png"
            text={"Participa En Los Eventos Creados En Tu Provincia."}
            button="Ir"
            route={"eventos"}
          />
          <Card
            name="Mi Perfil"
            src="https://res.cloudinary.com/daint2d1l/image/upload/v1658495567/Home/6_tarplu.png"
            text={"Edita Tu Información."}
            button="Ir"
            route={"miperfil"}
          />
          <Card
            name="Mis Eventos"
            src="https://res.cloudinary.com/daint2d1l/image/upload/v1658496145/Home/3_d12ocd.png"
            text={"Accede Y Maneja Tus Eventos."}
            button="Ir"
            route={"miseventos"}
          />
        </div>
      </div>
    </>
  );
};
