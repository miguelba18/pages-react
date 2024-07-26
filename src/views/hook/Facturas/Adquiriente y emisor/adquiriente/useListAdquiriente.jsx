import useAuthToken from "../../../Token/useAuthToken";
import { useCallback, useState } from "react";

const useListAdquiriente = () => {
  const { token } = useAuthToken();
  const [adquirientes, setAdquirientes] = useState([]);

  const searchAdquirientes = useCallback(
    async ( query, anio) => {
      try {
        let url = `http://localhost:8080/factura/adquiriente`;
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
        setAdquirientes(data);
      
      } catch (error) {
        console.error(error);
        setAdquirientes([]);
      }
    },
    [token]
  );

  return { adquirientes, searchAdquirientes };
};

export default useListAdquiriente;
  

