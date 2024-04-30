import Dashboard from './views/admin/layouts/Dashboard/Dashboard';
import LayoutAdmin from './layouts/LayoutAdmin';
import Perfil from './views/admin/layouts/perfil/Perfil';
import CalendarioAdmin from './views/admin/Admin-Panel/calendarios/CalendarioAdmin';
import FacturaElectronica from './views/admin/layouts/Factura Electronica/FacturaElectronica';
import CalendarioAlcalde from './views/admin/Alcalde-Panel/Calendario/CalendarioAlcalde'

import Alcalde from './views/admin/Admin-Panel/Roles/Alcalde/Alcalde';
import Secretario from './views/admin/Alcalde-Panel/Roles/Secretario/Secretario';
import Personal from './views/admin/Alcalde-Panel/Roles/Personal/Personal';
import TablaAdminAlcalde from './views/admin/Admin-Panel/Tablas/Tabla-admin-alcalde';
import Tabla from './views/admin/Alcalde-Panel/Tablas/Tabla'

import Home from './views/landing/Home';
import Login from './views/auth/login/Login';
import Register from './views/auth/register/Register';
import Error404 from './views/error/Error404';
import OlvidarContraseña from './views/auth/olvidar contraseña/OlvidarContraseña';
import CodigoOtp from './views/auth/olvidar contraseña/CodigOtp';
import NuevaContraseña from './views/auth/olvidar contraseña/NuevaContraseña';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/AdminPanel/blockroute/ProtectedRoute';

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
          <Route path="calendarioadmin" element={<CalendarioAdmin/>} />
          <Route path="calendarioalcalde" element={<CalendarioAlcalde/>} />
          <Route path="alcalde" element={<Alcalde/>} />
          <Route path="secretario" element={<Secretario/>} />
          <Route path="personal" element={<Personal/>} />
          <Route path="tablaadminalcalde" element={<TablaAdminAlcalde/>} />
          <Route path="tabla" element={<Tabla/>} />
          <Route path="facturaelectronica" element={<FacturaElectronica/>} />
          
        </Route>

        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/registro" element={<Register/>} />
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
