import React, { useState, useEffect, useContext } from "react";
import { CardEvento } from "../component/cardEvento.jsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { HOSTNAME } from "../component/config";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Navbar } from "../component/navbar.jsx";
import { retirarseDeEvento } from "../api.js";

export const Eventos = () => {
  const { store, actions } = useContext(Context);
  const [eventoIdRetiro, setEventoIdRetiro] = useState("");
  const [eventos, setEventos] = useState([]);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [textoModal, setTextoModal] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/zonaprivada");
    } else {
      const fetchData = async () => {
        const response = await fetch(HOSTNAME + "/eventos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        const json = await response.json();
        setEventos(json.data);
        actions.agregarEventos(json.data);
      };

      fetchData().catch((error) => {
        console.log(error);
      });
    }
  }, []);

  const onRetirarse = () => {
    console.log("esta entrando por aqui");
    console.log(eventoIdRetiro);
    retirarseDeEvento(eventoIdRetiro)
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

  const notificarSolicitudRetiro = (eventoId) => {
    setTextoModal(
      "¿Estás seguro de que quieres retirar tu participación de este evento?."
    );
    setModal1(true);
    setEventoIdRetiro(eventoId);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="text-center">
          <h1>EVENTOS</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-1 mb-5">
          {eventos.map((evento, index) => {
            if (evento.estado !== "Cancelado") {
              return (
                <div key={index}>
                  <CardEvento
                    forzarHeight={true}
                    evento_id={evento.id}
                    participantes={evento.participantes}
                    creador={evento.creador.id}
                    name={evento.actividad.nombre}
                    src={evento.actividad.imagen}
                    text={evento.actividad.descripcion}
                    tipo={evento.actividad.tipo_de_actividad}
                    cupos_disponibles={evento.cupos_disponibles}
                    max_participantes={evento.maximo_participantes}
                    estado={evento.estado}
                    fecha_y_hora={evento.fecha_y_hora}
                    route={"/unirseEvento/" + evento.id}
                    notificarSolicitudRetiro={notificarSolicitudRetiro}
                  />
                </div>
              );
            }
          })}
        </div>
        {/*--------------------Modal Confirmación retiro----------------------*/}
        <Modal show={modal1} onHide={() => setModal1(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Retirarme de este evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoModal}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                onRetirarse();
              }}
            >
              Confirmar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setModal1(false);
              }}
            >
              Cancelar
            </Button>
          </Modal.Footer>
          {/*--------------------Modal redirección despues de retiro----------------------*/}
        </Modal>
        <Modal show={modal2} onHide={() => setModal2(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Retirarme de este evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoModal}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                window.location.reload(false);
              }}
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
