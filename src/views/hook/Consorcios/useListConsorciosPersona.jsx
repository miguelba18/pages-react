import useAuthToken from "../Token/useAuthToken";
import { useState, useCallback } from "react";
const useListConsorcios = () => {
  const { token } = useAuthToken();
  const [consorcios, setConsorcios] = useState([]);

  const listConsorcios = useCallback(
    async (ciudad, filtro = "", anio = "") => {
      try {
        let url = `http://localhost:8080/consorcio/persona`;
        const params = new URLSearchParams();
        if (ciudad) {
            params.append("ciudad", ciudad);
          }
          if (filtro) {
            params.append("filtro", filtro);
          }
          if (anio) {
            params.append("anio", anio);
          }
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
      console.log(" URL:", url.toString());
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
        setConsorcios(data);
      } catch (error) {
        console.error(error);
        setConsorcios([]);
      }
    },
    [token]
  );

  return {
    consorcios,
    listConsorcios,

    setConsorcios,
  };
};

export default useListConsorcios;
