import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/crearEvento.css";
import "../../styles/cardEvento.css";
import { Navbar } from "../component/navbar.jsx";
import { ComentariosEvento } from "../component/ComentariosEvento.jsx";
import { DetallesActividadEvento } from "../component/DetallesActividadEvento.jsx";
import { DetallesEventoCreado } from "../component/DetallesEventoCreado.jsx";
import { agregarFavorito, obtenerFavoritos, eliminarFavorito } from "../api";


export const DetalleEvento = (props) => {
  
  const { store, actions } = useContext(Context);
  const { eventoId } = useParams();
  const [favoritos, setFavoritos] = useState([])
  const eventoEscojido = store.eventos.find((evento) => eventoId == evento.id);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/zonaPrivada");
    } else {
      obtenerFavoritos()
        .then((data) => {
          setFavoritos(data.data)
          //actions.guardarFavoritos(data.data)

        })
        .catch((error) => {
          const errorStr = JSON.stringify(error);
        });
    }
  }, []);

  const onAgregarFavorito = (usuarioFavoritoId) => {
    agregarFavorito(usuarioFavoritoId)
      .then((data) => {
        alert("usuario agregado a favoritos");
        setFavoritos([...favoritos, data.data])
        //actions.agregarFavorito(data.data)
        console.log(data.data)
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  };
  

  const onEliminarFavorito = (usuarioFavoritoId) => {
    eliminarFavorito(usuarioFavoritoId)
      .then((data) => {
        setFavoritos(favoritos.filter(favorito => favorito.usuario_favorito.id !== usuarioFavoritoId))
        //actions.eliminarFavorito(usuarioFavoritoId)
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  };

  const onAgregarOEliminarFavorito = (usuarioFavoritoId) => {
    
    if (
      favoritos.find(
        (favorito) => favorito.usuario_favorito.id == usuarioFavoritoId
      )
    ) {
      onEliminarFavorito(usuarioFavoritoId);
      
    } else {
      onAgregarFavorito(usuarioFavoritoId);
      
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" id="unirseEvento">
        <div className="mt-3">
          <div>
            <h1>Detalles de este evento</h1>
          </div>
          <div>
            <div className="row row-cols-3 m-4">
              <DetallesActividadEvento
                eventoId={eventoEscojido.id}
                onAgregarOEliminarFavorito={onAgregarOEliminarFavorito}
              />

              <DetallesEventoCreado eventoId={eventoEscojido.id} />
            </div>
            {eventoEscojido.estado != "Cancelado" && (
              <div>
                <hr></hr>
                <ComentariosEvento
                  eventoId={eventoEscojido.id}
                  onAgregarOEliminarFavorito={onAgregarOEliminarFavorito}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
