import axios from "axios";

const eliminarUsuario = async (id, setLocalMayors) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token de autenticación.");
      }
  
      const response = await axios.delete(
        `http://localhost:8080/api/V1/usuario/alcalde/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status !== 200) { 
        throw new Error("Error al eliminar el registro.");
      }
  
      setLocalMayors((prevMayors) =>
        prevMayors.filter((mayor) => mayor.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };
  

export default eliminarUsuario;
