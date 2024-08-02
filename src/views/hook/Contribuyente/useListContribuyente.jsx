import useAuthToken from "../Token/useAuthToken";
import { useEffect, useState } from "react";

const useListContribuyente = () => {
    const { token } = useAuthToken();
    const [contribuyentes, setContribuyente] = useState([]);
  
    const searchContribuyentes = async (query) => {
      try {
        const response = await fetch(`http://localhost:8080/contribuyente/listar?filtro=${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Error al obtener los contribuyentes");
        }
  
        const data = await response.json();
        setContribuyente(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    useEffect(() => {
      const obtenercontribuyente = async () => {
        try {
          const response = await fetch("http://localhost:8080/contribuyente/listar", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error("Error al obtener los adquirientes");
          }
  
          const data = await response.json();
          setContribuyente(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      obtenercontribuyente();
    }, [token]);
  
    return { contribuyentes, searchContribuyentes };
  };
  
  export default useListContribuyente;