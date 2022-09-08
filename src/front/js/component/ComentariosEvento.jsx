import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import { Comentario } from "./Comentario.jsx";
import { dejarComentario } from "../api.js";
import { obtenerComentarios } from "../api.js";

export const ComentariosEvento = (props) => {

  let eventoId = props.eventoId;
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const updateComentario = (e) => {
    const value = e.target.value;
    setNuevoComentario(value);
  };

  useEffect(() => {
    obtenerComentarios(eventoId)
      .then((data) => {
        setComentarios(data.data);
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  }, []);

  const comentariosConFavoritos = (comentarios) =>{
    const favoritos = props.favoritos
  
    return comentarios.map((comentario) => {
      const autorEsFavorito = favoritos.find(favorito =>  comentario.usuario_id.id === favorito.usuario_favorito.id) != undefined
      return {...comentario, esFavorito: autorEsFavorito}
      })
      }
  

  const notificarEliminacionComentario = (comentarioId) => {
    setComentarios(comentarios.filter((comentario)=>comentarioId != comentario.id))
  }

  const onDejarComentario = () => {
    if (nuevoComentario != ""){
    dejarComentario(eventoId, nuevoComentario)
      .then((data) => {
       setComentarios(comentarios => [...comentarios, data.data])
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
    } else {
      alert("Comentario vacío")
    }
  };

  const sortedComentarios = (comentarios) => {
    comentarios.sort((a, b) => {
      const fechaComentarioA = new Date(a.fecha_y_hora);
      const fechaComentarioB = new Date(b.fecha_y_hora);
      if (fechaComentarioA < fechaComentarioB) {
        
        return 1;
      } else if (fechaComentarioB < fechaComentarioA) {
        return -1;
      } else {
        return 0;
      }
    });
    return comentarios;
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mx-auto mb-3">
            <div className="input-group">
              <textarea
                onChange={(e) => updateComentario(e, setNuevoComentario)}
                value={nuevoComentario}
                className="form-control"
                placeholder="Deja un comentario..."
              ></textarea>
              <button
                className="btn btn-primary"
                id="buttonGuardar"
                onClick={() => {
                  onDejarComentario(); setNuevoComentario("");
                }}
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
        {
          (sortedComentarios(comentariosConFavoritos(comentarios)).map((comentario, index) => {
            return (
              <div key={index}>
                <Comentario
                  usuario={comentario.usuario_id}
                  fecha={comentario.fecha_y_hora}
                  comentario={comentario.comentario}
                  comentarioId={comentario.id}
                  esFavorito = {comentario.esFavorito}
                  notificarEliminacionComentario={notificarEliminacionComentario}
                  onAgregarOEliminarFavorito={props.onAgregarOEliminarFavorito}
                />
              </div>
            )
          })
          )
        }
      </div>
    </>
  );
};
