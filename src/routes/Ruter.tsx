import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Producto from "../pages/producto/Menu.tsx";
//import DetalleInstrumento from "./componentes/DetalleInstrumento.tsx";
import Home from "../pages/Home.tsx";
import DondeEstamos from "../pages/DondeEstamos.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RutaPrivada } from "../controlAcceso/RutaPrivada.tsx";
import LoaderPage from "../Components/utiles/LoaderPage.tsx";
import { Roles } from "../entidades/Roles.tsx";
import RolUsuario from "../controlAcceso/RolUsuario.tsx";
import Login from "../Components/login/Login.tsx";
import Registro from "../Components/login/Registro.tsx";
//lazy -> técnica de carga diferida, el componente se carga cuando se necesita y NO desde el inicio
//ayudar a reducir el tiempo de carga inicial de la aplicación y a mejorar la velocidad de navegación

const GrillaInstrumento = lazy(
    () => import("../pages/GrillaInstrumento.tsx")
  );
  
  const TestLoad = lazy(() => import("../Components/utiles/TestLoad.tsx"));
  const Graficos = lazy(
    () => import("../pages/graficos/ChartsGoogle.tsx")
  );

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<LoaderPage></LoaderPage>}>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/registro" element={<Registro />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/menu"
            element={
              <RutaPrivada>
                <Producto />
              </RutaPrivada>
            }
          />

          <Route
            path="/home"
            element={
              <RutaPrivada>
                <Home />
              </RutaPrivada>
            }
          />
          <Route
            path="/DondeEstamos"
            element={
              <RutaPrivada>
                <DondeEstamos />
              </RutaPrivada>
            }
          />
          {/* <Route path="/detalle">
            <Route
              path=":idInstrumento"
              element={
                <RutaPrivada>
                  <DetalleInstrumento isOpen={true} />
                </RutaPrivada>
              }
            />
          </Route> */}

          <Route
            path="/grilla"
            element={
              <RutaPrivada>
                <RolUsuario rol={Roles.ADMIN}>
                  <GrillaInstrumento />
                </RolUsuario>
              </RutaPrivada>
            }
          />

          <Route
            path="/graficos"
            element={
              <RutaPrivada>
                <RolUsuario rol={Roles.ADMIN}>
                  <Graficos />
                </RolUsuario>
              </RutaPrivada>
            }
          />
          <Route
            path="/loading"
            element={
              <RutaPrivada>
                <TestLoad />
              </RutaPrivada>
            }
          />
          <Route
            path="*"
            element={
              <RutaPrivada>
                <Home />
              </RutaPrivada>
            }
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
