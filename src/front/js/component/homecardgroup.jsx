import React from "react";
import { Card } from "./card.jsx";


export const HomeCardGroup = () => {
    return (
        <>
            <div className="row row-cols-1 row-cols-md-2 g-4 mt-1">
                <Card
                    name="Actividades"
                    src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="Ir"
                    route={"actividades"}
                />
                <Card
                    name="Eventos Creados"
                    src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="Ir"
                    route={"eventoscreados"}
                />
                <Card
                    name="Mi perfil"
                    src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="Ir"
                    route={"miperfil"}
                />
                <Card
                    name="Mis Eventos"
                    src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"
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