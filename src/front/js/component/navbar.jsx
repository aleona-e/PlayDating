import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoTresUrl from "../../img/logo-bloques.png";
import actividades from "../../img/actividades.png";
import eventos from "../../img/eventos.png";
import misEventos from "../../img/mis-eventos.png";
import miPerfil from "../../img/mi-perfil.png";
import { config } from "../component/config.js";
import { obtenerInvitaciones } from "../api";
import "../../styles/navbar.css";

export const Navbar = () => {
  const [ocultarConToken, setOcultarConToken] = useState("ocultarConToken");
  const [ocultarSinToken, setOcultarSinToken] = useState("ocultarSinToken");
  const [invitaciones, setInvitaciones] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem(config.jwt.nameToken);
    if (token){
    obtenerInvitaciones()
      .then((data) => {
        setInvitaciones(data.data);  
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });}
  }, []);


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
    <div className="navbar navbar-light sticky-top">
      <div className="container">
        <Link to="/homecardgroup">
          <span className="navbar-brand mb-0 h1">
            <img
              src={logoTresUrl}
              alt=""
              width="90"
              height="90"
              className="d-inline-block align-text-top"
            ></img>
          </span>
        </Link>
        <div>
          <Link
            id="link"
            to="/actividades"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Actividades"
          >
            <span
              id="LinkNavbar"
              className={"navbar-brand mb-0 h1 " + ocultarSinToken}
            >
              <img
                src={actividades}
                alt=""
                width="30"
                height="30"
                className="d-inline-block align-text-top"
              ></img>
            </span>
          </Link>
        </div>
        <Link
          id="link"
          to="/eventos"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Eventos"
        >
          <span
            id="LinkNavbar"
            className={"navbar-brand mb-0 h1 " + ocultarSinToken}
          >
            <img
              src={eventos}
              alt=""
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            ></img>
          </span>
        </Link>

        <Link
          id="link"
          to="/miseventos"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Mis Eventos"
        >
          <span
            id="LinkNavbar"
            className={"navbar-brand mb-0 h1 " + ocultarSinToken}
          >
            <img
              src={misEventos}
              alt=""
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            ></img>
          </span>
        </Link>

        <Link
          id="link"
          to="/miperfil"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Mi Perfil"
          onClick={() => notificarInvitacionesVistas()}
        >
          <span
            id="LinkNavbar"
            className={
              "navbar-brand mb-0 h1 position-relative " + ocultarSinToken
            }
          >
            <img
              src={miPerfil}
              alt=""
              width="30"
              height="30"
              className="d-inline-block align-text-top "
            ></img>
            {invitaciones.length != 0 &&
              (
                  <span className="position-absolute top-30 start-52 translate-middle badge bg-danger border border-light rounded-circle text-light">
                    +<span className="visually-hidden">New alerts</span>
                  </span>
                )}
          </span>
        </Link>
        <div className="text-end">
          <Link to="/login">
            <button
              id="buttonMiPerfil"
              className={"btn  me-2 " + ocultarConToken}
            >
              Entrar
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
              Salir
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
