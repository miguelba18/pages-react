import useAuthToken from "../../Token/useAuthToken";
import { useState, useCallback } from "react"


const useListFacturasTodas = () => {
  
  const [facturas, setFacturas] = useState([]);
  const [totalSuma, setTotalSuma] = useState(0);
  
 

  
  const { token } = useAuthToken();

    const fetchFacturas = useCallback(
      async () => {
        try {
          let url = `http://localhost:8080/factura/listartodas`;
          
  
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
  
    
  
    
  
    
    
    
      return { totalSuma, facturas, fetchFacturas };
    };

export default useListFacturasTodas

