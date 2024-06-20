import { useState, useEffect, useCallback } from "react";
import useAuthToken from "../../../../Token/useAuthToken";

import useSelectCityDepaUtils from "../../../../../../utils/useSelectCityDepaUtils";
const useListAdministrar = () => {
    const { token } = useAuthToken();
    const [facturas, setFacturas] = useState([]);
    const {
        selectedCiudad,
      } = useSelectCityDepaUtils();

    const fetchFacturas = useCallback(
        async (ciudad) => {
          try {
            let url = "http://localhost:8080/factura/adquiriente-admin";
            if (ciudad) {
              url += `?ciudad=${ciudad}`;
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

      useEffect(() => {
        if (selectedCiudad) {
          fetchFacturas(selectedCiudad);
        } else {
          setFacturas([]);
        }
      }, [fetchFacturas, selectedCiudad]);

  return {facturas, fetchFacturas}
}

export default useListAdministrar
