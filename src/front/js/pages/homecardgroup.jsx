import React, { useEffect, useState } from "react";
import { Card } from "../component/card.jsx";
import { Navbar } from "../component/navbar.jsx";
import { config } from "../component/config.js";
import { useNavigate } from "react-router-dom";
import { obtenerDatosPerfil } from "../api.js";
import { Link } from "react-router-dom";
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
          <div className="mt-2 pt-2">
            <h3 id="bienvenida">¡Bienvenid@ {datosUsuario.nombre}!</h3>
          </div>
        )}
        <div className="pt-2 pb-4 me-5 pe-5">
          <div className="btn-group mt-4" role="group">
            <Link to={"/actividades"}>
              <button className="btn">
                <Card
                  src="https://res.cloudinary.com/daint2d1l/image/upload/v1658477832/Home/11_zt2ju9.png"
                  text={
                    "Crea Eventos Con Las Actividades Favoritas De Tus Hijos."
                  }
                />
              </button>
            </Link>
            <Link to={"/eventos"}>
              <button className="btn">
                <Card
                  src="https://res.cloudinary.com/daint2d1l/image/upload/v1658496142/Home/5_yvbobb.png"
                  text={"Únete Y Participa En Los Eventos Creados En Tu Provincia."}
                  
                />
              </button>
            </Link>
            <Link to={"/miperfil"}>
              <button className="btn">
                <Card
                  src="https://res.cloudinary.com/daint2d1l/image/upload/v1658495567/Home/6_tarplu.png"
                  text={"Edita Tu Información, Maneja Tus Favoritos, Revisa Tus Invitaciones"}
                  
                />
              </button>
            </Link>
            <Link to={"/miseventos"}>
              <button className="btn">
                <Card
                  src="https://res.cloudinary.com/daint2d1l/image/upload/v1658496145/Home/3_d12ocd.png"
                  text={"Accede, Maneja Y Obten Todos Los Detalles De Tus Eventos, Futuros Y Pasados"}
                  
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
