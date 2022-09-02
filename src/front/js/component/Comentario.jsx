import React from "react";
import "../../styles/index.css";
import { eliminarComentario } from "../api.js";

export const Comentario = (props) => {
 
  const favClazz = props.esFavorito ? "fas fa-star" : "far fa-star" 

  const onEliminarComentario = (comentarioId) => {
    eliminarComentario(comentarioId)
      .then((data) => {
        props.notificarEliminacionComentario(comentarioId);
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  };
  return (
    <>
      <div className="container">
        <div className="card w-50 mx-auto mb-2">
          <div className="card-header">
            <p id="nombreUsuario">
              {props.usuario.nombre}
              {props.usuario.id != localStorage.getItem("usuario") && (
                <button
                  className= "btn ms-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Añadir usuario a Favoritos"
                  onClick={() => {
                    props.onAgregarOEliminarFavorito(props.usuario.id);
                  }}
                >
                  <i className={favClazz + " yellow"}></i>
                </button>
              )}
            </p>
          </div>
          <div className="card-body">
            <p className="card-text">{props.comentario}</p>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-8">
                <div className="text-muted">{props.fecha}</div>
              </div>
              {props.usuario.id == localStorage.getItem("usuario") && (
                <div className="col-4 text-end">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      onEliminarComentario(props.comentarioId);
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
