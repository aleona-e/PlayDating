import React from "react";
import propTypes from "prop-types";
import "../../styles/actividades.css";
import { Link } from "react-router-dom";

export const Card = (props) => {
  const clase = props.forzarHeight
    ? "card text-center h-100"
    : "card text-center";
  return (
    <>
      <div className={clase}>
        <img
          className="card-img-top imagenCard rounded"
          src={props.src}
          alt="Card image cap"
        ></img>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <hr></hr>
          <p className="card-text">{props.text}</p>
          <p className="card-text">{props.tipo}</p>
        </div>
        <div className="card-footer bg-body">
          {props.button && (
            <Link to={`/${props.route}`}>
              <button href="#" className="btn btn-primary" role="button">
                {props.button}
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
Card.propTypes = {
  clase: propTypes.string,
  name: propTypes.string,
  src: propTypes.string,
  text: propTypes.string,
  tipo: propTypes.string,
  route: propTypes.string,
};
