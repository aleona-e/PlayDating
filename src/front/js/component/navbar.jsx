import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoTresUrl from "../../img/logo-bloques.png";
import logoUrl from "../../img/logo-circulo.png";
import logoDosUrl from "../../img/logo-castillo.png";
import { config } from "../component/config.js";
import "../../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { HOSTNAME } from "../component/config.js";

export const Navbar = () => {

  const [ocultarConToken, setOcultarConToken] = useState("ocultarConToken");
  const [ocultarSinToken, setOcultarSinToken] = useState("ocultarSinToken");

  const removeStorage = () => {
    localStorage.removeItem(config.jwt.nameToken);
  }

  useEffect(() => {
    const token = localStorage.getItem(config.jwt.nameToken);
    if (!token) {
      setOcultarSinToken("ocultarSinToken");
      setOcultarConToken("")
      
    }

    else {
      setOcultarSinToken("");
    }

  }, []);


  return (
    <nav className="navbar navbar-ligth bg-light">
      <div className="container">
        <Link to="/">
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

          <Link to="/actividades">
          <span className={"navbar-brand mb-0 h1 " + ocultarSinToken }>Actividades</span>
          </Link>
        </div>
        <Link to="/eventos">
          <span className={"navbar-brand mb-0 h1 " + ocultarSinToken }>Eventos</span>
        </Link>

       
          <Link to="/miseventos">
          <span className={"navbar-brand mb-0 h1 " + ocultarSinToken}>Mis eventos</span>
          </Link>
        

        <div className="text-end">
          <Link to="/login">
            <button className={"btn btn-primary me-2 " + ocultarConToken}>Iniciar Sesión</button>
          </Link>
          <Link to="/register">
            <button className={"btn btn-primary me-2 " + ocultarConToken}>Registro</button>
          </Link>

          <Link to="/">
            <button className={"btn btn-danger me-2 " + ocultarSinToken} onClick={removeStorage}>Cerrar sesión</button>
          </Link>

          <Link to="/miperfil">
            <button className={"btn btn-success me-2 " + ocultarSinToken}>Mi Perfil</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
