import React from "react";
import "../../styles/zonaPrivada.css";
import { Link } from "react-router-dom";

const ZonaPrivada = () => {
  return (
    <>
      <div className="container col-8  d-flex justify-content-center mt-3 mb-3">
        <img  src="https://sites.google.com/site/cpimatematicas2bacb/_/rsrc/1511371228206/zona-alumnos/zona-privada.png" />
      </div>
      <div className="container col-8 d-flex justify-content-center mt-3 mb-3">
        <Link to="/register">
          <button id="buttonZonaPrivada" type="button" className="btn btn-info">
            Registro
          </button>
        </Link>

        <Link to="/login">
          <button id="buttonZonaPrivada" type="button" className="btn btn-info">
            Iniciar Sesion
          </button>
        </Link>
      </div>
    </>
  );
};

export default ZonaPrivada;
