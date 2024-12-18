import { useState, useCallback, useEffect } from "react";
import useAuthToken from "../Token/useAuthToken";

const useListOtrosTipos = () => {
  const { token } = useAuthToken();
  const [consorcios, setConsorcios] = useState([]);

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
        throw new Error("Error al obtener los datos");
      }

      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error(`Error en fetchData desde ${url}:`, error);
    }
  };

  const listConsorcios = useCallback(async (params) => {
    try {
      const url = new URL("http://localhost:8080/consorcio/listarnuevoaver");
      const queryParams = new URLSearchParams(params);
      url.search = queryParams.toString();

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
      setConsorcios(data.facturas || data);
    } catch (error) {
      console.error("Error en listConsorcios:", error);
      setConsorcios([]);
    }
  }, [token]);

  
  useEffect(() => {
    fetchData("http://localhost:8080/consorcio/listar/nombreComercialEmisor", setNombresComerciales);
    fetchData("http://localhost:8080/consorcio/listar/telefonoAdquiriente", setTelefonosAdquirientes);
    fetchData("http://localhost:8080/consorcio/listar/correoAdquiriente", setCorreosAdquirientes);
    fetchData("http://localhost:8080/consorcio/listar/direccionAdquiriente", setDireccionesAdquirientes);
    fetchData("http://localhost:8080/consorcio/listar/municipioAdquiriente", setMunicipiosAdquirientes);
    fetchData("http://localhost:8080/consorcio/listar/departamentoAdquiriente", setDepartamentosAdquirientes);
    fetchData("http://localhost:8080/consorcio/listar/numeroDocumentoAdquiriente", setNumerosDocumentoAdquirientes);
    fetchData("http://localhost:8080/consorcio/listar/nombreAdquiriente", setNombresAdquirientes);
    fetchData("http://localhost:8080/consorcio/listar/nitEmisor", setNitsEmisores);
    fetchData("http://localhost:8080/consorcio/listar/telefonoEmisor", setTelefonosEmisores);
    fetchData("http://localhost:8080/consorcio/listar/correoEmisor", setCorreosEmisores);
    fetchData("http://localhost:8080/consorcio/listar/direccionEmisor", setDireccionesEmisores);
    fetchData("http://localhost:8080/consorcio/listar/municipioEmisor", setMunicipiosEmisores);
    fetchData("http://localhost:8080/consorcio/listar/departamentoEmisor", setDepartamentosEmisores);
  }, [token]);

  return {
    consorcios,
    listConsorcios,
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

export default useListOtrosTipos;
