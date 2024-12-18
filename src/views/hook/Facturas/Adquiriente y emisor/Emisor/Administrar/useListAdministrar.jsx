import { useCallback, useState } from "react";
import useAuthToken from "../../../../Token/useAuthToken";

const useListAdministrar = () => {
    const { token } = useAuthToken();
    const [facturas, setFacturas] = useState([]);
    const fetchFacturas = useCallback(
        async (ciudad, tipo="emisores") => {
          try {
            const tipoString = typeof tipo === 'string' ? tipo : "emisores";
            let url = "http://localhost:8080/factura/persona-admin";
            if (ciudad) {
              url += `?ciudad=${ciudad}`;
            }
            if (tipoString) {
              url += ciudad? `&tipo=${tipoString}` : `?tipo=${tipoString}`;
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
            setFacturas(data);
          } catch (error) {
            console.error(error);
            setFacturas([]);
          }
        },
        [token]
      );
  return {facturas, fetchFacturas, setFacturas}
}

export default useListAdministrar
