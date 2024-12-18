import useAuthToken from "../../Token/useAuthToken";
import { useState, useCallback } from "react";
const useListAdquiriente = () => {
    const { token } = useAuthToken();
    const [users, setUsers] = useState([]);
  
    const fetchUsers = useCallback(async (tipo="adquirientes") => {
        try {
          const tipoString = typeof tipo === 'string' ? tipo : "adquirientes";
          let url =`http://localhost:8080/correo/usuarios-alcalde/?tipo=${encodeURIComponent(tipoString)}`;
          
    
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
          setUsers(data);
        } catch (error) {
          console.error(error);
          setUsers([]); 
        }
      }, [token]);
    return { users, fetchUsers };
  }

export default useListAdquiriente
