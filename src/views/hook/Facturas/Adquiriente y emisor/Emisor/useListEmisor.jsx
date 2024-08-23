import useAuthToken from "../../../Token/useAuthToken";
import { useCallback, useState } from "react";

const useListEmisor = () => {
  const { token } = useAuthToken();
  const [emisores, setEmisores] = useState([]);

  const searchEmisores = useCallback(
    async ( query, anio, tipo="emisores") => {
      try {
        const tipoString = typeof tipo === 'string' ? tipo : "emisores";
        let url = `http://localhost:8080/factura/persona`;
        const params = new URLSearchParams();
        
        if (query) {
          params.append("filtro", query);
        }
        if (anio) {
          params.append("anio", anio);
        }
        if (tipo) {
          params.append("tipo", tipoString);
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
        setEmisores(data);
      
      } catch (error) {
        console.error(error);
        setEmisores([]);
      }
    },
    [token]
  );

  return { emisores, searchEmisores };
};

export default useListEmisor;
  

