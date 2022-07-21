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

  if (props.creador !== store.usuario_id) {
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
                <p className="card-text">{date}</p>
                <p className="card-text">{props.tipo}</p>
                <p className="card-text">
                  Max Participantes:
                  {props.max_participantes}
                  <br />
                  Min Participantes:
                  {props.min_participantes}
                </p>
                <p className="card-text">{props.estado}</p>
                {/* <p className="card-text"> EDAD MAX Y MIN
                {props.edadMaxima}
                {props.edadMinima}
                </p> */}

                <div className="card-footer bg-body">
                  <Link to="/crearevento">
                    <button
                      href="#"
                      className="btn btn-primary btn-lg"
                      role="button"
                    >
                      Unirme
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
                <p className="card-text">{props.fecha_y_hora}</p>
                <p className="card-text">{props.tipo}</p>
                <p className="card-text">
                  Max Participantes:
                  {props.max_participantes}
                  <br />
                  Min Participantes:
                  {props.min_participantes}
                </p>
                <p className="card-text">{props.estado}</p>
                {/* <p className="card-text"> EDAD MAX Y MIN
                {props.edadMaxima}
                {props.edadMinima}
                </p> */}

                <div className="card-footer bg-body">
                  <button
                    onClick={onCancel}
                    href="#"
                    className="btn btn-primary btn-lg"
                    role="button"
                  >
                    CANCELAR
                  </button>

                  {/* cuando se pulsa boton unir, que ponga solo ok. sin redirigir a pagina */}
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
