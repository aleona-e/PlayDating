import React, { useContext, useEffect, useState } from "react";
import propTypes from "prop-types";
import "../../styles/actividades.css";
import { func } from "prop-types";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Card = (props) => {
  const navigate = useNavigate();
  useEffect (() => {
    if (localStorage.getItem('token') !== "") {
      console.log(props.route);
      navigate(`/${props.route}`, { replace: true });
    } else {
      console.log("sigue probando");
    }
  })  
  return (
    <>
      <div className="card-group">
        <div className="col">
          <div className="card text-center">
            <img
              className="card-img-top imagenCard rounded"
              src={props.src}
              alt="Card image cap"
            ></img>
            <div className="card-body">
              <h5 className="card-title">
                {props.name}
              </h5>
              <p className="card-text">
                {props.text}
              </p>
              <p className="card-text">
                {props.tipo}
              </p>
              <div className="card-footer bg-body">
              <Link to={`/${props.route}`}>  
                <button href="#" className="btn btn-primary btn-lg" role="button">
                  {props.button}
                </button>
              </Link>
              </div>
            </div></div>
        </div>
      </div>
    </>
  );
};
Card.propTypes = {
  name: propTypes.string,
  src: propTypes.string,
  text: propTypes.string,
  tipo: propTypes.string,
  route: propTypes.string,
};

