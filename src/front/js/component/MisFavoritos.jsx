import React, { useState } from "react";
import "../../styles/index.css";

export const MisFavoritos = () => {
    return (
        <>
        <div className="container mx-auto" id="favoritosPerfil">
        <h4>Mis Favoritos</h4>
        <ul>
            <li>Usuario 1</li>
            <li>Usuario 2</li>
            <li>Usuario 3</li>
            <li>Usuario 4</li>
        </ul>
        </div>
        </>
    )
}