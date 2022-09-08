import React from "react";
import "../../styles/crearEvento.css";
import "../../styles/cardEvento.css";
import moment from "moment";
import { UnirseRetirarseEvento } from "./UnirseRetirarseEvento.jsx";

export const DetallesEventoCreado = (props) => {

  const eventoId = props.eventoId;

const esEventoFuturo = (fecha) => {
    const tiempoTrans = Date.now();
    const fechaActual = new Date(tiempoTrans);
    const fechaEvento = new Date(fecha);
    return fechaActual < fechaEvento;
  };

  let date = moment(props.fecha_y_hora).format("DD/MM/YYYY - HH:mm");

  return (
    <>
    <div className="card" id="cardDetalle">
      <div className="card-title">
        <h5 className="text-center">{date}</h5>
        <hr></hr>
        <div className="card-body">
        <p>
          <strong>Lugar:</strong> {props.direccion}
        </p>

        {!esEventoFuturo(props.fecha_y_hora) ? (
          <p>
            <strong>Estado:</strong> Cerrado
          </p>
        ) : (
          <p>
            <strong>Estado:</strong> {props.estado}
          </p>
        )}
        <p>
          <strong>Tipo de actividad:</strong>{" "}
          {props.tipo_de_actividad}
        </p>
        <p>
          <strong>Cantidad máxima de participantes:</strong>{" "}
          {props.maximo_participantes}
        </p>
        <p>
          <strong>Cupos disponibles:</strong> {props.cupos}
        </p>
        <p>
          <strong>Rango de edad:</strong> {props.edad_minima} -{" "}
          {props.edad_maxima}
        </p>
        </div>
        <div className="card-footer">
        <UnirseRetirarseEvento eventoId={eventoId}
        cupos={props.cupos}
        participantes={props.participantes}
        estado={props.estado}
        fecha_y_hora={props.fecha_y_hora}
        />
        </div>
      </div>
      </div>
    </>
  );
};
