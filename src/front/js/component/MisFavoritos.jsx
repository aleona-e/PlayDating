import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import { obtenerFavoritos, eliminarFavorito } from "../api.js";

export const MisFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    obtenerFavoritos()
      .then((data) => {
        setFavoritos(data.data);
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  }, []);

  const onEliminarFavorito = (usuarioFavoritoId) => {
    eliminarFavorito(usuarioFavoritoId)
      .then((data) => {
        setFavoritos(
          favoritos.filter(
            (favorito) => usuarioFavoritoId != favorito.usuario_favorito.id
          )
        );
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  };

  return (
    <>
      <div className="container mx-auto" id="favoritosPerfil">
        <h5 className="text-center" id="tituloFavorito">
          Mis Favoritos<i className="fa fa-star ms-3" id="favoritoPerfil"></i>
        </h5>
        {favoritos.length === 0 && (
          <div>
            <h4 className="mt-5">Tu lista de favoritos está vacía.</h4>
          </div>
        )}
        {favoritos.map((favorito, index) => {
          return (
            <div className="mt-5">
              <ul>
                <li key={index}>
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
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};
