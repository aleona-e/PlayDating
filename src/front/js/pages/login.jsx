import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOSTNAME } from "../component/config";


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

      
      const resp = await fetch(
        HOSTNAME +"/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
          },
          body,
        }
      );
      const data = await resp.json();
      localStorage.setItem("token", data);
      

      if (localStorage.getItem("token") !== "") {
        // console.log("acertaste");
        navigate("../miperfil", { replace: true });
      } else {
        console.log("sigue probando suerte"); // hay que cambiarlo por la ruta de la pagina de privado o registro, a decidir.
      }
    }
  };

  return (
    <>
      
      <div className="container" id="containerLogin">
        <form id="inputLogin">
          <div className="row mb-3" >
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input  onChange={(e) => updateText(e, setEmail)}
                value={email} type="email" className="form-control"></input>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input  onChange={(e) => updateText(e, setPassword)}
                value={password} type="password" className="form-control"></input>
            </div>
          </div>

          <button  onClick={onSave} type="button" className="btn btn-info" id="buttonLogin">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};
