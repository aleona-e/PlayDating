import React from "react";
import { Link } from "react-router-dom";
import logoUrl from "../../img/logo-circulo.png";
import logoDosUrl from "../../img/logo-castillo.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-ligth bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <img
              src={logoDosUrl}
              alt=""
              width="120"
              height="100"
              className="d-inline-block align-text-top"
            ></img>
          </span>
        </Link>
        <div>
          <Link to="/actividades">
            <h5>Actividades</h5>
          </Link>
        </div>
        <Link to="/eventos">
          <span className="navbar-brand mb-0 h1">Eventos</span>
        </Link>

        <div>
          <h5>Mis eventos</h5>
        </div>

        <div className="ml-auto">
          <Link to="/login">
            <button className="btn btn-primary">Iniciar Sesión</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-primary">Registro</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
