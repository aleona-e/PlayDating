import React from "react";


export const Register = () => {
  return (
    <>
      <div className="container" id="containerRegister">
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control"></input>
          </div>
          <div className="col-md-6">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control"></input>
          </div>
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input type="email" className="form-control"></input>
          </div>
          <div className="col-md-6">
            <label className="form-label">Apellido</label>
            <input type="text" className="form-control"></input>
          </div>

          <div className="row g-3">
            <div className="col-sm-7">
              <label className="form-label">Hijo 1</label>
              <input type="text" className="form-control"></input>
            </div>
            <div className="col-sm">
              <label className="form-label">Edad</label>
              <input type="text" className="form-control"></input>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label">Provincia</label>
            <select className="form-select">
            <option selected>Álava</option>
              <option selected>Albacete</option>
              <option selected>Alicante</option>
              <option selected>Almería</option>
              <option selected>Asturias</option>
              <option selected>Ávila</option>
              <option selected>Badajoz</option>
              <option selected>Barcelona</option>
              <option selected>Burgos</option>
              <option selected>Cáceres</option>
              <option selected>Cádiz</option>
              <option selected>Cantabria</option>
              <option selected>Castellón</option>
              <option selected>Ciudad Real</option>
              <option selected>Córdoba</option>
              <option selected>A Coruña</option>
              <option selected>Cuenca</option>
              <option selected>Girona</option>
              <option selected>Granada</option>
              <option selected>Guadalajara</option>
              <option selected>Gipuzkoa</option>
              <option selected>Huelva</option>
              <option selected>Huesca</option>
              <option selected>Illes Balears</option>
              <option selected>Jaén</option>
              <option selected>León</option>
              <option selected>Lleida</option>
              <option selected>Lugo</option>
              <option selected>Madrid</option>
              <option selected>Málaga</option>
              <option selected>Murcia</option>
              <option selected>Navarra</option>
              <option selected>Ourense</option>
              <option selected>Palencia</option>
              <option selected>Las Palmas</option>
              <option selected>Pontevedra</option>
              <option selected>La Rioja</option>
              <option selected>Segovia</option>
              <option selected>Sevilla</option>
              <option selected>Soria</option>
              <option selected>Tarragona</option>
              <option selected>Santa Cruz de Tenerife</option>
              <option selected>Teruel</option>
              <option selected>Toledo</option>
              <option selected>Valencia</option>
              <option selected>Valladolid</option>
              <option selected>Bizkaia</option>
              <option selected>Zamora</option>
              <option selected>Zaragoza</option>
            </select>
          </div>

          <div className="col-12">
            <button id="buttonRegister" type="submit" className="btn btn-info">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
