import useAuthToken from "../../../Token/useAuthToken";
import {  useState, useCallback } from "react";

const useListAlcalde = () => {
  const { token } = useAuthToken();
  const [facturas, setFacturas] = useState([]);
  const [totalSuma, setTotalSuma] = useState(0);

  const fetchFacturas = useCallback(
    async ( query, anio) => {
      try {
        let url = `http://localhost:8080/factura/listar`;
        const params = new URLSearchParams();
        
        if (query) {
          params.append("filtro", query);
        }
        if (anio) {
          params.append("anio", anio);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url, {
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
        console.error(error);
        setFacturas([]);
      }
    },
    [token]
  );

  

  return { facturas, fetchFacturas, totalSuma, setFacturas };
};

export default useListAlcalde;
