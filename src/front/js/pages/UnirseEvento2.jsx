import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import DateTimePicker from "react-datetime-picker";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { DateTime } from "react-datetime-bootstrap";
import "../../styles/unirseEvento.css";
import { HOSTNAME } from "../component/config";
import { unirseEvento } from "../api.js";
import { object } from "prop-types";
import { Navbar } from "../component/navbar.jsx";
import moment from "moment";

export const UnirseEvento2 = (props) => {
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

  //mostrando opciones de selecion basado en cupos disponibles
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
        setModal(true);
      })
      .catch((error) => {
        console.log("error " + error);
        const errorStr = JSON.stringify(error);
        console.log(errorStr);
        setTextoModal(error.message);
        setModal(true);
      });
  };
  let date = moment(eventoEscojido.fecha_y_hora).format("DD/MM/YYYY - HH:mm");

  return (
    <>
      <Navbar />
      <div className="container" id="unirseEvento">
        <div className="mt-3">
          <div>
            <h1>Detalles de este evento</h1>
          </div>
          <hr></hr>

          <div className="row row-cols-3 m-4">
            <div className="col mt-3">
              <h5>{eventoEscojido.actividad.nombre}</h5>
              <hr></hr>
              {/* <p>{date}</p> */}
              <p>Dirección: {eventoEscojido.direccion}</p>
              <p>Creador: {eventoEscojido.creador.nombre}</p>
              {/* <p>Actividad: {eventoEscojido.actividad.nombre}</p> */}
              <p>Descripción: {eventoEscojido.actividad.descripcion}</p>

              
            </div>

            <div className="col mt-3">
              <img
                src={eventoEscojido.actividad.imagen}
                className="img-fluid rounded-start unirseImg"
              />
            </div>

            <div className="col mt-3">
              <h5>{date}</h5>
              <hr></hr>
              <p>Estado: {eventoEscojido.estado}</p>
              <p>
                {" "}
                Tipo de actividad: {eventoEscojido.actividad.tipo_de_actividad}
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
              {eventoEscojido.estado != "Lleno" ? (
                <div className="input-group">
                  <select
                    className="form-select"
                    onChange={updateSelect}
                    value={numParticipantesPorUsuario}
                  >
                    <option value="Añadir participantes">
                      Añadir participantes
                    </option>
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
              ) : (
                <p>
                  <strong>
                    No hay cupos disponibles para unirse a este evento
                  </strong>
                </p>
              )}
            </div>

            {/* <div className="col mt-3">
              <p>Estado: {eventoEscojido.estado}</p>
              <p>
                {" "}
                Tipo de actividad: {eventoEscojido.actividad.tipo_de_actividad}
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
            </div> */}
          </div>
          
          
        </div>

        {/* ................................MODAL....................................................... */}
        <Modal
          show={modal}
          onHide={() => setModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Unirme a este evento</Modal.Title>
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
