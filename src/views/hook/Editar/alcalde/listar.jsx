
import axios from "axios";

const listar = async (setLocalMayors, setMensaje) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No hay token de autenticación.");
    }

    const response = await axios.get(
      "http://localhost:8080/api/V1/usuario/listar",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.status === 200) {
      throw new Error("Error al obtener los datos.");
    }

    setLocalMayors(response.data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    setMensaje("Error al obtener los datos");
  }
};


export default listar;
