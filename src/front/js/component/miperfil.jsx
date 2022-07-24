import { resetWarningCache } from "prop-types";
import React, { useEffect, useState, useContext } from "react";
import "../../styles/register.css";
import { HOSTNAME } from "../component/config.js";
import FormularioHijos from "./formulariohijos.jsx";
import { Context } from "../store/appContext.js";
import { obtenerDatosperfil } from "../api.js";
import { useNavigate } from "react-router-dom";
import { config } from "../component/config.js";
import { Navbar } from "../component/navbar.jsx";

export const MiPerfil = () => {

  const [numero_hijos, setNumero_hijos] = useState(0);
  const [provincia, setProvincia] = useState("hola");
 
  const { store, actions } = useContext(Context)
  const [datos, obtenerDatos] = useState([]);
  const navigate = useNavigate()

  // OBTENER DATOS USUARIO
  useEffect(() => {
    const token = localStorage.getItem(config.jwt.nameToken);
    if (!token) {
      navigate("/login");
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

        console.log("soy la data", data.data);
        obtenerDatos(data.data)

      })
      .catch((e) => {
        console.error(e);
        navigate(`/zonaprivada`);

      });

  }, []);



  // MODIFICAR DATOS 


  const updateText = (e, setState) => {
    // if (value == datos.numero_hijos) 
    
    const value = e.target.value;
    console.log("soy la e: ",e)
    console.log("soy el numero de hijos: ", datos.numero_hijos )
   
    console.log("soy el nuevo value:", value)
    setState(value);
  };

  const onSave = async (e) => {
   
    const token = localStorage.getItem(config.jwt.nameToken);
    const body = JSON.stringify({

      numero_hijos,
      provincia
    });

    await fetch(HOSTNAME + "/perfil/modificar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });

  };

  const guardarnumerohijos = async (e) => {
   
    const token = localStorage.getItem(config.jwt.nameToken);
    const body = JSON.stringify({

      numero_hijos
    });

    await fetch(HOSTNAME + "/perfil/modificar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });

  };

return (
  <>
  <Navbar/>
    <div className="container" id="containerRegister">
      <div className="row g-3">
        <div className="col-md-12">
          <label className="form-label">Nombre Completo: </label>

          <h5>{datos.nombre}</h5>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Email</label>
            {/* <h5>{datos.email}</h5> */}
            <h5>{datos.provincia}</h5>
          </div>

          {/* <div className="col-md-6">
            <label className="form-label">Hijos</label>
            <h5>{datos.numero_hijos}</h5>
          </div> */}
        </div>

        <div className="col-md-6">
          <label className="form-label">Numero Hijos</label>
          <input
            onChange={(e) => updateText(e, setNumero_hijos)}
            // placeholder= {datos.numero_hijos}
            // value={numero_hijos}
            value={datos.numero_hijos}
            // defaultValue={datos.numero_hijos}
            type="number"
            className="form-control"

          ></input><button className="btn btn-info button" onClick={guardarnumerohijos} >Guardar</button>
        </div>

        <div className="col-md-6">
          <label className="form-label">Lista Hijos</label>
          <div><FormularioHijos /></div>
        </div>


         <div className="col-md-4">
            <label className="form-label">Provincia</label>
            <select
              onChange={(e) => updateText(e, setProvincia)}
              // value={provincia}
              // value={datos.provincia}
              // defaultValue={datos.provincia}
              className="form-select"
            >
              
              <option defaultValue= {datos.provincia}>{datos.provincia}</option> 
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
              <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
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
            // disabled={deshabilitado}
            onClick={onSave}
            id="buttonRegister"
            type="submit"
            className="btn btn-info button"
          >
            Save
          </button>
        </div>
      </div>
    </div>

  </>
);
};