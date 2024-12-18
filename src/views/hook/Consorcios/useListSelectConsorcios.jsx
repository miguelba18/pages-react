import useAuthToken from "../Token/useAuthToken";
import { useState, useCallback } from "react";
const useListSelectConsorcios = () => {
    const { token } = useAuthToken();
    const [compras, setCompras] = useState([]);
    const selectCompras = useCallback(async () => {
        try {
          let url = `http://localhost:8080/contribuyente/listarContribuyentes`;
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
          }
          const data = await response.json();
          setCompras(data);
        } catch (error) {
          console.error(error);
          setCompras([]);
        }
      }, [token]);
    
  return {compras,
    selectCompras,}
}

export default useListSelectConsorcios
