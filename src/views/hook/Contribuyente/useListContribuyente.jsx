import { useState } from "react";
import useAuthToken from "../Token/useAuthToken";

const useListContribuyente = () => {
  const { token } = useAuthToken();
  const [contribuyentes, setContribuyentes] = useState([]);
  const [factura, setFactura] = useState([]);

  const fetchFacturaByNit = async (nits) => {
    try {
      const queryParams = nits.map((nit) => `nit=${encodeURIComponent(nit)}`).join('&');
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?${queryParams}`,
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

  const fetchFacturaByDepartamento = async (departamentos) => {
    try {
      const queryParams = departamentos.map(depto => `departamento=${encodeURIComponent(depto)}`).join('&');
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?${queryParams}`,
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

  const fetchFacturaByMunicipio = async (municipios) => {
    try {
      const queryParams = municipios.map(muni => `municipio=${encodeURIComponent(muni)}`).join('&');
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener la factura por Municipio");
      }

      const data = await response.json();
      setFactura(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchFacturaByDireccion = async (direcciones) => {
    try {
      const queryParams = direcciones.map(dir => `direccion=${encodeURIComponent(dir)}`).join('&');
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener la factura por Dirección");
      }

      const data = await response.json();
      setFactura(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchFacturaByCorreo = async (correos) => {
    try {
      const queryParams = correos.map(correo => `correo=${encodeURIComponent(correo)}`).join('&');
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener la factura por Correo");
      }

      const data = await response.json();
      setFactura(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchFacturaByTelefono = async (telefonos) => {
    try {
      const queryParams = telefonos.map(tel => `telefono=${encodeURIComponent(tel)}`).join('&');
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener la factura por Teléfono");
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
        `http://localhost:8080/contribuyente/listar?filtro=${encodeURIComponent(query)}`,
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
  
  const fetchFacturaById = async (selectedIds) => {
    try {
      const queryParams = selectedIds.map((id) => `id=${encodeURIComponent(id)}`).join('&');
      const response = await fetch(
        `http://localhost:8080/contribuyente/listar?${queryParams}`,
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
      setFactura(Array.isArray(data) ? data : [data]); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    contribuyentes,
    fetchContribuyentes,
    fetchFacturaById,
    fetchFacturaByNit,
    fetchFacturaByDepartamento,
    fetchFacturaByMunicipio,
    fetchFacturaByDireccion,
    fetchFacturaByCorreo,
    fetchFacturaByTelefono,
    factura,
    setFactura
  };
};

export default useListContribuyente;
