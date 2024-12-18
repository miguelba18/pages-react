import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const actualizarUsuario = async (
  selectedMayor,
  token,
  nombre,
  apellido,
  cedula,
  telefono,
  email,
  setMensaje,
  setIsModalOpen,
  
) => {
  if (!selectedMayor) {
    setMensaje("No se ha seleccionado ningún usuario.");
    return;
  }
  const datosUsuario = {
    nombre,
    apellido,
    cedula,
    telefono,
    email,
  };

  try {
    const response = await axios.put(
      `http://localhost:8080/api/V1/auth/alcalde/${selectedMayor.id}`,
      datosUsuario,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = response.data;
    setMensaje(responseData.message);
    toast.success("Usuario editado correctamente",{autoClose: 1200});
    setIsModalOpen(false);
    
  } catch (error) {
    console.error("Error:", error);
    setMensaje("Ocurrió un error al actualizar el usuario.");
  }
};

export default actualizarUsuario;
