import React from "react";
import { Card } from "./card.jsx";


export const Actividades = () => {
    return (
        <> <h1>Actividades</h1>
            <div className="row row-cols-1 row-cols-md-2 g-4 mt-1">
                <Card
                    name="Cuentos"
                    src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="+ Información"
                    route={"learnmore"}
                />
                <Card
                    name="Baloncesto"
                    src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="+ Información"
                    route={"learnmore"}
                />
                <Card
                    name="Parque"
                    src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="+ Información"
                    route={"learnmore"}
                />
                <Card
                    name="Jugar a futbol"
                    src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"
                    text={
                        "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
                    button="+ Información"
                    route={"learnmore"}
                />
            </div>
        </>
    );
};