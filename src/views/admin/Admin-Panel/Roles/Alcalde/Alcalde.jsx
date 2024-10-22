import Form from "./Form";
import actualizarUsuario from "../../../../hook/Editar/alcalde/editar";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alcalde = () => {
  const [mayors, setMayors] = useState([]);
 

  useEffect(() => {
    const alertShown = localStorage.getItem('alertShown');

    if (alertShown === 'true') {
      toast.success("Usuario editado correctamente");
      localStorage.removeItem('alertShown');
    }
  }, []);

  const handleCreateMayor = (newMayor) => {
    setMayors([...mayors, newMayor]);
    
  };
  const handleUpdateMayor = async (selectedMayor, token, nombre, apellido, cedula, telefono, email, setMensaje, setIsModalOpen) => {
    await actualizarUsuario(selectedMayor, token, nombre, apellido, cedula, telefono, email, setMensaje, setIsModalOpen);
    
    localStorage.setItem('alertShown', 'true');
  };

  return (
    <div className="container mx-auto xl:p-4">
      <h1 className="font-bold text-3xl text-secundary mb-4">
          Agregar Alcalde
        </h1>
      <div className="flex justify-end">
        
      </div>
      { <Form onCreateMayor={handleCreateMayor} onUpdateMayor={handleUpdateMayor} />}
    </div>
  );
};

export default Alcalde;
