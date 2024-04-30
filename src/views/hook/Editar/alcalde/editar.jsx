import axios from "axios";


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
      `http://localhost:8080/api/V1/auth/admin/${selectedMayor.id}`,
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
    alert("Usuario editado correctamente");
    setIsModalOpen(false);
    
  } catch (error) {
    console.error("Error:", error);
    setMensaje("Ocurrió un error al actualizar el usuario.");
  }
};

export default actualizarUsuario;
