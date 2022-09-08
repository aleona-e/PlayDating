import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/crearEvento.css";
import "../../styles/cardEvento.css";
import { Navbar } from "../component/navbar.jsx";
import { ComentariosEvento } from "../component/ComentariosEvento.jsx";
import { DetallesActividadEvento } from "../component/DetallesActividadEvento.jsx";
import { DetallesEventoCreado } from "../component/DetallesEventoCreado.jsx";
import {
  agregarFavorito,
  obtenerFavoritos,
  eliminarFavorito,
  obtenerEventos,
} from "../api";

export const DetalleEvento = () => {
  const { eventoId } = useParams();
  const [favoritos, setFavoritos] = useState([]);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/zonaPrivada");
    } else {
      obtenerFavoritos().then( data => {
        setFavoritos(data.data)
        obtenerEventos()
        .then( data => {
          setEventos(data.data);
        })
        .catch(error => {
          const errorStr = JSON.stringify(error);
          console.log(errorStr)
        })
      }
      )
      .catch((error) => {
        const errorStr = JSON.stringify(error);
        console.log(errorStr)
      });
    }
  }, []);
  
  const eventoEscojido = eventos.find((evento) => eventoId == evento.id);
  const participantesConFavoritos = (participantes) => {
    return participantes.map( participante => {
      const esParticipanteFavorito = favoritos.find( favorito => favorito.usuario_favorito.id = participante.id) != undefined
      return {...participante, esFavorito : esParticipanteFavorito}
    })
  }

  const onAgregarFavorito = (usuarioFavoritoId) => {
    agregarFavorito(usuarioFavoritoId)
      .then((data) => {
        alert("usuario agregado a favoritos");
        setFavoritos([...favoritos, data.data]);
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  };

  const onEliminarFavorito = (usuarioFavoritoId) => {
    eliminarFavorito(usuarioFavoritoId)
      .then((data) => {
        const newFavoritos = 
          favoritos.filter(
            favorito => favorito.usuario_favorito.id !== usuarioFavoritoId
          )
        setFavoritos(newFavoritos);
        alert("usuario eliminado de favoritos");
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
      { eventoEscojido != undefined && 

        <div className="mx-auto mt-3">
       
          <div>
            <h1>Detalles de este evento</h1>
          </div>
          <div>
            <div className="row row-cols-xs-3 mt-3 pt-3">
              <div className="card-group">
              <DetallesActividadEvento
                participantes={participantesConFavoritos(eventoEscojido.participantes)}
                nombre={eventoEscojido.actividad.nombre}
                creador={eventoEscojido.creador.nombre}
                descripcion={eventoEscojido.actividad.descripcion}
                imagen={eventoEscojido.actividad.imagen}
                eventoId={eventoEscojido.id}
                onAgregarOEliminarFavorito={onAgregarOEliminarFavorito}
              />

              <DetallesEventoCreado
                eventoId={eventoEscojido.id}
                lugar={eventoEscojido.direccion}
                fecha_y_hora={eventoEscojido.fecha_y_hora}
                estado={eventoEscojido.estado}
                tipo_de_actividad={eventoEscojido.actividad.tipo_de_actividad}
                maximo_participantes={eventoEscojido.maximo_participantes}
                cupos={eventoEscojido.cupos_disponibles}
                edad_minima={eventoEscojido.edad_minima}
                edad_maxima={eventoEscojido.edad_maxima}
                participantes={eventoEscojido.participantes}
              />
            </div>
            </div>
            {eventoEscojido.estado != "Cancelado" && (
              <div>
                <hr></hr>
                <ComentariosEvento
                  eventoId={eventoEscojido.id}
                  favoritos = {favoritos}
                  onAgregarOEliminarFavorito={onAgregarOEliminarFavorito}
                />
              </div>
            )}
          </div>
        </div>
        }
      { eventoEscojido == undefined && 
      <h2 className="m-4">...Cargando evento</h2>
      }
      </div>
            
    </>
  );
};
