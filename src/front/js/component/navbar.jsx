import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-ligth bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">PlayDating</span>
        </Link>
        <div>
          <h5>Actividades</h5>
        </div>
        <div>
          <h5>Eventos</h5>
        </div>

        <div>
          <h5>Mis eventos</h5>
        </div>
        <Link to="/crearevento">
          <span className="navbar-brand mb-0 h1">Crear Evento</span>
        </Link>

        <div className="ml-auto">
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-primary">REGISTRO</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
