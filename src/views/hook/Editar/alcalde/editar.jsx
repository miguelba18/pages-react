import axios from 'axios';
import {toast} from 'react-toastify'

const actualizarUsuario = async (
  selectedMayor,
  token,
  nombre,
  apellido,
  cedula,
  telefono,
  email,
  mensaje,
  setMensaje,
  onClose,
  setLocalMayors
) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/V1/auth/admin/${selectedMayor.id}`,
      {
        nombre,
        apellido,
        cedula,
        telefono,
        email,
        ciudadId: selectedMayor.ciudad.id,
        departamentoId: selectedMayor.ciudad.departamento.id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.status === 200) {
      toast.success("Usuario actualizado correctamente", {autoClose: 1200});
      setLocalMayors((prevMayors) =>
        prevMayors.map((mayor) =>
          mayor.id === selectedMayor.id ? response.data : mayor
        )
      );
      setTimeout(() => {
        window.location.reload();
      }, 1700);

      
    } else {
      setMensaje("Error al actualizar usuario");
    }
  } catch (error) {
    console.error(error);
    setMensaje("Error al actualizar usuario");
  }
};

export default actualizarUsuario;
