import LayoutAdmin from "./layouts/LayoutAdmin";
import Perfil from "./views/admin/layouts/perfil/Perfil";
import CalendarioAdmin from "./views/admin/Admin-Panel/calendarios/CalendarioAdmin";
import FacturaElectronica from "./views/admin/layouts/Facturas/Factura Electronica/FacturaElectronica";
import CalendarioAlcalde from "./views/admin/Alcalde-Panel/Calendario/CalendarioAlcalde";
import RegistroAdmin from "./views/admin/layouts/RegistroAdmin/RegistroAdmin";
import Inquietud from "./views/admin/layouts/Inquietudes/Inquietud";

import AdministrarFacturas from "./views/admin/layouts/Facturas/Administrar/AdministrarFacturas";

import AgrupadasAdquiriente from "./views/admin/layouts/Facturas/Agrupadas/AgrupadasAdquiriente";
import AgrupadasEmisor from "./views/admin/layouts/Facturas/Agrupadas/AgrupadasEmisor";
import FacturaCompleta from "./views/admin/layouts/Facturas/Facturas Completas/FacturaCompleta";
import FacturaCompletaAlcalde from "./views/admin/layouts/Facturas/Facturas Completas/FacturaCompletaAlcalde";
import FacturaTodasAlcalde from "./views/admin/layouts/Facturas/Facturas Completas/FacturaTodasAlcalde";

import AgrupadasEmisorAlcalde from "./views/admin/layouts/Facturas/Agrupadas/Alcalde/AgrupadasEmisorAlcalde";
import AgrupadasAdquirienteAlcalde from "./views/admin/layouts/Facturas/Agrupadas/Alcalde/AgrupadasAdquirienteAlcalde";

import Consorcios from "./views/admin/layouts/Consorcios/todos los consorcios/Consorcios";
import Contribuyente from "./views/admin/layouts/Contribuyente/Contribuyente";
import FacturaCompletaTodas from "./views/admin/layouts/Facturas/Facturas Completas/FacturaCompletaTodas";

import ConsorcioClienteMunicipio from "./views/admin/layouts/Consorcios/adquiriente/ConsorcioClienteMunicipio";
import ConsorcioVendedorMunicipio from "./views/admin/layouts/Consorcios/emisor/ConsorcioVendedorMunicipio";
import OtrosContribuyentes from "./views/admin/layouts/Contribuyente/OtrosContribuyentes";
import OtrosContribuyentesSinVinculo from "./views/admin/layouts/Contribuyente/OtrosContribuyentesSinVinculo";
import OtrosTipos from "./views/admin/layouts/Consorcios/Uniones temporales/OtrosTipos";
import UnionesConsorcios from "./views/admin/layouts/Consorcios/Uniones temporales/UnionesConsorcios";


import Seguimiento from "./views/admin/layouts/Seguimiento/Seguimiento";
import Alcalde from "./views/admin/Admin-Panel/Roles/Alcalde/Alcalde";
import Secretario from "./views/admin/Alcalde-Panel/Roles/Secretario/Secretario";
import Personal from "./views/admin/Alcalde-Panel/Roles/Personal/Personal";
import TablaAdminAlcalde from "./views/admin/Admin-Panel/Tablas/Tabla-admin-alcalde";
import Tabla from "./views/admin/Alcalde-Panel/Tablas/Tabla";

import Home from "./views/landing/Home";
import Login from "./views/auth/login/Login";

