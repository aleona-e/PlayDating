import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import { DateTime } from "react-datetime-bootstrap";
import "../../styles/crearEvento.css";
import { HOSTNAME } from "../component/config";
import { useNavigate } from "react-router-dom";

export const CrearEvento = (props) => {
  const navigate = useNavigate();
    useEffect (() => {
      if (!localStorage.token) {

        navigate("/zonaPrivada");
      } 
      else {

      }
    }
  ,[]);
     
 
  // ..................llegan por PROPS..................................
  const actividad = "Juegos de agua";
  const actividad_id = 1;
  const descripcion =
    "Planea refrescantes juegos de agua en verano para tus hijos y sus nuevos amigos. Cada participante lleva los implementos necesarios. Tú eliges el lugar. Cada participante requiere de la compañia de un adulto responsable.";
  // .................. FIN llegan por PROPS.....................................

  // inputs a rellenar por usuario
  const [direccion, setDireccion] = useState("");
  const [edad_maxima, setEdadMaxima] = useState("");
  const [edad_minima, setEdadMinima] = useState("");
  const [maximo_participantes, setMaxParticipantes] = useState("");
  const [minimo_participantes, setMinParticipantes] = useState("");
  const [participantes_creador, setAñadirParticipantes] = useState("");
  const [fecha_y_hora, setfechayhora] = useState(new Date());

  //ciclo de vida de boton.
  const [deshabilitado, setDeshabilitado] = useState(true);

  const updateText = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  useEffect(() => {
    if (
      direccion !== "" &&
      edad_maxima !== "" &&
      edad_minima !== "" &&
      maximo_participantes !== "" &&
      minimo_participantes !== "" &&
      fecha_y_hora !== ""
    ) {
      setDeshabilitado(false);
    } else {
      setDeshabilitado(true);
    }
  });

  const onSave = async () => {
    const body = JSON.stringify({
      actividad_id,
      direccion,
      fecha_y_hora,
      edad_maxima,
      edad_minima,
      participantes_creador,
      maximo_participantes,
      minimo_participantes,
    });
    console.log(body);

    const resp = await fetch(HOSTNAME + "/crear/evento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body,
    });
    const data = await resp.json();
  };

  return (
    <>
      <h2 id="h2CrearEvento">Crea tu Evento</h2>
      <div className="container " id="containerCrearEvento">
        <div className="row   g-3">
          {/* ................................COLUMNA IZQUIERDA....................................................... */}
          <div className="col-6 col-md-6">
            <h2 id="h2CrearEvento"> {actividad} </h2>

            <img
              id="imgCrearEvento"
              src="https://img.freepik.com/foto-gratis/casa-escalera-azul-hermosa-reflexion_1203-4859.jpg?w=2000"
              alt=""
            />
            <div className="mb-3">
              <p id="descripcionCrearEvento"> {descripcion} </p>
            </div>
          </div>

          <div className="col-6 col-md-6 " id="columnaDerecha">
            {/* ................................DIRECCION....................................................... */}
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

            {/* ................................PARTICIPANTES....................................................... */}

            <label className="col col-form-label">Añadir Participantes</label>
            <div className="input-sm mb-2 d-flex" id="input-group-crear-evento">
              <input
                onChange={(e) => updateText(e, setAñadirParticipantes)}
                value={participantes_creador}
                type="number"
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
                  aria-label="First name"
                  className="form-control"
                  placeholder="Max"
                  required
                ></input>
                <input
                  onChange={(e) => updateText(e, setMinParticipantes)}
                  value={minimo_participantes}
                  type="number"
                  aria-label="Last name"
                  className="form-control"
                  placeholder="Min"
                  required
                ></input>
              </div>
              {/* ..................................EDAD....................................................... */}
              <label className="col-sm-2 col-form-label">Edad</label>
              <div
                className="input-sm mb-2 d-flex"
                id="input-group-crear-evento"
              >
                <input
                  onChange={(e) => updateText(e, setEdadMaxima)}
                  value={edad_maxima}
                  type="number"
                  aria-label="First name"
                  className="form-control"
                  placeholder="Max"
                  required
                ></input>
                <input
                  onChange={(e) => updateText(e, setEdadMinima)}
                  value={edad_minima}
                  type="number"
                  aria-label="Last name"
                  className="form-control"
                  placeholder="Min"
                  required
                ></input>
              </div>
            </form>
            {/* ................................FECHA Y HORA....................(para validar "required").......................... */}

            <form className="was-validated">
              <label className="col-sm-3 col-form-label">Fecha y Hora</label>
              <div>
                <DateTimePicker onChange={setfechayhora} value={fecha_y_hora} />
              </div>
            </form>
          </div>

          {/* .......................................BOTON ..................................................................... */}
        </div>
        <div className="mb-3 text-center">
          <button
            disabled={deshabilitado}
            onClick={onSave}
            id="buttonCrearEvento"
            className="btn btn-warning"
            type="submit"
          >
            Crear Evento
          </button>
        </div>
      </div>
    </>
  );
};

