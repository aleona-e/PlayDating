import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HOSTNAME } from "../component/config";
import { Navbar } from "../component/navbar.jsx";
import "../../styles/login.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const onSave = async () => {
    if (email === "" || password === "" || password.length < 4) {
    } else {
      const body = JSON.stringify({
        email,
        password,
      });

      const resp = await fetch(HOSTNAME + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body,
      });

      console.log({ resp });
      if (!resp.ok) {
        modalManager("Error en el servidor", false);
      }
      const data = await resp.json();

      if (data.data !== undefined) {
        localStorage.setItem("token", data.data);
        localStorage.setItem("usuario", data.usuario_id);
        navigate("/homecardgroup");
      } else {
        modalManager("El usuario no existe", true);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container pagina d-flex align-items-center">
        <div className="col-6 mx-auto" id="containerLogin">
          <form id="inputLogin">
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <input
                  onChange={(e) => updateText(e, setEmail)}
                  value={email}
                  type="email"
                  className="form-control"
                ></input>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-md-3 col-form-label">Contraseña</label>
              <div className="col-sm-9">
                <input
                  onChange={(e) => updateText(e, setPassword)}
                  value={password}
                  type="password"
                  className="form-control"
                ></input>
              </div>
            </div>

            <button
              onClick={onSave}
              type="button"
              className="btn"
              id="buttonLogin"
            >
              Iniciar Sesión
            </button>
          </form>
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
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoAlerta}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                if (navegar) {
                  navigate("/register");
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
