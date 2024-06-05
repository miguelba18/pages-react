import useAuthToken from "../../../Token/useAuthToken";
import { useEffect, useState } from "react";

const useListAdquiriente = () => {
  const { token } = useAuthToken();
  const [adquirientes, setAdquirientes] = useState([]);

  const searchAdquirientes = async (query) => {
    try {
      const response = await fetch(`http://localhost:8080/factura/adquiriente?filtro=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los adquirientes");
      }

      const data = await response.json();
      setAdquirientes(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const obtenerAdquirientes = async () => {
      try {
        const response = await fetch("http://localhost:8080/factura/adquiriente", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los adquirientes");
        }

        const data = await response.json();
        setAdquirientes(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    obtenerAdquirientes();
  }, [token]);

  return { adquirientes, searchAdquirientes };
};

export default useListAdquiriente;
  

