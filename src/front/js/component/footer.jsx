import React, { Component } from "react";
import Github from "../../img/Github.png";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer mt-1 py-3 text-center">
    <p>
      <a id="linkfooter" href="https://github.com/isarebollo">
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
    </p>
  </footer>
);
