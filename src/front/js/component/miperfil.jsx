import React, { useEffect, useState, useContext } from "react";
import "../../styles/miPerfil.css";
import { HOSTNAME } from "./config.js";
import FormularioHijos from "./formulariohijos.jsx";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { config } from "./config.js";
import { Navbar } from "./navbar.jsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/modal.css";

export const MiPerfil = (props) => {

  const [numero_hijos, setNumero_hijos] = useState(1);
  const [provincia, setProvincia] = useState("");
  const { store, actions } = useContext(Context);
  const [datos, obtenerDatos] = useState({});
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

  useEffect(() => {
    const token = localStorage.getItem(config.jwt.nameToken);
    if (!token) {
      navigate("/");
    }
    fetch(HOSTNAME + "/perfil", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        obtenerDatos(data.data);
        setNumero_hijos(data.data.numero_hijos);
        setProvincia(data.data.provincia);
        props.notificarNombre(data.data.nombre)
      })
      .catch((e) => {
        console.error(e);
        navigate(`/`);
      });
  }, []);

  const updateText = (e, setState) => {
    const value = e.target.value;

    setState(value);
  };
  const onSave = async (e) => {
    const token = localStorage.getItem(config.jwt.nameToken);
    const body = JSON.stringify({
      numero_hijos,
      provincia,
    });
    const res = await fetch(HOSTNAME + "/perfil/modificar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    const json = await res.json();
    const data = json.data;

    obtenerDatos({
      ...datos,
      provincia: data.provincia,
      numero_hijos: data.numero_hijos,
    });
    if (res.status == 200) {
      modalManager(json.message, true);
    } else if (res.status !== 200) {
      modalManager(json.message, false);
    }
  };
  return (
    <>
      
      <div className="container-perfil">
      <div className="container" id="containerPerfil" >
        <div className="row g-1">
          <div className="col-md-6 my-4">
            <label className="form-label">Nombre Completo: </label>
            <span> {datos.nombre}</span>
          </div>
          <div className="col-md-6 my-4">
            <label className="form-label">Email: </label>
            <span> {datos.email}</span>
          </div>
          <div className="col-md-6">
            <label className="form-label">Tus hij@s</label>
            <div>
              <FormularioHijos />
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">¿Cuántos hijos tienes? </label>
            <div className="input-group mb-3">
              <input
                id="inputGuardarhijos"
                onChange={(e) => updateText(e, setNumero_hijos)}
                defaultValue={datos.numero_hijos}
                type="number"
                className="form-control"
              ></input>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Provincia</label>
            <select
              onChange={(e) => updateText(e, setProvincia)}
              className="form-select"
            >
              <option defaultValue={datos.provincia}>{datos.provincia}</option>
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
                {" "}
                Santa Cruz de Tenerife{" "}
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
          {/* -------------------------------------------------------------------------- */}
          <div className="col-12 my-3">
            <button
              onClick={onSave}
              id="buttonPerfil"
              type="submit"
              className="btn"
            >
              Guardar
            </button>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Mi Perfil</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoAlerta}</Modal.Body>
          <Modal.Footer>
            <Button
              className="botonmodalazul"
              variant="botonmodalazul"
              onClick={() => {
                if (navegar) {
                  location.reload();
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
      </div>
    </>
  );
};
