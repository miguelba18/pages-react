import { useState, useCallback } from "react";
import useAuthToken from "../Token/useAuthToken";
import { toast } from "react-toastify";

const useAgregarConsorcios = () => {
  const { token } = useAuthToken();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const agregarConsorcio = useCallback(async (nitFiltro) => {
    setIsLoading(true);
    setError(null); 
    setSuccessMessage(""); 

    try {
      const response = await fetch(`http://localhost:8080/consorcio/agregarPorFiltro?filtro=${nitFiltro}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
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
      setIsLoading(false);
    }
  }, [token]);

  return {
    agregarConsorcio,
    isLoading,
    error,
    successMessage,
  };
};

export default useAgregarConsorcios;
