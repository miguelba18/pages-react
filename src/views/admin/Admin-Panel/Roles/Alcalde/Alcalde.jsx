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
          className="flex mb-2 justify-center items-center gap-4 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] "
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
