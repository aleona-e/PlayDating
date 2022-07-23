import React, { useContext } from "react";
import propTypes from "prop-types";
import "../../styles/cardEvento.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { HOSTNAME } from "./config";


export const CardEvento = (props) => {
  const { store, actions } = useContext(Context);

  const onCancel = async () => {
    const response = await fetch(
      HOSTNAME + `/cancelarevento/${props.evento_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    const json = await response.json();
  };

  if (props.creador != store.usuario_id) {
    //logearse cuando no se muestren ambas. mirar como solucionar
    const date = new Date(props.fecha_y_hora).toISOString();
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
                <h5 className="card-title">{props.name}</h5>
                <hr></hr>
                <p className="card-text">{props.fecha_y_hora}</p>
                <p className="card-text">{props.tipo}</p>
                <p className="card-text">
                  Max participantes: {props.max_participantes}
                </p>
                <p className="card-text">
                  Cupos disponibles: {props.cupos_disponibles}
                </p>
                <p className="card-text">{props.estado}</p>
                {/* <p className="card-text"> EDAD MAX Y MIN
                {props.edadMaxima}
                {props.edadMinima}
                </p> */}

                <div className="card-footer bg-body">
                  <Link to={props.route}>
                    <button href="#" className="btn btn-primary" role="button">
                      Ver Detalles
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
  } else {
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
                <h5 className="card-title">{props.name}</h5>
                <hr></hr>
                <p className="card-text">{props.fecha_y_hora}</p>
                <p className="card-text">{props.tipo}</p>
                <p className="card-text">
                  Max participantes: {props.max_participantes}
                </p>
                <p className="card-text">
                  Cupos disponibles: {props.cupos_disponibles}
                </p>
                <p className="card-text">{props.estado}</p>
                {/* <p className="card-text"> EDAD MAX Y MIN
                {props.edadMaxima}
                {props.edadMinima}
                </p> */}

                <div className="card-footer bg-body">
                  <Link to={props.route}>
                    <button href="#" className="btn btn-primary" role="button">
                      Ver Detalles
                    </button>
                  </Link>

                  <button
                    onClick={onCancel}
                    href="#"
                    className="btn btn-danger"
                    role="button"
                  >
                    Cancelar Evento
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
CardEvento.propTypes = {
  evento_id: propTypes.number,
  creador: propTypes.number,
  name: propTypes.string,
  src: propTypes.string,
  text: propTypes.string,
  tipo: propTypes.string,
  route: propTypes.string,
  max_participantes: propTypes.number,
  min_participantes: propTypes.number,
  estado: propTypes.string,
  // edadMaxima: propTypes.number,
  // edadMinima: propTypes.number,
  fecha_y_hora: propTypes.string,
};
