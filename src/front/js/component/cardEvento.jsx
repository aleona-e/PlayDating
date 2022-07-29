import React, { useContext, useState } from "react";
import propTypes from "prop-types";
import "../../styles/cardEvento.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { HOSTNAME } from "./config";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const CardEvento = (props) => {
  const navigate = useNavigate();

  const [textoAlerta, setTextoAlerta] = useState("");
  const [navegar, setNavegar] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalManager = (texto, canNavigate) => {
    setTextoAlerta(texto);
    setNavegar(canNavigate);
    handleShow();
  };

  const onCancel = async () => {
    const response = await fetch(
      HOSTNAME + `/cancelarevento/${props.evento_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );

    if (!response.ok) {
      modalManager("Error al conectar con el Servidor", false);
    }

    const json = await response.json();

    if (json.message === "Evento cancelado exitosamente") {
      modalManager(json.message, true);
    } else {
      modalManager(json.message, false);
    }
  };

  let date = moment(props.fecha_y_hora).format("DD/MM/YYYY - HH:mm");

  return (
    <>
      <div className="card-group">
        <div className="col">
          <div className="card text-center">
            <img
              className="card-img-top imagenCard rounded"
              src={props.src}
              alt="Card image cap"
            ></img>
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              <hr></hr>
              <p className="card-text">{date}</p>
              <p className="card-text">{props.tipo}</p>
              <p className="card-text">
                Max participantes: {props.max_participantes}
              </p>
              <p className="card-text">
                Cupos disponibles: {props.cupos_disponibles}
              </p>
              {props.estado == "Cancelado" ? (
                <p className="card-text text-danger">{props.estado}</p>
              ) : (
                <p className="card-text">{props.estado}</p>
              )}
              {props.creador ==
              parseInt(localStorage.getItem("usuario"), 10) ? (
                <div className="card-footer bg-body">
                  <Link to={props.route}>
                    <button
                      id="buttonVerDetalles"
                      href="#"
                      className="btn"
                      role="button"
                    >
                      Ver Detalles
                    </button>
                  </Link>
                  {props.estado !== "Cancelado" && props.estado !== "Cerrado" && (
                    <button
                      onClick={onCancel}
                      href="#"
                      className="btn btn-danger m-1"
                      role="button"
                    >
                      Cancelar Evento
                    </button>
                  )}
                </div>
              ) : undefined !=
                props.participantes.find(
                  (participante) =>
                    participante.id == localStorage.getItem("usuario")
                ) ? (
                <div>
                  <div className="card-footer bg-body">
                    <Link to={props.route}>
                      <button
                        id="buttonVerDetalles"
                        href="#"
                        className="btn"
                        role="button"
                      >
                        Ver Detalles
                      </button>
                    </Link>
                    {!props.estado !== "Cancelado" &&
                      props.estado !== "Cerrado" && (
                        <button
                          className="btn btn-danger m-1"
                          onClick={() => {
                            props.notificarSolicitudRetiro(props.evento_id);
                          }}
                        >
                          Retirarse
                        </button>
                      )}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="card-footer bg-body">
                    <Link to={props.route}>
                      <button
                        id="buttonVerDetalles"
                        href="#"
                        className="btn"
                        role="button"
                      >
                        Ver Detalles
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Cancelar Evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoAlerta}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                handleClose, location.reload();
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
CardEvento.propTypes = {
  evento_id: propTypes.number,
  creador: propTypes.number,
  name: propTypes.string,
  src: propTypes.string,
  text: propTypes.string,
  tipo: propTypes.string,
  route: propTypes.string,
  max_participantes: propTypes.number,
  min_participantes: propTypes.number,
  estado: propTypes.string,
  fecha_y_hora: propTypes.string,
};
