import { useState } from "react";
import useAuthToken from "../Token/useAuthToken";

const useListContribuyente = () => {
  const { token } = useAuthToken();
  const [contribuyentes, setContribuyentes] = useState([]);
  const [factura, setFactura] = useState([]);

  const fetchFacturaByNit = async (nit) => {
    try {
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?filtro=&nit=${nit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener la factura por NIT");
      }
  
      const data = await response.json();
      setFactura(Array.isArray(data) ? data : [data]); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchFacturaByDepartamento = async (departamento) => {
    try {
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?filtro=&departamento=${departamento}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener la factura por Departamento");
      }
  
      const data = await response.json();
      setFactura(Array.isArray(data) ? data : [data]); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchFacturaByMunicipio = async (municipio) => {
    try {
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?filtro=&municipio=${municipio}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener la factura por municipio");
      }
  
      const data = await response.json();
      setFactura(Array.isArray(data) ? data : [data]); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchFacturaByDireccion = async (direccion) => {
    try {
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?filtro=&direccion=${direccion}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener la factura por direccion");
      }
  
      const data = await response.json();
      setFactura(Array.isArray(data) ? data : [data]); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchFacturaByCorreo = async (correo) => {
    try {
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?filtro=&correo=${correo}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener la factura por correo");
      }
  
      const data = await response.json();
      setFactura(Array.isArray(data) ? data : [data]); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchFacturaByTelefono = async (telefono) => {
    try {
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?filtro=&telefono=${telefono}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener la factura por telefono");
      }
  
      const data = await response.json();
      setFactura(Array.isArray(data) ? data : [data]); 
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const fetchContribuyentes = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?filtro=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?filtro=&id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener la factura");
      }

      const data = await response.json();
     
      if (Array.isArray(data) && data.length > 1) {
        const facturaFiltrada = data.filter((item) => item.id === parseInt(id));
        setFactura(facturaFiltrada);
      } else {
        setFactura(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { contribuyentes, fetchContribuyentes, fetchFacturaById,fetchFacturaByNit, fetchFacturaByDepartamento,fetchFacturaByMunicipio,fetchFacturaByDireccion,fetchFacturaByCorreo,fetchFacturaByTelefono  , factura, setFactura };
};

export default useListContribuyente;
