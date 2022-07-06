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
              <option selected>BARCELONA</option>
              <option selected>MADRID</option>
              <option selected>VALENCIA</option>
              <option selected>VIGO</option>
              <option selected>TENERIFE</option>
              <option selected>TARRAGONA</option>
              <option selected>MALAGA</option>
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
