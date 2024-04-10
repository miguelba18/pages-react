import Admin_Panel from './views/admin/Admin-Panel/Admin_Panel';
import LayoutAdmin from './layouts/LayoutAdmin';
import Perfil from './views/admin/Admin-Panel/Perfil';
import Calendario from './views/admin/Admin-Panel/Calendario';


import Alcalde from './views/admin/Admin-Panel/Roles/Alcalde/Alcalde';
import Secretario from './views/admin/Admin-Panel/Roles/Secretario/Secretario';
import Personal from './views/admin/Admin-Panel/Roles/Personal/Personal';

import Home from './views/Home';
import Login from './views/auth/login y register/Login';
import Register from './views/auth/login y register/Register';
import Error404 from './views/Error404';

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
          <Route index element={<Admin_Panel/>}/>
          <Route path="perfil" element={<Perfil/>} />
          <Route path="calendario" element={<Calendario/>} />
          <Route path="alcalde" element={<Alcalde/>} />
          <Route path="secretario" element={<Secretario/>} />
          <Route path="personal" element={<Personal/>} />
        </Route>

        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/registro" element={<Register/>} />
        <Route path="*" element={<Error404/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
