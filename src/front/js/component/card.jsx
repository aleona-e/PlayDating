import React from "react";
import propTypes from "prop-types";
import "../../styles/actividades.css";
import { Link } from "react-router-dom";

export const Card = (props) => {
  
  return (
    <>
      {/* <div className="card-group">
        <div className="col"> */}
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
              <hr></hr>
              <p className="card-text">
                {props.text}
              </p>
              <p className="card-text">
                {props.tipo}
              </p></div>
              <div className="card-footer bg-body">
              <Link to={`/${props.route}`}>  
                <button href="#" className="btn btn-primary btn-lg" role="button">
                  {props.button}
                </button>
              </Link>
              </div>
            </div>
        {/* </div>
      </div> */}
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

