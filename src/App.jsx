import Dashboard from './views/admin/layouts/Dashboard/Dashboard';
import LayoutAdmin from './layouts/LayoutAdmin';
import Perfil from './views/admin/layouts/perfil/Perfil';
import CalendarioAdmin from './views/admin/Admin-Panel/calendarios/CalendarioAdmin';
import FacturaElectronica from './views/admin/layouts/Facturas/Factura Electronica/FacturaElectronica';
import CalendarioAlcalde from './views/admin/Alcalde-Panel/Calendario/CalendarioAlcalde'
import RegistroAdmin from './views/admin/layouts/RegistroAdmin/RegistroAdmin'
import Inquietud from './views/admin/layouts/Inquietudes/Inquietud';
import Adquiriente from './views/admin/layouts/Facturas/Adquiriente y emisor/Adquiriente';
import Emisor from './views/admin/layouts/Facturas/Adquiriente y emisor/Emisor';
import AdministrarFacturas from './views/admin/layouts/Facturas/Administrar/AdministrarFacturas';
import FacturasAgrupadas from './views/admin/layouts/Facturas/Agrupadas/FacturasAgrupadas';
import FacturaCompleta from './views/admin/layouts/Facturas/Facturas Completas/FacturaCompleta';
import FacturaCompletaAlcalde from './views/admin/layouts/Facturas/Facturas Completas/FacturaCompletaAlcalde';
import AgrupadasAlcalde from './views/admin/layouts/Facturas/Agrupadas/Alcalde/AgrupadasAlcalde';
import Consorcios from './views/admin/layouts/Consorcios/Consorcios';
import Contribuyente from './views/admin/layouts/Contribuyente/Contribuyente';
import AdquirienteAdmin from './views/admin/layouts/Facturas/Adquiriente y emisor/admin/AdquirienteAdmin';
import EmisorAdmin from './views/admin/layouts/Facturas/Adquiriente y emisor/admin/EmisorAdmin';


import Alcalde from './views/admin/Admin-Panel/Roles/Alcalde/Alcalde';
import Secretario from './views/admin/Alcalde-Panel/Roles/Secretario/Secretario';
import Personal from './views/admin/Alcalde-Panel/Roles/Personal/Personal';
import TablaAdminAlcalde from './views/admin/Admin-Panel/Tablas/Tabla-admin-alcalde';
import Tabla from './views/admin/Alcalde-Panel/Tablas/Tabla'

import Home from './views/landing/Home';
import Login from './views/auth/login/Login';

import Error404 from './views/error/Error404';
import OlvidarContraseña from './views/auth/olvidar contraseña/OlvidarContraseña';
import CodigoOtp from './views/auth/olvidar contraseña/CodigOtp';
import NuevaContraseña from './views/auth/olvidar contraseña/NuevaContraseña';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/AdminPanel/blockroute/ProtectedRoute';
import RestrictedRouteAdmin from './components/AdminPanel/blockroute/RestrictedRouteAdmin';
import RestrictedRouteAlcalde from './components/AdminPanel/blockroute/RestrictedRouteAlcalde';
import RestrictedRouteSecretarioPersonal from './components/AdminPanel/blockroute/RestrictedRouteSecretarioPersonal';
import "./styles/style.css"

function App() {
  
  

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <LayoutAdmin/>
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard/>}/>
          <Route path="perfil" element={<Perfil/>} />
          <Route path="calendarioalcalde" element={<RestrictedRouteSecretarioPersonal><CalendarioAlcalde/></RestrictedRouteSecretarioPersonal>} />
          <Route path="adquiriente" element={<Adquiriente/>} />
          <Route path="emisor" element={<Emisor/>} />
          <Route path="facturaelectronica" element={<FacturaElectronica/>} />
          
            {/* Rutas que solo va a ver el Alcalde*/}
          <Route path="secretario" element={<RestrictedRouteAlcalde><Secretario/></RestrictedRouteAlcalde> } />
          <Route path="personal" element={<RestrictedRouteAlcalde><Personal/></RestrictedRouteAlcalde>} />
          <Route path="tabla" element={<RestrictedRouteAlcalde><Tabla/></RestrictedRouteAlcalde>} />
          <Route path="facturacompletaalcalde" element={<RestrictedRouteAlcalde><FacturaCompletaAlcalde/></RestrictedRouteAlcalde>} />

          <Route path="agrupadasalcalde" element={<RestrictedRouteAlcalde><AgrupadasAlcalde/></RestrictedRouteAlcalde>} />

          
          
          
          {/* Rutas que solo puede ver el ADMIN */}
          <Route path="alcalde" element={<RestrictedRouteAdmin><Alcalde/></RestrictedRouteAdmin>} />
          <Route path="registroadmin" element={<RestrictedRouteAdmin><RegistroAdmin/></RestrictedRouteAdmin>} />
          <Route path="tablaadminalcalde" element={<RestrictedRouteAdmin><TablaAdminAlcalde/></RestrictedRouteAdmin>} />
          <Route path="calendarioadmin" element={<RestrictedRouteAdmin><CalendarioAdmin/></RestrictedRouteAdmin>} />
          <Route path="inquietud" element={<RestrictedRouteAdmin><Inquietud/></RestrictedRouteAdmin>} />
          <Route path="administrarfacturas" element={<RestrictedRouteAdmin><AdministrarFacturas/></RestrictedRouteAdmin>}/>
          <Route path="facturasagrupadas" element={<RestrictedRouteAdmin><FacturasAgrupadas/></RestrictedRouteAdmin>} />
          <Route path="facturacompleta" element={<RestrictedRouteAdmin><FacturaCompleta/></RestrictedRouteAdmin>} />
          <Route path="consorcios" element={<RestrictedRouteAdmin><Consorcios/></RestrictedRouteAdmin>} />
          <Route path="contribuyente" element={<RestrictedRouteAdmin><Contribuyente/></RestrictedRouteAdmin>} />
          <Route path="adquirienteadmin" element={<RestrictedRouteAdmin><AdquirienteAdmin/></RestrictedRouteAdmin>} />
          <Route path="emisoradmin" element={<RestrictedRouteAdmin><EmisorAdmin/></RestrictedRouteAdmin>} />
          
        </Route>

        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/olvidarcontraseña" element={<OlvidarContraseña/>} />
        <Route path="/codigo" element={<CodigoOtp/>} />
        <Route path="/nuevacontraseña" element={<NuevaContraseña/>} />
        <Route path="*" element={<Error404/>} />
    
        
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    
  )
}

export default App
