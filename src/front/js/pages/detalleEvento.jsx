import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crearEvento.css";
import { unirseEvento, retirarseDeEvento } from "../api.js";
import { Navbar } from "../component/navbar.jsx";
import moment from "moment";

export const DetalleEvento = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/zonaPrivada");
    } else {
    }
  }, []);

  const { store } = useContext(Context);
  const { eventoId } = useParams();
  const eventoEscojido = store.eventos.find((evento) => eventoId == evento.id);

  // inputs a rellenar por usuario
  const [numParticipantesPorUsuario, setNumParticipantesPorUsuario] =
    useState("");

  //ciclo de vida de boton.
  const [deshabilitado, setDeshabilitado] = useState(true);

  //modal de unirse a evento
  const [modal, setModal] = useState(false);
  const [textoModal, setTextoModal] = useState("");
  const [tituloModal, setTituloModal] = useState("");

  //mostrar opciones de selecion basado en cupos disponibles
  const llenarOpcionesSelect = () => {
    let cuposDisponibles = eventoEscojido.cupos_disponibles;
    let cupos = [];
    while (cuposDisponibles > 0) {
      let currentCupo = cuposDisponibles--;
      cupos.push(currentCupo);
    }
    cupos = cupos.reverse();
    const opcionesSelect = cupos.map((cupo, index) => {
      return (
        <option key={index} value={cupo}>
          {cupo}
        </option>
      );
    });
    return opcionesSelect;
  };

  const updateSelect = (e) => {
    const value = e.target.value;
    setNumParticipantesPorUsuario(value);
  };

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
              Te has unido con {participante.cantidad} participante/s
            </li>
          );
        } else {
          return (
            <li key={index}>
              {participante.nombre} con {participante.cantidad} participante/s
            </li>
          );
        }
      });
    }
    return participantes;
  };

  const comprobarUsuarioEnEvento = () => {
    let usuarioEnEvento = eventoEscojido.participantes.find(
      (participante) => participante.id == localStorage.getItem("usuario")
    );
    return usuarioEnEvento != undefined;
  };

  const noHaycupos = () => {
    return (
      <div>
        <hr></hr>
        <p>
          <strong>No hay cupos disponibles para unirse a este evento</strong>
        </p>
      </div>
    );
  };

  const unirse = () => {
    return (
      <div>
        <hr></hr>
        <div className="input-group">
          <select
            className="form-select"
            onChange={updateSelect}
            value={numParticipantesPorUsuario}
          >
            <option value="Añadir participantes">Añadir participantes</option>
            {llenarOpcionesSelect()}
          </select>
          <button
            id="buttonAñadirse"
            className="btn"
            disabled={deshabilitado}
            onClick={onUnirse}
            type="submit"
          >
            Unirse
          </button>
        </div>
      </div>
    );
  };

  const noHayCuposRetirarse = () => {
    return (
      <div>
        {noHaycupos()}
        {retirarse()}
      </div>
    );
  };

  const retirarse = () => {
    return (
      <div>
        <hr></hr>
        <button
          id="buttonRetirarse"
          className="btn btn-warning"
          onClick={() => {
            onRetirarse();
          }}
          type="submit"
        >
          Retirarse
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (numParticipantesPorUsuario !== "") {
      setDeshabilitado(false);
    } else {
      setDeshabilitado(true);
    }
  });

  const onUnirse = () => {
    unirseEvento(eventoId, numParticipantesPorUsuario)
      .then((data) => {
        setTextoModal(
          "Se ha añadido la participación del usuario al evento con exito."
        );
        setTituloModal("Unirme a este evento");
        setModal(true);
      })
      .catch((error) => {
        console.log("error " + error);
        const errorStr = JSON.stringify(error);
        console.log(errorStr);
        setTextoModal(error.message);
        setTituloModal("Unirme a este evento");
        setModal(true);
      });
  };

  const onRetirarse = () => {
    retirarseDeEvento(eventoId)
      .then((data) => {
        setTextoModal(
          "Se ha retirado la participación del usuario a este evento."
        );
        setTituloModal("Retirarme de este evento");
        setModal(true);
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
        setTextoModal(error.message);
        setModal(true);
        setTituloModal("Retirarme de este evento");
      });
  };

  const pintarBotonesRetiroUnirse = () => {
    if (eventoEscojido.estado != "Lleno" && comprobarUsuarioEnEvento()) {
      return retirarse();
    } else if (
      eventoEscojido.estado != "Lleno" &&
      !comprobarUsuarioEnEvento()
    ) {
      return unirse();
    } else if (eventoEscojido.estado == "Lleno" && comprobarUsuarioEnEvento()) {
      return noHayCuposRetirarse();
    } else if (
      eventoEscojido.estado == "Lleno" &&
      !comprobarUsuarioEnEvento()
    ) {
      return noHaycupos();
    }
  };

  const esEventoFuturo = (fecha) => {
    const tiempoTrans = Date.now();
    const fechaActual = new Date(tiempoTrans);
    const fechaEvento = new Date(fecha);
    return fechaActual < fechaEvento;
  };

  let date = moment(eventoEscojido.fecha_y_hora).format("DD/MM/YYYY - HH:mm");

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="mt-5 mb-5">
          <h2 id="h2CrearEvento">Detalles de este evento</h2>
          <hr></hr>
          <div>
            <div className="container">
              <div className="row row-cols-2 m-5">
                <div className="col mt-3">
                  <img
                    src={eventoEscojido.actividad.imagen}
                    className="img-fluid rounded-start unirseImg"
                  />
                </div>
                <div className="col mt-3">
                  <h5>
                    <strong>{eventoEscojido.actividad.nombre}</strong>
                  </h5>
                  <hr></hr>
                  <p>
                    <strong>Fecha:</strong> {eventoEscojido.fecha_y_hora}
                  </p>
                  <p>
                    <strong>Creador:</strong> {eventoEscojido.creador.nombre}
                  </p>
                  <p>
                    <strong>Descripción:</strong>{" "}
                    {eventoEscojido.actividad.descripcion}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {eventoEscojido.direccion}
                  </p>
                  <div className="row">
                    <div className="col-3">
                      <p>
                        <strong> Se ha unido:</strong>
                      </p>
                    </div>
                    <div className="col-9">
                      <ul>{participantesEvento()}</ul>
                    </div>
                  </div>
                  <hr></hr>
                  {eventoEscojido.estado == "Cancelado" ||
                  !esEventoFuturo(eventoEscojido.fecha_y_hora) ? (
                    <p>
                      <strong>Este evento ya no está disponible</strong>
                    </p>
                  ) : (
                    pintarBotonesRetiroUnirse()
                  )}
                </div>
              </div>
              <hr></hr>
              <br></br>
              <div className="row row-cols-5 text-center">
                {!esEventoFuturo(eventoEscojido.fecha_y_hora) ? (
                  <p>Estado: Cerrado</p>
                ) : (
                  <p>Estado: {eventoEscojido.estado}</p>
                )}
                <p>
                  Tipo de actividad:{" "}
                  {eventoEscojido.actividad.tipo_de_actividad}
                </p>
                <p>
                  Cantidad máxima de participantes:{" "}
                  {eventoEscojido.maximo_participantes}
                </p>
                <p>Cupos disponibles: {eventoEscojido.cupos_disponibles}</p>
                <p>
                  Rango de edad: {eventoEscojido.edad_minima} -{" "}
                  {eventoEscojido.edad_maxima}
                </p>
              </div>
              <hr></hr>
            </div>
          </div>
        </div>
        {/* ................................MODAL.......................................................*/}
        <Modal
          show={modal}
          onHide={() => setModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{tituloModal}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoModal}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => navigate("/eventos")}>
              Ir a eventos
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
