import useAuthToken from "../../../Token/useAuthToken";
import { useState, useCallback, useEffect } from "react";

const useListAlcalde = () => {
  const { token } = useAuthToken();
  const [facturas, setFacturas] = useState([]);
  const [totalSuma, setTotalSuma] = useState(0);
  
  const [nombresComerciales, setNombresComerciales] = useState([]);
  const [telefonosAdquirientes, setTelefonosAdquirientes] = useState([]);
  const [correosAdquirientes, setCorreosAdquirientes] = useState([]);
  const [direccionesAdquirientes, setDireccionesAdquirientes] = useState([]);
  const [municipiosAdquirientes, setMunicipiosAdquirientes] = useState([]);
  const [departamentosAdquirientes, setDepartamentosAdquirientes] = useState([]);
  const [numerosDocumentoAdquirientes, setNumerosDocumentoAdquirientes] = useState([]);
  const [nombresAdquirientes, setNombresAdquirientes] = useState([]);
  const [nitsEmisores, setNitsEmisores] = useState([]);
  const [telefonosEmisores, setTelefonosEmisores] = useState([]);
  const [correosEmisores, setCorreosEmisores] = useState([]);
  const [direccionesEmisores, setDireccionesEmisores] = useState([]);
  const [municipiosEmisores, setMunicipiosEmisores] = useState([]);
  const [departamentosEmisores, setDepartamentosEmisores] = useState([]);

  const fetchData = async (url, setter) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener datos desde ${url}`);
      }

      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error(`Error en fetchData desde ${url}:`, error);
    }
  };

  const fetchNombresComerciales = useCallback(() => fetchData("http://localhost:8080/factura/listar/nombreComercialEmisor", setNombresComerciales), [token]);
  const fetchTelefonosAdquirientes = useCallback(() => fetchData("http://localhost:8080/factura/listar/telefonoAdquiriente", setTelefonosAdquirientes), [token]);
  const fetchCorreosAdquirientes = useCallback(() => fetchData("http://localhost:8080/factura/listar/correoAdquiriente", setCorreosAdquirientes), [token]);
  const fetchDireccionesAdquirientes = useCallback(() => fetchData("http://localhost:8080/factura/listar/direccionAdquiriente", setDireccionesAdquirientes), [token]);
  const fetchMunicipiosAdquirientes = useCallback(() => fetchData("http://localhost:8080/factura/listar/municipioAdquiriente", setMunicipiosAdquirientes), [token]);
  const fetchDepartamentosAdquirientes = useCallback(() => fetchData("http://localhost:8080/factura/listar/departamentoAdquiriente", setDepartamentosAdquirientes), [token]);
  const fetchNumerosDocumentoAdquirientes = useCallback(() => fetchData("http://localhost:8080/factura/listar/numeroDocumentoAdquiriente", setNumerosDocumentoAdquirientes), [token]);
  const fetchNombresAdquirientes = useCallback(() => fetchData("http://localhost:8080/factura/listar/nombreAdquiriente", setNombresAdquirientes), [token]);
  const fetchNitsEmisores = useCallback(() => fetchData("http://localhost:8080/factura/listar/nitEmisor", setNitsEmisores), [token]);
  const fetchTelefonosEmisores = useCallback(() => fetchData("http://localhost:8080/factura/listar/telefonoEmisor", setTelefonosEmisores), [token]);
  const fetchCorreosEmisores = useCallback(() => fetchData("http://localhost:8080/factura/listar/correoEmisor", setCorreosEmisores), [token]);
  const fetchDireccionesEmisores = useCallback(() => fetchData("http://localhost:8080/factura/listar/direccionEmisor", setDireccionesEmisores), [token]);
  const fetchMunicipiosEmisores = useCallback(() => fetchData("http://localhost:8080/factura/listar/municipioEmisor", setMunicipiosEmisores), [token]);
  const fetchDepartamentosEmisores = useCallback(() => fetchData("http://localhost:8080/factura/listar/departamentoEmisor", setDepartamentosEmisores), [token]);

  const fetchFacturas = useCallback(
    async (query, anio, codigoUnico, nombreComercialEmisor = [], telefonoAdquiriente = [], correoAdquiriente = [], direccionAdquiriente = [], municipioAdquiriente = [], departamentoAdquiriente = [], numeroDocumentoAdquiriente = [], nombreAdquiriente = [], nitEmisor = [], telefonoEmisor = [], correoEmisor = [], direccionEmisor = [], municipioEmisor = [], departamentoEmisor = []) => {
      console.log("Iniciando fetchFacturas con filtros:", { query, anio, codigoUnico, nombreComercialEmisor, nitEmisor });
      try {
        let url = `http://localhost:8080/factura/listar`;
        const params = new URLSearchParams();
  
        if (query) {
          params.append("filtro", query);
        }
        if (anio) {
          params.append("anio", anio);
        }
        if (codigoUnico) {
          params.append("codigoUnico", codigoUnico);
        }
        if (nombreComercialEmisor.length > 0) {
          params.append("nombreComercialEmisor", nombreComercialEmisor.join(","));
        }
        if (telefonoAdquiriente.length > 0) {
          params.append("telefonoAdquiriente", telefonoAdquiriente.join(","));
        }
        if (correoAdquiriente.length > 0) {
          params.append("correoAdquiriente", correoAdquiriente.join(","));
        }
        if (direccionAdquiriente.length > 0) {
          params.append("direccionAdquiriente", direccionAdquiriente.join(","));
        }
        if (municipioAdquiriente.length > 0) {
          params.append("municipioAdquiriente", municipioAdquiriente.join(","));
        }
        if (departamentoAdquiriente.length > 0) {
          params.append("departamentoAdquiriente", departamentoAdquiriente.join(","));
        }
        if (numeroDocumentoAdquiriente.length > 0) {
          params.append("numeroDocumentoAdquiriente", numeroDocumentoAdquiriente.join(","));
        }
        if (nombreAdquiriente.length > 0) {
          params.append("nombreAdquiriente", nombreAdquiriente.join(","));
        }
        if (nitEmisor.length > 0) {
          params.append("nitEmisor", nitEmisor.join(","));
        }
        if (telefonoEmisor.length > 0) {
          params.append("telefonoEmisor", telefonoEmisor.join(","));
        }
        if (correoEmisor.length > 0) {
          params.append("correoEmisor", correoEmisor.join(","));
        }
        if (direccionEmisor.length > 0) {
          params.append("direccionEmisor", direccionEmisor.join(","));
        }
        if (municipioEmisor.length > 0) {
          params.append("municipioEmisor", municipioEmisor.join(","));
        }
        if (departamentoEmisor.length > 0) {
          params.append("departamentoEmisor", departamentoEmisor.join(","));
        }
  
        if (params.toString()) {
          url += `?${params.toString()}`;
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
        console.log("Datos obtenidos de fetchFacturas:", data);
        setFacturas(data.facturas);
        setTotalSuma(data.totalSuma);
      } catch (error) {
        console.error("Error en fetchFacturas:", error);
        setFacturas([]); 
      }
    },
    [token]
  );

  useEffect(() => {
    fetchNombresComerciales();
    fetchTelefonosAdquirientes();
    fetchCorreosAdquirientes();
    fetchDireccionesAdquirientes();
    fetchMunicipiosAdquirientes();
    fetchDepartamentosAdquirientes();
    fetchNumerosDocumentoAdquirientes();
    fetchNombresAdquirientes();
    fetchNitsEmisores();
    fetchTelefonosEmisores();
    fetchCorreosEmisores();
    fetchDireccionesEmisores();
    fetchMunicipiosEmisores();
    fetchDepartamentosEmisores();
  }, [
    fetchNombresComerciales,
    fetchTelefonosAdquirientes,
    fetchCorreosAdquirientes,
    fetchDireccionesAdquirientes,
    fetchMunicipiosAdquirientes,
    fetchDepartamentosAdquirientes,
    fetchNumerosDocumentoAdquirientes,
    fetchNombresAdquirientes,
    fetchNitsEmisores,
    fetchTelefonosEmisores,
    fetchCorreosEmisores,
    fetchDireccionesEmisores,
    fetchMunicipiosEmisores,
    fetchDepartamentosEmisores
  ]);

  return {
    facturas,
    totalSuma,
    fetchFacturas,
    nombresComerciales,
    telefonosAdquirientes,
    correosAdquirientes,
    direccionesAdquirientes,
    municipiosAdquirientes,
    departamentosAdquirientes,
    numerosDocumentoAdquirientes,
    nombresAdquirientes,
    nitsEmisores,
    telefonosEmisores,
    correosEmisores,
    direccionesEmisores,
    municipiosEmisores,
    departamentosEmisores,
  };
};

export default useListAlcalde;
