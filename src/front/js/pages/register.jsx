import { resetWarningCache } from "prop-types";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css";
import { HOSTNAME } from "../component/config";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Navbar } from "../component/navbar.jsx";

export const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState(""); //nombre completo
  const [numero_hijos, setNumero_hijos] = useState("");
  const [provincia, setProvincia] = useState("");

  const [textoAlerta, setTextoAlerta] = useState("");
  const [navegar, setNavegar] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateText = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const modalManager = (texto, canNavigate) => {
    setTextoAlerta(texto);
    setNavegar(canNavigate);
    handleShow();
  };

  const onSave = async (e) => {
    e.preventDefault(); //contarselo a ALE y vero

    const body = JSON.stringify({
      email,
      password,
      nombre,
      numero_hijos,
      provincia,
    });

    const resp = await fetch(HOSTNAME + "/nuevo/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!resp.ok) {
      modalManager("Error al conectar con el Servidor", false);
    }

    const data = await resp.json();

    console.log("resp" + resp);
    console.log("data" + data);

    if (data.message === "Usuario creado exitosamente") {
      modalManager(data.message, true);
    } else {
      modalManager(data.message, false);
    }
  };

  return (
    <>
      <Navbar />
      <h1>REGISTRO</h1>
      <div className="container" id="containerRegister">
        <form className="row g-3 was-validated">
          <div className="col-md-12">
            <label className="form-label ">Nombre Completo</label>
            <input
              onChange={(e) => updateText(e, setNombre)}
              value={nombre}
              type="text"
              className="form-control"
              required
            ></input>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                onChange={(e) => updateText(e, setEmail)}
                value={email}
                type="email"
                className="form-control "
                required
              ></input>
            </div>
            <div className="col-md-6">
              <label className="form-label">Contraseña</label>
              <input
                onChange={(e) => updateText(e, setPassword)}
                value={password}
                type="password"
                className="form-control"
                required
              ></input>
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Numero Hijos</label>
            <input
              onChange={(e) => updateText(e, setNumero_hijos)}
              value={numero_hijos}
              type="number" min="1"
              className="form-control"
              required
            ></input>
          </div>

          <div className="col-md-4">
            <label className="form-label">Provincia</label>
            <select
              onChange={(e) => updateText(e, setProvincia)}
              value={provincia}
              className="form-select"
              required
            ><option defaultValue=""></option>
              <option value="Álava">Álava</option>
              <option value="Albacete">Albacete</option>
              <option value="Alicante">Alicante</option>
              <option value="Almería">Almería</option>
              <option value="Asturias">Asturias</option>
              <option value="Ávila">Ávila</option>
              <option value="Badajoz">Badajoz</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Burgos">Burgos</option>
              <option value="Cáceres">Cáceres</option>
              <option value="Cádiz">Cádiz</option>
              <option value="Cantabria">Cantabria</option>
              <option value="Castellón">Castellón</option>
              <option value="Ciudad Real">Ciudad Real</option>
              <option value="Córdoba">Córdoba</option>
              <option value="A Coruña">A Coruña</option>
              <option value="Cuenca">Cuenca</option>
              <option value="Girona">Girona</option>
              <option value="Granada">Granada</option>
              <option value="Guadalajara">Guadalajara</option>
              <option value="Gipuzkoa">Gipuzkoa</option>
              <option value="Huelva">Huelva</option>
              <option value="Huesca">Huesca</option>
              <option value="Illes Balears">Illes Balears</option>
              <option value="Jaén">Jaén</option>
              <option value="León">León</option>
              <option value="Lleida<">Lleida</option>
              <option value="Lugo">Lugo</option>
              <option value="Madrid">Madrid</option>
              <option value="Málaga">Málaga</option>
              <option value="Murcia">Murcia</option>
              <option value="Navarra">Navarra</option>
              <option value="Ourense">Ourense</option>
              <option value="Palencia">Palencia</option>
              <option value="Las Palmas">Las Palmas</option>
              <option value="Pontevedra">Pontevedra</option>
              <option value="La Rioja">La Rioja</option>
              <option value="Segovia">Segovia</option>
              <option value="Sevilla">Sevilla</option>
              <option value="Soria">Soria</option>
              <option value="Tarragona">Tarragona</option>
              <option value="Santa Cruz de Tenerife">
                Santa Cruz de Tenerife
              </option>
              <option value="Teruel">Teruel</option>
              <option value="Toledo">Toledo</option>
              <option value="Valencia">Valencia</option>
              <option value="Valladolid">Valladolid</option>
              <option value="Bizkaia">Bizkaia</option>
              <option value="Zamora">Zamora</option>
              <option value="Zaragoza">Zaragoza</option>
            </select>
          </div>

          <div className="col-12">
            <button
              onClick={onSave}
              id="buttonRegister"
              type="submit"
              className="btn"
            >
              Save
            </button>
          </div>
        </form>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button> */}

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Registro</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoAlerta}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                if (navegar) {
                  navigate("/login");
                } else {
                  handleClose();
                }
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
