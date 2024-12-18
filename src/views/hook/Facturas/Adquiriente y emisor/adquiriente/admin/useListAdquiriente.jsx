
import useAuthToken from "../../../../Token/useAuthToken";
import { useEffect, useState, useCallback } from "react";
import useSelectCityDepaUtils from "../../../../../../utils/useSelectCityDepaUtils";
const useListAdquiriente = () => {
  const { token } = useAuthToken();
  const [facturas, setFacturas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnio, setSelectedAnio] = useState("");

  
  
  const fetchFacturas = useCallback(
    async (ciudad, query, anio, tipo="adquirientes") => {
      try {
        const tipoString = typeof tipo === 'string' ? tipo : "adquirientes";
        let url = `http://localhost:8080/factura/persona`;
        const params = new URLSearchParams();

        if (ciudad) {
          params.append("ciudad", ciudad);
        }
        if (query) {
          params.append("filtro", query);
        }
        if (anio) {
          params.append("anio", anio);
        }
        if (tipo) {
          params.append("tipo", tipoString);
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
        setFacturas(data);
    
      } catch (error) {
        console.error(error);
        setFacturas([]);
      }
    },
    [token]
  );
  const handleSearch = (query, anio) => {
    setSearchQuery(query);
    fetchFacturas(selectedCiudad, query, anio);

  };

  const {
    departamentos,
    filteredCiudades,
    selectedDepartamento,
    selectedCiudad,
    handleDepartamentoChange,
    handleCiudadChange,
  } = useSelectCityDepaUtils();

  useEffect(() => {
    if (selectedCiudad) {
      fetchFacturas(selectedCiudad, searchQuery); 
    } else {
      setFacturas([]);
    }
  }, [fetchFacturas, selectedCiudad, searchQuery]);

  useEffect(() => {
    setFacturas([]); 
  }, [selectedDepartamento]);
  

  return {  handleSearch, facturas, departamentos, filteredCiudades, handleCiudadChange, handleDepartamentoChange, selectedCiudad, selectedDepartamento, searchQuery, fetchFacturas, selectedAnio, setSelectedAnio };
};

export default useListAdquiriente;
  

