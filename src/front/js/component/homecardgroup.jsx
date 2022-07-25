import React from "react";
import { Card } from "./card.jsx";
import logoUrl from "../../img/logo-circulo.png";
import logoDosUrl from "../../img/logo-castillo.png";
import { Navbar } from "../component/navbar.jsx";

export const HomeCardGroup = () => {
  return (
    <>
      <Navbar />
      <div className="card-group mt-4">
        <Card
          name="Actividades"
          src="https://res.cloudinary.com/daint2d1l/image/upload/v1658477832/Home/11_zt2ju9.png"
          text={
            "Some quick example text to build on the card title and make up the bulk of the card's content."
          }
          button="Ir"
          route={"actividades"}
        />
        <Card
          name="Eventos Creados"
          src="https://res.cloudinary.com/daint2d1l/image/upload/v1658496142/Home/5_yvbobb.png"
          text={
            "Some quick example text to build on the card title and make up the bulk of the card's content."
          }
          button="Ir"
          route={"eventos"}
        />
        <Card
          name="Mi perfil"
          src="https://res.cloudinary.com/daint2d1l/image/upload/v1658495567/Home/6_tarplu.png"
          text={
            "Some quick example text to build on the card title and make up the bulk of the card's content."
          }
          button="Ir"
          route={"miperfil"}
        />
        <Card
          name="Mis Eventos"
          src="https://res.cloudinary.com/daint2d1l/image/upload/v1658496145/Home/3_d12ocd.png"
          text={
            "Some quick example text to build on the card title and make up the bulk of the card's content."
          }
          button="Ir"
          route={"miseventos"}
        />
      </div>
    </>
  );
};
