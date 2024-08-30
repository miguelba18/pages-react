import useAuthToken from "../Token/useAuthToken";
import { useState, useCallback } from "react";

const useListDocumentoComprador = () => {
  const { token } = useAuthToken();
  const [facturas, setFacturas] = useState([]);

  const fetchFacturas = useCallback(
    async (ciudad, query, anio, tipo = "adquirientes") => {
      try {
        const tipoString = typeof tipo === "string" ? tipo : "adquirientes";
        let url = `http://localhost:8080/soporte/persona`;
        const params = new URLSearchParams();

        if (ciudad) {
          params.append("ciudad", ciudad);
        }

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
        console.log("Desagrupar URL:", url.toString());

        if (!response.ok) {
          throw new Error("Error al obtener las facturas");
        }

        const data = await response.json();
        setFacturas(data);
      } catch (error) {
        console.error(error);
        setFacturas([]);
      }
    },
    [token]
  );

  return { facturas, fetchFacturas, setFacturas };
};

export default useListDocumentoComprador;
