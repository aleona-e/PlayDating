import React from "react";
import propTypes from "prop-types";
import "../../styles/cardEvento.css";
import { Link } from "react-router-dom";

export const CardEvento = (props) => {
  return (
    <>
      <div className="card">
        <div className="col">
          <div className="card text-center">
            <img
              className="card-img-top imagenCard rounded"
              //   src={props.src}
              alt="Card image cap"
            ></img>
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              <p className="card-text">{props.text}</p>
              <p className="card-text">{props.tipo}</p>
              <p className="card-text">
                {" "}
                MAX Y MIN PARTICIPANTES
                {props.max_participantes}
                {props.min_participantes}
              </p>
              {/* <p className="card-text"> EDAD MAX Y MIN
              {props.edadMaxima}
              {props.edadMinima}
              </p> */}
              <p className="card-text">
                FECHA Y HORA
                {props.fecha_y_hora}
              </p>
              <div className="card-footer bg-body">
                <Link to={`/${props.route}`}>  
                <button href="#" className="btn btn-primary btn-lg" role="button">
                  {props.button}
                </button>
              </Link> 
              {/* cuando se pulsa boton unir, que ponga solo ok. sin redirigir a pagina */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
CardEvento.propTypes = {
  name: propTypes.string,
  src: propTypes.string,
  text: propTypes.string,
  tipo: propTypes.string,
  route: propTypes.string,
  max_participantes: propTypes.number,
  min_participantes: propTypes.number,
  // edadMaxima: propTypes.number,
  // edadMinima: propTypes.number,
  fecha_y_hora: propTypes.dateTime,
};
