import Form from "./Form";
import actualizarUsuario from "../../../../hook/Editar/alcalde/editar";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alcalde = () => {
  const [mayors, setMayors] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const alertShown = localStorage.getItem('alertShown');

    if (alertShown === 'true') {
      toast.success("Usuario editado correctamente");
      localStorage.removeItem('alertShown');
    }
  }, []);

  const handleCreateMayor = (newMayor) => {
    setMayors([...mayors, newMayor]);
    setShowForm(false);
  };
  const handleUpdateMayor = async (selectedMayor, token, nombre, apellido, cedula, telefono, email, setMensaje, setIsModalOpen) => {
    await actualizarUsuario(selectedMayor, token, nombre, apellido, cedula, telefono, email, setMensaje, setIsModalOpen);
    
    localStorage.setItem('alertShown', 'true');
  };

  return (
    <div className="container mx-auto xl:p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">
        Ingreso de Alcaldes
      </h1>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8 "
          onClick={() => setShowForm(true)}
        >
          Crear Alcalde
        </button>
      </div>
      {showForm && <Form onCreateMayor={handleCreateMayor} onUpdateMayor={handleUpdateMayor} />}
    </div>
  );
};

export default Alcalde;
