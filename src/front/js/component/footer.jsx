import React, { Component } from "react";
import Github from "../../img/Github.png";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer mt-auto py-3 text-center">
    <p className="mt-3">
      {" "}
      Creado por:
      <a id="linkfooter" href="https://github.com/isarebollo">
        {" "}
        Isabel Rebollo{" "}
      </a>
      <img id="logoGithub" src={Github} />
      <a id="linkfooter" href="https://github.com/aleona-e">
        Alejandra Elsin{" "}
      </a>
      <img id="logoGithub" src={Github} />
      <a id="linkfooter" href="https://github.com/Vero2112">
        Verónica Rodríguez
      </a>
      <img id="logoGithub" src={Github} />
    </p>
  </footer>
);
