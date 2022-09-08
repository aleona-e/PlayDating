import React, { useContext, useState } from "react";
import propTypes from "prop-types";
import "../../styles/cardEvento.css";
import "../../styles/modal.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { retirarseDeEvento } from "../api.js";
import { HOSTNAME } from "./config";
import moment from "moment";

export const CardEvento = (props) => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [textoModal, setTextoModal] = useState("");

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
    const json = await response.json();
    setTextoModal("Se ha cancelado este evento.");
    setModal1(false);
    setModal2(true);
  };
  const onRetirarse = () => {
    retirarseDeEvento(props.evento_id)
      .then((data) => {
        setModal1(false);
        setTextoModal(
          "Se ha retirado la participación del usuario a este evento."
        );
        setModal2(true);
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
        setTextoModal(error.message);
        setModal2(true);
      });
  };

  let date = moment(props.fecha_y_hora).format("DD/MM/YYYY - HH:mm");

  return (
    <>
      <div className="card-group">
        <div className="col">
          <div className="card text-center">
            <img
              className="card-img-top img-fluid rounded"
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
                      onClick={() => {
                        setModal1(true);
                        setTextoModal(
                          "¿Estás seguro de que quieres cancelar este evento?"
                        );
                      }}
                      id="buttonCancelarEvento"
                      href="#"
                      className="btn m-1"
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
                    {props.estado !== "Cancelado" &&
                      props.estado !== "Cerrado" && (
                        <button
                          id="buttonCancelarEvento"
                          className="btn m-1"
                          onClick={() => {
                            setModal3(true);
                            setTextoModal(
                              "¿Estás seguro de que quieres retirar tu participación de este evento?"
                            );
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
        {/*--------------MODAL CANCELAR EVENTO-----------------*/}
        <Modal show={modal1} onHide={() => setModal1(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Cancelar este evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoModal}</Modal.Body>
          <Modal.Footer>
            <Button
            className="botonmodalazul"
            variant="botonmodalazul"
            onClick={() => {
                onCancel();
              }}
            >
              Confirmar
            </Button>
            <Button
            className="botonmodalrojo"
            variant="botonmodalrojo"
             onClick={() => {
                setModal1(false);
              }}
            >
              Cancelar
            </Button>
          </Modal.Footer>
          {/*--------------MODAL CONFIRMACION-----------------*/}
        </Modal>
        <Modal show={modal2} onHide={() => setModal2(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles de este evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoModal}</Modal.Body>
          <Modal.Footer>
            <Button
               className="botonmodalazul"
               variant="botonmodalazul"
              onClick={() => {
                window.location.reload(false);
              }}
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
        {/*--------------MODAL RETIRO EVENTO----------------*/}
        <Modal show={modal3} onHide={() => setModal3(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Retirarme de este evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoModal}</Modal.Body>
          <Modal.Footer>
            <Button
               className="botonmodalazul"
               variant="botonmodalazul"
              onClick={() => {
                onRetirarse();
              }}
            >
              Confirmar
            </Button>
            <Button
              className="botonmodalrojo"
              variant="botonmodalrojo"
              onClick={() => {
                setModal3(false);
              }}
            >
              Cancelar
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
