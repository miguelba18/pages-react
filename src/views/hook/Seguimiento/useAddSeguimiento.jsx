import useAuthToken from "../Token/useAuthToken";
import { useState } from "react";

const useAddSeguimiento = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuthToken();

  const addSeguimiento = async (seguimientoData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/contribuyentes/agregar", {
        method: "POST",
        headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" },
        body: JSON.stringify(seguimientoData),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el seguimiento");
      }

      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addSeguimiento, loading, error };
};

export default useAddSeguimiento;
