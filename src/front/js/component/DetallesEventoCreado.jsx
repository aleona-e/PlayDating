import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/crearEvento.css";
import "../../styles/cardEvento.css";
import moment from "moment";
import { UnirseRetirarseEvento } from "./UnirseRetirarseEvento.jsx";

export const DetallesEventoCreado = (props) => {
  const { store } = useContext(Context);
  const eventoId = props.eventoId;
  const eventoEscojido = store.eventos.find((evento) => eventoId == evento.id);

const esEventoFuturo = (fecha) => {
    const tiempoTrans = Date.now();
    const fechaActual = new Date(tiempoTrans);
    const fechaEvento = new Date(fecha);
    return fechaActual < fechaEvento;
  };

  let date = moment(eventoEscojido.fecha_y_hora).format("DD/MM/YYYY - HH:mm");

  return (
    <>
      <div className="col mt-3">
        <h5>{date}</h5>
        <hr></hr>
        <p>
          <strong>Lugar:</strong> {eventoEscojido.direccion}
        </p>

        {!esEventoFuturo(eventoEscojido.fecha_y_hora) ? (
          <p>
            <strong>Estado:</strong> Cerrado
          </p>
        ) : (
          <p>
            <strong>Estado:</strong> {eventoEscojido.estado}
          </p>
        )}
        <p>
          <strong>Tipo de actividad:</strong>{" "}
          {eventoEscojido.actividad.tipo_de_actividad}
        </p>
        <p>
          <strong>Cantidad máxima de participantes:</strong>{" "}
          {eventoEscojido.maximo_participantes}
        </p>
        <p>
          <strong>Cupos disponibles:</strong> {eventoEscojido.cupos_disponibles}
        </p>
        <p>
          <strong>Rango de edad:</strong> {eventoEscojido.edad_minima} -{" "}
          {eventoEscojido.edad_maxima}
        </p>
        <UnirseRetirarseEvento eventoId={eventoEscojido.id}/>
      </div>
    </>
  );
};
