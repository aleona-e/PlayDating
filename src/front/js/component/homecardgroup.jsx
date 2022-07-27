import React from "react";
import { Card } from "./card.jsx";
import { Navbar } from "../component/navbar.jsx";

export const HomeCardGroup = () => {
    return (
        <>
        <Navbar/>
        <div className="container">
            <div className="py-5">
        <div className="card-group mt-4">
        
                <Card
                    
                    name="Actividades"

                    src="https://res.cloudinary.com/daint2d1l/image/upload/v1658477832/Home/11_zt2ju9.png"

                    text={
                        "Escoje una actividad para crear tu evento! "
                    }
                    button="Ir"
                    route={"actividades"}
                />
                <Card
                    
                    name="Eventos"
                    src="https://res.cloudinary.com/daint2d1l/image/upload/v1658496142/Home/5_yvbobb.png"
                    text={
                        "Únete a los eventos disponibles en tu provincia!"
                    }
                    button="Ir"
                    route={"eventos"}
                />
                <Card
                    
                    name="Mi perfil"
                    src="https://res.cloudinary.com/daint2d1l/image/upload/v1658495567/Home/6_tarplu.png"
                    text={
                        "Edita tu información."
                    }
                    button="Ir"
                    route={"miperfil"}
                />
                <Card
                    
                    name="Mis Eventos"
                    src="https://res.cloudinary.com/daint2d1l/image/upload/v1658496145/Home/3_d12ocd.png"
                    text={
                        "Accede y maneja tus eventos."
                    }
                    button="Ir"
                    route={"miseventos"}
                />
            </div>
            </div>
            </div>
        </>
    );
};