import Error404 from "./views/error/Error404";
import OlvidarContraseña from "./views/auth/olvidar contraseña/OlvidarContraseña";
import CodigoOtp from "./views/auth/olvidar contraseña/CodigOtp";
import NuevaContraseña from "./views/auth/olvidar contraseña/NuevaContraseña";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/AdminPanel/blockroute/ProtectedRoute";
import RestrictedRouteAdmin from "./components/AdminPanel/blockroute/RestrictedRouteAdmin";
import RestrictedRouteAlcalde from "./components/AdminPanel/blockroute/RestrictedRouteAlcalde";
import RestrictedRouteSecretarioPersonal from "./components/AdminPanel/blockroute/RestrictedRouteSecretarioPersonal";
import "./styles/style.css";
import VendedorAlcalde from "./views/admin/layouts/Consorcios/emisor/VendedorAlcalde";
import ClienteAlcalde from "./views/admin/layouts/Consorcios/adquiriente/ClienteAlcalde";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Perfil />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="contribuyente" element={<Contribuyente />} />
          <Route path="seguimiento" element={<Seguimiento />} />
          <Route path="otroscontribuyentes" element={<OtrosContribuyentes />} />
          <Route path="unionesconsorcios" element={<UnionesConsorcios />} />
          <Route path="consorcios" element={<Consorcios />} />
          <Route path="otroscontribuyentessinvinculo" element={<OtrosContribuyentesSinVinculo />} />
          <Route path="otrostipos" element={<OtrosTipos />} />

         
        
          
          <Route
            path="calendarioalcalde"
            element={
              <RestrictedRouteSecretarioPersonal>
                <CalendarioAlcalde />
              </RestrictedRouteSecretarioPersonal>
            }
          />

          <Route
            path="vendedoralcalde"
            element={
              <RestrictedRouteSecretarioPersonal>
                <VendedorAlcalde />
              </RestrictedRouteSecretarioPersonal>
            }
          />
          <Route
            path="clientealcalde"
            element={
              <RestrictedRouteSecretarioPersonal>
                <ClienteAlcalde />
              </RestrictedRouteSecretarioPersonal>
            }
          />

          <Route
            path="facturacompletaalcalde"
            element={
              <RestrictedRouteSecretarioPersonal>
                <FacturaCompletaAlcalde />
              </RestrictedRouteSecretarioPersonal>
            }
          />
          <Route
            path="facturatodasalcalde"
            element={
              <RestrictedRouteSecretarioPersonal>
                <FacturaTodasAlcalde />
              </RestrictedRouteSecretarioPersonal>
            }
          />

          <Route
            path="agrupadasadquirientealcalde"
            element={
              <RestrictedRouteSecretarioPersonal>
                <AgrupadasAdquirienteAlcalde />
              </RestrictedRouteSecretarioPersonal>
            }
          />
          <Route
            path="agrupadasemisoralcalde"
            element={
              <RestrictedRouteSecretarioPersonal>
                <AgrupadasEmisorAlcalde />
              </RestrictedRouteSecretarioPersonal>
            }
          />

          <Route path="facturaelectronica" element={<FacturaElectronica />} />

          {/* Rutas que solo va a ver el Alcalde*/}
          <Route
            path="secretario"
            element={
              <RestrictedRouteAlcalde>
                <Secretario />
              </RestrictedRouteAlcalde>
            }
          />
          <Route
            path="personal"
            element={
              <RestrictedRouteAlcalde>
                <Personal />
              </RestrictedRouteAlcalde>
            }
          />
          <Route
            path="tabla"
            element={
              <RestrictedRouteAlcalde>
                <Tabla />
              </RestrictedRouteAlcalde>
            }
          />


          {/* Rutas que solo puede ver el ADMIN */}
          <Route
            path="facturacompletatodas"
            element={
              <RestrictedRouteAdmin>
                <FacturaCompletaTodas />
              </RestrictedRouteAdmin>
            }
          />
          
          
          <Route
            path="alcalde"
            element={
              <RestrictedRouteAdmin>
                <Alcalde />
              </RestrictedRouteAdmin>
            }
          />
          <Route
            path="registroadmin"
            element={
              <RestrictedRouteAdmin>
                <RegistroAdmin />
              </RestrictedRouteAdmin>
            }
          />
          <Route
            path="tablaadminalcalde"
            element={
              <RestrictedRouteAdmin>
                <TablaAdminAlcalde />
              </RestrictedRouteAdmin>
            }
          />
          <Route
            path="calendarioadmin"
            element={
              <RestrictedRouteAdmin>
                <CalendarioAdmin />
              </RestrictedRouteAdmin>
            }
          />
          <Route
            path="inquietud"
            element={
              <RestrictedRouteAdmin>
                <Inquietud />
              </RestrictedRouteAdmin>
            }
          />
          <Route
            path="administrarfacturas"
            element={
              <RestrictedRouteAdmin>
                <AdministrarFacturas />
              </RestrictedRouteAdmin>
            }
          />
          <Route
            path="agrupadasadquiriente"
            element={
              <RestrictedRouteAdmin>
                <AgrupadasAdquiriente />
              </RestrictedRouteAdmin>
            }
          />
          <Route
            path="agrupadasemisor"
            element={
              <RestrictedRouteAdmin>
                <AgrupadasEmisor />
              </RestrictedRouteAdmin>
            }
          />

          <Route
            path="facturacompleta"
            element={
              <RestrictedRouteAdmin>
                <FacturaCompleta />
              </RestrictedRouteAdmin>
            }
          />
          

          <Route
            path="consorcioclientemunicipio"
            element={
              <RestrictedRouteAdmin>
                <ConsorcioClienteMunicipio />
              </RestrictedRouteAdmin>
            }
          />
          <Route
            path="consorciovendedormunicipio"
            element={
              <RestrictedRouteAdmin>
                <ConsorcioVendedorMunicipio />
              </RestrictedRouteAdmin>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/olvidarcontraseña" element={<OlvidarContraseña />} />
        <Route path="/codigo" element={<CodigoOtp />} />
        <Route path="/nuevacontraseña" element={<NuevaContraseña />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
