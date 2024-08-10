import { useState } from "react";
import useAuthToken from "../Token/useAuthToken";

const useListContribuyente = () => {
  const { token } = useAuthToken();
  const [contribuyentes, setContribuyentes] = useState([]);
  const [factura, setFactura] = useState([]); 
  
  
  const fetchContribuyentes = async (query) => {
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
      setContribuyentes(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchFacturaById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/contribuyente/listar?nombre=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener la factura");
      }

      const data = await response.json();
      
      setFactura(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { contribuyentes, fetchContribuyentes, fetchFacturaById, factura };
};

export default useListContribuyente;
