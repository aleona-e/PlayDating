import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/crearEvento.css";
import "../../styles/cardEvento.css";

export const DetallesActividadEvento = (props) => {

  const { store } = useContext(Context);
  const eventoId = props.eventoId;
  const eventoEscojido = store.eventos.find((evento) => eventoId == evento.id);



  const participantesEvento = () => {
    let listaParticipantes = eventoEscojido.participantes;
    let participantes = [];
    if (listaParticipantes.length === 0) {
      return <li>Aún no hay participantes</li>;
    } else {
      participantes = listaParticipantes.map((participante, index) => {
        
        if (participante.id == localStorage.getItem("usuario")) {
          return (
            <li key={index}>
              Te has unido con {participante.cantidad} participante/s{" "}
            </li>
          );
        } else {
          return (
            <li key={index}>
              {participante.nombre} con {participante.cantidad} participante/s{" "}
              <button        
                className={participanteEnFavoritos(participante)}            
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Añadir usuario a Favoritos"
                onClick={()=>{props.onAgregarOEliminarFavorito(participante.id)}}
              >
                <i className="fa fa-star"></i>
              </button>
            </li>
          );
        }
      });
    }
    return participantes;
  };

  const participanteEnFavoritos = (participante) => {
    let buttonClass = ""
    store.favoritos.find(favorito=>favorito.usuario_favorito_id == participante.id) ? buttonClass = "btn btn-warning ms-2" : buttonClass="btn btn-outline-warning ms-2"  
    return buttonClass
  }

  return (
    <>
      <div className="col mt-3">
        <h5>
          <strong>{eventoEscojido.actividad.nombre}</strong>
        </h5>
        <hr></hr>
        <p>
          <strong>Creador:</strong> {eventoEscojido.creador.nombre}
        </p>
        <p id="descripcionCrearEvento">
          <strong>Descripción:</strong> {eventoEscojido.actividad.descripcion}
        </p>
        <div className="row">
          <div className="col-4">
            <p>
              <strong> Se ha unido:</strong>
            </p>
          </div>
          <div className="row">
            <div className="col-12">
              <ul>{participantesEvento()}</ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col mt-3">
        <img
          src={eventoEscojido.actividad.imagen}
          className="img-fluid rounded-start unirseImg"
        />
      </div>
    </>
  );
};
