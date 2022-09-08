import React from "react";
import "../../styles/index.css";
import { eliminarComentario } from "../api.js";

export const ProximoEvento = () => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="bg-dark position-relative bd-example-toasts"
    >
      <div className="toast-container position-absolute p-3" id="toastPlacement">
        <div className="toast">
          <div className="toast-header">
            <img src="..." className="rounded me-2" alt="..." />
            <strong className="me-auto">Mis Eventos</strong>
            <small></small>
          </div>
          <div className="toast-body">Detalles de tu próximo evento</div>
        </div>
      </div>
    </div>
  );
};
