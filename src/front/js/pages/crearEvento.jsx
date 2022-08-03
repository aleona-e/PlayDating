import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import DateTimePicker from "react-datetime-picker";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crearEvento.css";
import { HOSTNAME } from "../component/config";
import { Navbar } from "../component/navbar.jsx";


export const CrearEvento = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/zonaprivada");
    } else {
    }
  }, []);

  const { store } = useContext(Context);
  const { actividadId } = useParams();
  const actividadEscojida = store.actividades.find(
    (actividad) => actividadId == actividad.id
  );

  // inputs a rellenar por usuario
  const [direccion, setDireccion] = useState("");
  const [edad_maxima, setEdadMaxima] = useState("");
  const [edad_minima, setEdadMinima] = useState("");
  const [maximo_participantes, setMaxParticipantes] = useState("");
  const [minimo_participantes, setMinParticipantes] = useState("");
  const [participantes_creador, setAñadirParticipantes] = useState("");
  const [fecha_y_hora, setfechayhora] = useState(new Date());

  const [deshabilitado, setDeshabilitado] = useState(true);

  const [modal, setModal] = useState(false);

  const updateText = (e, setState) => {
    const value = e.target.value;

    setState(value);
  };

  const fechaDeHoy = () => {
    const tiempoTrans = Date.now();
    const fechaActual = new Date(tiempoTrans);
    return fechaActual
  };

  useEffect(() => {
    if (
      direccion !== "" &&
      edad_maxima !== "" &&
      edad_minima !== "" &&
      maximo_participantes !== "" &&
      maximo_participantes !== "0" &&
      parseInt(maximo_participantes) >= parseInt(minimo_participantes) &&
      minimo_participantes !== "" &&
      minimo_participantes !== "0" &&
      fecha_y_hora !== "" &&
      fecha_y_hora > fechaDeHoy()
    ) {
      setDeshabilitado(false);
    } else {
      setDeshabilitado(true);
    }
  });

  const onSave = async () => {
    const body = JSON.stringify({
      actividad_id: actividadEscojida.id,
      direccion,
      fecha_y_hora,
      edad_maxima,
      edad_minima,
      participantes_creador,
      maximo_participantes: parseInt(maximo_participantes),
      minimo_participantes: parseInt(minimo_participantes),
    });

    const resp = await fetch(HOSTNAME + "/crear/evento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body,
    });
    const data = await resp.json();
    if (resp.ok) {
      setModal(true);
    }
  };

  return (
    <>
      <Navbar />
      <h2 id="h2CrearEvento">Crea tu Evento</h2>
      <div className="container " id="containerCrearEvento">
        <div className="row   g-3">
          <div className="col-6 col-md-6">
            <h3 id="NombreActividadEvento"> {actividadEscojida.nombre} </h3>
            <img id="imgCrearEvento" src={actividadEscojida.imagen} alt="" />
            <div className="mb-3">
              <p id="descripcionCrearEvento">{actividadEscojida.descripcion}</p>
            </div>
          </div>
          <div className="col-6 col-md-6 " id="columnaDerecha">
            <form className="was-validated ">
              <div className="mb-2">
                <label className="form-label">Dirección</label>
                <input
                  onChange={(e) => updateText(e, setDireccion)}
                  value={direccion}
                  type="text"
                  className="form-control"
                  aria-describedby="addon-wrapping"
                  required
                ></input>
              </div>
            </form>

            <label className="col col-form-label">Añadir Participantes</label>
            <div className="input-sm mb-2 d-flex" id="input-group-crear-evento">
              <input
                onChange={(e) => updateText(e, setAñadirParticipantes)}
                value={participantes_creador}
                type="number"
                min="1"
                aria-label="First name"
                className="form-control"
              ></input>
            </div>
            <form className="was-validated">
              <label className="col-sm-2 col-form-label">Participantes</label>
              <div
                className="input-sm mb-2 d-flex"
                id="input-group-crear-evento"
              >
                <input
                  onChange={(e) => updateText(e, setMaxParticipantes)}
                  value={maximo_participantes}
                  type="number"
                  min="2"
                  aria-label="First name"
                  className="form-control"
                  placeholder="Max"
                  required
                ></input>
                <input
                  onChange={(e) => updateText(e, setMinParticipantes)}
                  value={minimo_participantes}
                  type="number"
                  min="1"
                  aria-label="Last name"
                  className="form-control"
                  placeholder="Min"
                  required
                ></input>
              </div>

              <label className="col-sm-2 col-form-label">Edad</label>
              <div
                className="input-sm mb-2 d-flex"
                id="input-group-crear-evento"
              >
                <input
                  onChange={(e) => updateText(e, setEdadMaxima)}
                  value={edad_maxima}
                  type="number"
                  min="1"
                  aria-label="First name"
                  className="form-control"
                  placeholder="Max"
                  required
                ></input>
                <input
                  onChange={(e) => updateText(e, setEdadMinima)}
                  value={edad_minima}
                  type="number"
                  min="0"
                  aria-label="Last name"
                  className="form-control"
                  placeholder="Min"
                  required
                ></input>
              </div>
            </form>

            <form className="was-validated">
              <label className="col-sm-3 col-form-label">Fecha y Hora</label>
              <div>
                <DateTimePicker onChange={setfechayhora} value={fecha_y_hora} minDate={new Date()} />
              </div>
            </form>
          </div>
        </div>
        <div className="mb-5 pb-3 text-center">
          <button
            disabled={deshabilitado}
            onClick={onSave}
            id="buttonCrearEvento"
            className="btn"
            type="submit"
          >
            Crear Evento
          </button>
        </div>

        <Modal
          show={modal}
          onHide={() => setModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Evento Creado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tu evento se ha añadido a la lista de eventos.
          </Modal.Body>
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
