import React from "react";
import { Card } from "./card.jsx";
import logoUrl from "../../img/logo-circulo.png";
import logoDosUrl from "../../img/logo-castillo.png";

export const HomeCardGroup = () => {
    return (
        <>
            <div className="row row-cols-1 row-cols-md-2 g-4 mt-1">
                <Card
                    name="Actividades"
                    src={logoDosUrl}
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="Ir"
                    route={"actividades"}
                />
                <Card
                    name="Eventos Creados"
                    src={logoDosUrl}
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="Ir"
                    route={"eventos"}
                />
                <Card
                    name="Mi perfil"
                    src={logoDosUrl}
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="Ir"
                    route={"miperfil"}
                />
                <Card
                    name="Mis Eventos"
                    src={logoDosUrl}
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