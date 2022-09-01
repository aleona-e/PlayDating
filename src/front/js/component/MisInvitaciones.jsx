import React, { useState, useEffect, useContext } from "react";
import "../../styles/crearEvento.css";
import "../../styles/index.css";
import { obtenerInvitaciones, eliminarInvitacion} from "../api.js";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const MisInvitaciones = () => {

  const { store, actions } = useContext(Context);
  const [invitaciones, setInvitaciones] = useState([]);

  useEffect(() => {
    obtenerInvitaciones()
      .then((data) => {   
        setInvitaciones(data.data)   
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  }, []);

 const onEliminarInvitacion = (invitacionId) => {
    eliminarInvitacion(invitacionId)
      .then((data) => {
        setInvitaciones(invitaciones.filter(invitacion => invitacion.id !== invitacionId))

      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  };

  return (
    <>
      <div className="container mx-auto" id="favoritosPerfil">
        <div className="card" id="cardFavoritos">
          <div className="card-header">
            <h5 className="text-center" id="tituloFavorito">
              Mis Invitaciones
              <i className="fa fa-envelope ms-3" id="favoritoPerfil"></i>
            </h5>
          </div>
          <ul className="list-group list-group-flush">
            {invitaciones.length === 0 && (
              <li key={0} className="list-group-item">
                No tienes invitaciones.
              </li>
            )}

            {invitaciones.map((invitacion, index) => {
              return (
                <li className="list-group-item" key={index}>
                  {invitacion.usuario_creador.nombre + " " + "te ha invitado a " + invitacion.evento.actividad.nombre}{" "}
                  <Link to={"/detalleEvento/" + invitacion.evento.id}>
                  <button
                    className="btn btn-outline ms-1"
                    id="buttonInvitacion"
                    onClick={() => {
                      
                    }}
                  > Ver Evento
                    
                  </button>
                  <button
                    className="btn btn-outline-danger ms-5 justify-content-end"
                    
                    onClick={() => {onEliminarInvitacion(invitacion.id)
                      
                    }}
                  > 
                    <i className="fa fa-times"></i>
                  </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
