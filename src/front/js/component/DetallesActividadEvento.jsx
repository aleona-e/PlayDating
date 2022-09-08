import React from "react";
import "../../styles/crearEvento.css";
import "../../styles/cardEvento.css";

export const DetallesActividadEvento = (props) => {

  const participantesEvento = (listaParticipantes) => {
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
          const favClazz = participante.esFavorito ? "fas fa-star" : "far fa-star"
          return (
            <li key={index}>
              {participante.nombre} con {participante.cantidad} participante/s{" "}
              <button        
                className="btn ms-2"           
                data-bs-placement="right"
                onClick={()=>{props.onAgregarOEliminarFavorito(participante.id)}}
              >
                <i className={favClazz+ " yellow"}></i>
              </button>
            </li>
          );
        }
      });
    }
    return participantes;
  };

  return (
    <>
    <div className="card" id="cardDetalle">
      <div className="card-title">
        <h5 className="text-center">
          <strong>{props.nombre}</strong>
        </h5>
        <hr></hr>
        <div className="card-body">
        <p>
          <strong>Creador:</strong> {props.creador}
        </p>
        <p id="descripcionCrearEvento">
          <strong>Descripción:</strong> {props.descripcion}
        </p>
        </div>
        <div className="card-footer">
          
            <p>
              <strong> Se ha unido:</strong>
            </p>
          
          <div className="row">
            
              <ul>{participantesEvento(props.participantes)}</ul>
            
          </div>
        </div>
      </div>
      </div>
      
      <div className="card mt-5 pt-5" id="cardHome">
      
        <img
          src={props.imagen}
          className="img-fluid card-img"
        />
        
      </div>
      
      
    </>
  );
};
