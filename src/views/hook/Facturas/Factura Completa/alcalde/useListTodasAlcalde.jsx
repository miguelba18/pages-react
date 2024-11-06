import useAuthToken from "../../../Token/useAuthToken";
import { useState, useCallback, useEffect } from "react";

const useListTodasAlcalde = () => {
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

  const fetchNombresComerciales = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/nombreComercialEmisor", setNombresComerciales), [token]);
  const fetchTelefonosAdquirientes = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/telefonoAdquiriente", setTelefonosAdquirientes), [token]);
  const fetchCorreosAdquirientes = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/correoAdquiriente", setCorreosAdquirientes), [token]);
  const fetchDireccionesAdquirientes = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/direccionAdquiriente", setDireccionesAdquirientes), [token]);
  const fetchMunicipiosAdquirientes = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/municipioAdquiriente", setMunicipiosAdquirientes), [token]);
  const fetchDepartamentosAdquirientes = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/departamentoAdquiriente", setDepartamentosAdquirientes), [token]);
  const fetchNumerosDocumentoAdquirientes = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/numeroDocumentoAdquiriente", setNumerosDocumentoAdquirientes), [token]);
  const fetchNombresAdquirientes = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/nombreAdquiriente", setNombresAdquirientes), [token]);
  const fetchNitsEmisores = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/nitEmisor", setNitsEmisores), [token]);
  const fetchTelefonosEmisores = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/telefonoEmisor", setTelefonosEmisores), [token]);
  const fetchCorreosEmisores = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/correoEmisor", setCorreosEmisores), [token]);
  const fetchDireccionesEmisores = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/direccionEmisor", setDireccionesEmisores), [token]);
  const fetchMunicipiosEmisores = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/municipioEmisor", setMunicipiosEmisores), [token]);
  const fetchDepartamentosEmisores = useCallback(() => fetchData("http://localhost:8080/facturatodas/listar/departamentoEmisor", setDepartamentosEmisores), [token]);

  const fetchFacturas = useCallback(
    async (
      anio,
      nombreComercialEmisor = [],
      telefonoAdquiriente = [],
      correoAdquiriente = [],
      direccionAdquiriente = [],
      municipioAdquiriente = [],
      departamentoAdquiriente = [],
      numeroDocumentoAdquiriente = [],
      nombreAdquiriente = [],
      nitEmisor = [],
      telefonoEmisor = [],
      correoEmisor = [],
      direccionEmisor = [],
      municipioEmisor = [],
      departamentoEmisor = []
    ) => {
      try {
        let url = `http://localhost:8080/facturatodas/listar`;
        const params = new URLSearchParams();

        if (anio) {
          params.append("anio", anio);
        }

        if (nombreComercialEmisor.length > 0) {
          params.append(
            "nombreComercialEmisor",
            nombreComercialEmisor.join(",")
          );
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
          params.append(
            "departamentoAdquiriente",
            departamentoAdquiriente.join(",")
          );
        }
        if (numeroDocumentoAdquiriente.length > 0) {
          params.append(
            "numeroDocumentoAdquiriente",
            numeroDocumentoAdquiriente.join(",")
          );
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
          throw new Error("Error al obtener las facturas con filtros");
        }

        const data = await response.json();
        setFacturas(data.facturas);
        setTotalSuma(data.totalSuma);
      } catch (error) {
        console.error("Error en fetchFacturasConFiltros:", error);
        setFacturas([]);
      }
    },
    [token]
  );

  const fetchFacturasPorNit = useCallback(
    async (filtroNit) => {
      try {
        const url = `http://localhost:8080/facturatodas/buscar/porFiltro?filtro=${filtroNit}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las facturas por NIT");
        }

        const data = await response.json();
        setFacturas(data);
      } catch (error) {
        console.error("Error en fetchFacturasPorNit:", error);
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
    fetchFacturasPorNit,
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

export default useListTodasAlcalde;
