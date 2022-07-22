import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Register } from "./pages/register.jsx";

import { Login } from "./pages/login.jsx";
import { HomeCardGroup } from "./component/homecardgroup.jsx";
import { Actividades } from "./pages/actividades.jsx";
import { MisEventos } from "./component/miseventos.jsx";
import { MiPerfil } from "./component/miperfil.jsx";
import { CrearEvento } from "./pages/crearEvento.jsx";
import { UnirseEvento } from "./pages/unirseEvento.jsx";
import { Eventos } from "./pages/eventos.jsx";
import ZonaPrivada from "./pages/zonaPrivada.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Register />} path="/register" />
            <Route element={<Login />} path="/login" />
            <Route element={<ZonaPrivada />} path="/zonaprivada"/>
            <Route element={<HomeCardGroup />} path="/homecardgroup" />
            <Route element={<Actividades />} path="/actividades" />
            <Route element={<CrearEvento />} path="/crearevento/:actividadId" />
            <Route element={<UnirseEvento />} path="/unirseEvento/:eventoId" />
            <Route element={<Eventos />} path="/eventos" />
            <Route element={<MisEventos />} path="/miseventos" />
            <Route element={<MiPerfil />} path="/miperfil" />
           
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
