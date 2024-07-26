
import useAuthToken from "../../../Token/useAuthToken";
import { useEffect, useState } from "react";

const useListAlcalde = () => {
  const { token } = useAuthToken();
  const [facturas, setFacturas] = useState([]);
  const [totalSuma, setTotalSuma] = useState(0);

  const searchFacturas = async (query) => {
    try {
      const response = await fetch(`http://localhost:8080/factura/listar?filtro=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las facturas");
      }

      const data = await response.json();
          setFacturas(data.facturas);
          setTotalSuma(data.totalSuma);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const obtenerFacturas = async () => {
      try {
        const response = await fetch("http://localhost:8080/factura/listar", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las facturas");
        }

        const data = await response.json();
        setFacturas(data.facturas);
        setTotalSuma(data.totalSuma);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    obtenerFacturas();
  }, [token]);

  return { facturas, searchFacturas, totalSuma };
};

export default useListAlcalde;
  


