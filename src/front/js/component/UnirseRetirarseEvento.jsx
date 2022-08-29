import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crearEvento.css";
import "../../styles/cardEvento.css";
import { unirseEvento, retirarseDeEvento } from "../api.js";
import { useNavigate } from "react-router-dom";

export const UnirseRetirarseEvento = (props) => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const eventoId = props.eventoId;
  const eventoEscojido = store.eventos.find((evento) => eventoId == evento.id);
  const [numParticipantesPorUsuario, setNumParticipantesPorUsuario] =
    useState("");
  const [deshabilitado, setDeshabilitado] = useState(true);
  const [modal, setModal] = useState(false);
  const [textoModal, setTextoModal] = useState("");
  const [tituloModal, setTituloModal] = useState("");

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
          id="buttonCancelarEvento"
          className="btn"
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
        const errorStr = JSON.stringify(error);

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

  return (
    <>
      {eventoEscojido.estado == "Cancelado" ||
      !esEventoFuturo(eventoEscojido.fecha_y_hora) ? (
        <p>
          <strong>Este evento ya no está disponible</strong>
        </p>
      ) : (
        pintarBotonesRetiroUnirse()
      )}
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
    </>
  );
};
