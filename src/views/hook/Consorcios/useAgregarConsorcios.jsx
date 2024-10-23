import { useState, useCallback } from "react";
import useAuthToken from "../Token/useAuthToken";
import { toast } from "react-toastify";

const useAgregarConsorcio = () => {
  const { token } = useAuthToken(); // Si necesitas un token de autenticación
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const agregarConsorcio = useCallback(async (nitFiltro) => {
    setIsLoading(true);
    setError(null); // Limpiar errores anteriores
    setSuccessMessage(""); // Limpiar mensajes anteriores

    try {
      const response = await fetch(`http://localhost:8080/consorcio/agregarPorFiltro?filtro=${nitFiltro}`, {
        method: "POST",  // Asegurándome que sea POST, cámbialo si es otro método
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Token si es necesario
        },
      });

      if (!response.ok) {
        throw new Error("Error al agregar consorcio");
      }

      const data = await response.json();
        console.log("Consorcio agregado:", data);
      toast.success(`Consorcio agregado con éxito para el NIT ${nitFiltro}`);
    } catch (error) {
      console.error("Error al agregar consorcio:", error);
      setError("Hubo un error al agregar el consorcio");
    } finally {
      setIsLoading(false); // Terminó la solicitud
    }
  }, [token]);

  return {
    agregarConsorcio,
    isLoading,
    error,
    successMessage,
  };
};

export default useAgregarConsorcio;
