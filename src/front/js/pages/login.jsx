import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HOSTNAME } from "../component/config";
import { Context } from "../store/appContext.js";
import { Navbar } from "../component/navbar.jsx";
import "../../styles/login.css";

export const Login = (props) => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const updateText = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const onSave = async () => {
    if (email === "" || password === "" || password.length < 4) {
      // ACTUALMENTE CONTRASEÑA 4, CAMBIAR MAS ADELANTE.
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
      const data = await resp.json();
      localStorage.setItem("token", data.data);
      // console.log(data)

      if (localStorage.getItem("token") !== "") {
        localStorage.setItem("usuario",data.usuario_id)
        navigate("/homecardgroup");
      } else {
        // cambie este navigate, layout estaba con "p" no con "P" y me estaba dando problemas
        navigate("/zonaprivada");
      }
    }
  };

  return (
    <>
    <Navbar/>
      <div className="container" id="containerLogin">
        <form id="inputLogin">
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                onChange={(e) => updateText(e, setEmail)}
                value={email}
                type="email"
                className="form-control"
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Contraseña</label>
            <div className="col-sm-10">
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
            className="btn btn-info"
            id="buttonLogin"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </>
  );
};
