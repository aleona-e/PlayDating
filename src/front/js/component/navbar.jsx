import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoTresUrl from "../../img/logo-bloques.png";
import actividades from "../../img/actividades.png";
import eventos from "../../img/eventos.png";
import misEventos from "../../img/mis-eventos.png";
import miPerfil from "../../img/mi-perfil.png";
import { config } from "../component/config.js";
import "../../styles/navbar.css";

export const Navbar = () => {
  const [ocultarConToken, setOcultarConToken] = useState("ocultarConToken");
  const [ocultarSinToken, setOcultarSinToken] = useState("ocultarSinToken");

  const removeStorage = () => {
    localStorage.removeItem(config.jwt.nameToken);
    localStorage.removeItem("usuario");
  };

  useEffect(() => {
    const token = localStorage.getItem(config.jwt.nameToken);
    if (!token) {
      setOcultarSinToken("ocultarSinToken");
      setOcultarConToken("");
    } else {
      setOcultarSinToken("");
    }
  }, []);

  return (
    <nav className="navbar navbar-ligth">
      <div className="container">
        <Link to="/homecardgroup">
          <span className="navbar-brand mb-0 h1">
            <img
              src={logoTresUrl}
              alt=""
              width="120"
              height="120"
              className="d-inline-block align-text-top"
            ></img>
        
          </span>
        </Link>
        <div>
          <Link id="link" to="/actividades">
            <span
              id="LinkNavbar"
              className={"navbar-brand mb-0 h1 " + ocultarSinToken}
            >
              <img
              src={actividades}
              alt=""
              width="80"
              height="80"
              className="d-inline-block align-text-top"
            ></img>
            
            </span>
          </Link>
        </div>
        <Link id="link" to="/eventos">
          <span
            id="LinkNavbar"
            className={"navbar-brand mb-0 h1 " + ocultarSinToken}
          >
            <img
              src={eventos}
              alt=""
              width="80"
              height="80"
              className="d-inline-block align-text-top"
            ></img>
          </span>
        </Link>

        <Link id="link" to="/miseventos">
          <span
            id="LinkNavbar"
            className={"navbar-brand mb-0 h1 " + ocultarSinToken}
          >
            <img
              src={misEventos}
              alt=""
              width="80"
              height="80"
              className="d-inline-block align-text-top"
            ></img>
          </span>
        </Link>

        <Link id="link" to="/miperfil">
          <span
            id="LinkNavbar"
            className={"navbar-brand mb-0 h1  " + ocultarSinToken}
          >
            <img
              src={miPerfil}
              alt=""
              width="80"
              height="80"
              className="d-inline-block align-text-top"
            ></img>
          </span>
        </Link>
        <div className="text-end">
          <Link to="/login">
            <button
              id="buttonMiPerfil"
              className={"btn  me-2 " + ocultarConToken}
            >
              Iniciar Sesión
            </button>
          </Link>
          <Link to="/register">
            <button
              id="buttonMiPerfil"
              className={"btn me-2 " + ocultarConToken}
            >
              Registro
            </button>
          </Link>

          <Link to="/">
            <button
              id="buttonCerrarSesion"
              className={"btn me-2 " + ocultarSinToken}
              onClick={() => {
                removeStorage();
              }}
            >
              Cerrar sesión
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
