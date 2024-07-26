
import useAuthToken from "../../../../../Token/useAuthToken";
import { useState, useCallback } from "react";

const useListFacturasAdquiriente = () => {
    const [facturas, setFacturas] = useState([]);
    const { token } = useAuthToken();
    const [totalSuma, setTotalSuma] = useState(0);

    const fetchFacturas = useCallback(
        async () => {
          try {
            let url = "http://localhost:8080/factura/adquiriente-agrupar";
            
    
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
            setFacturas(data.facturasAgrupadas);
            setTotalSuma(data.totalSuma); 
          } catch (error) {
            console.error(error);
            setFacturas([]);
          }
        },
        [token]
      );
  return { facturas, totalSuma, fetchFacturas };
}

export default useListFacturasAdquiriente
