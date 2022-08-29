import React, { useState, useEffect, useContext } from "react";
import "../../styles/index.css";
import { obtenerFavoritos, eliminarFavorito } from "../api.js";
import { Context } from "../store/appContext.js"

export const MisFavoritos = () => {

  const { store, actions } = useContext(Context);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    obtenerFavoritos()
      .then((data) => {   
        setFavoritos(data.data)   
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  }, []);

  const onEliminarFavorito = (usuarioFavoritoId) => {
    eliminarFavorito(usuarioFavoritoId)
      .then((data) => {
        setFavoritos(favoritos.filter(favorito => favorito.usuario_favorito.id !== usuarioFavoritoId))

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
              Mis Favoritos
              <i className="fa fa-star ms-3" id="favoritoPerfil"></i>
            </h5>
          </div>
          <ul className="list-group list-group-flush">
            {favoritos.length === 0 && (
              <li key={0} className="list-group-item">
                Tu lista de favoritos está vacía.
              </li>
            )}

            {favoritos.map((favorito, index) => {
              return (
                <li className="list-group-item" key={index}>
                  {favorito.usuario_favorito.nombre}{" "}
                  <button
                    className="btn btn-outline-danger ms-4"
                    onClick={() => {
                      onEliminarFavorito(favorito.usuario_favorito.id);
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
