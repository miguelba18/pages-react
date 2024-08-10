
import useAuthToken from "../../../../Token/useAuthToken";
import { useState } from "react";

const useDesagruparEmisor = () => {
    const [facturasDesagrupadas, setFacturasDesagrupadas] = useState([]);
const [totalSumaDesagrupadas, setTotalSumaDesagrupadas] = useState(0);
    const { token } = useAuthToken();

    

    const handleDesagrupar = async (factura, ciudad) => {
        try {
          const url = new URL("http://localhost:8080/factura/emisor-desagrupar");
          const params = new URLSearchParams();
      
          if (ciudad) {
            params.append("ciudad", ciudad);
          }
          if (factura.nitEmisor) {
            params.append("filtro", factura.nitEmisor);
          }
          if (factura.fechaEmision) {
            params.append("anio", factura.fechaEmision);
          }
      
          url.search = params.toString();
          console.log("Desagrupar URL:", url.toString());
          const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al desagrupar la factura");
          }
      
          
      
          const data = await response.json();
          setFacturasDesagrupadas(data.facturas);  
          setTotalSumaDesagrupadas(data.totalSuma);  
      
        } catch (error) {
          console.error("Error en handleDesagrupar:", error);
        }
      };
  return { facturasDesagrupadas, totalSumaDesagrupadas, handleDesagrupar };
}

export default useDesagruparEmisor
