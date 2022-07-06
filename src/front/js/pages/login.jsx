import React from "react";

export const Login = () => {
  return (
    <>
      <div className="modal-wrapper" id="popup">
        <div className="popup-contenedor">
          <h2 >Login</h2>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control"></input>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control"></input>
            </div>
          </div>
          <button type="button" class="btn btn-outline-info">Aceptar</button>
          <a className="popup-cerrar" href="#popup">
            X
          </a>
        </div>
      </div>
    </>
  );
};
