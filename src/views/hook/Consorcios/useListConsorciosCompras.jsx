import useAuthToken from "../Token/useAuthToken";
import { useState, useCallback } from "react";
const useListConsorciosCompras = () => {
  const { token } = useAuthToken();
  const [consorcios, setConsorcios] = useState([]);


  const listConsorcios = useCallback(async (query) => {
    try {
      let url = `http://localhost:8080/consorcio/listarAdquiriente`;
      const params = new URLSearchParams();
      if (query) {
        params.append("filtro", query);
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }


      

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
  }, [token]);

  



  return {
    consorcios,
    
    listConsorcios,
  };
};

export default useListConsorciosCompras;
