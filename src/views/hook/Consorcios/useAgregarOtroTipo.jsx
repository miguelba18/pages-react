import { useState, useCallback } from "react";
import useAuthToken from "../Token/useAuthToken";
import { toast } from "react-toastify";

const useAgregarOtroTipo = () => {
  const { token } = useAuthToken();
  const [isCargando, setIsCargando] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const agregarOtroTipo = useCallback(async (nitFiltro) => {
    setIsCargando(true);
    setError(null); 
    setSuccessMessage(""); 

    try {
      const response = await fetch(`http://localhost:8080/otrotipo/agregarPorFiltro?filtro=${nitFiltro}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Error al agregar otro tipo");
      }

      const data = await response.json();
        console.log("Otro tipo agregado:", data);
      toast.success(`Otro tipo agregado con éxito para el NIT ${nitFiltro}`);
    } catch (error) {
      console.error("Error al agregar otro tipo:", error);
      setError("Hubo un error al agregar el otro tipo");
    } finally {
      setIsCargando(false);
    }
  }, [token]);

  return {
    agregarOtroTipo,
    isCargando,
    error,
    successMessage,
  };
};

export default useAgregarOtroTipo;
