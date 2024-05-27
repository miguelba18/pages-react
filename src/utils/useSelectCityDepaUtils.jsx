import { useState, useEffect } from "react";
import axios from "axios";
import useAuthToken from "../views/hook/Token/useAuthToken";
import { toast } from "react-toastify";

const useSelectCityDepaUtils = () => {
  const { token } = useAuthToken();
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [filteredCiudades, setFilteredCiudades] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedCiudad, setSelectedCiudad] = useState("");

  useEffect(() => {
    if (!token) {
      toast.error("No hay token de autenticación.");
    }

  
    axios.get("http://localhost:8080/departamentos", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setDepartamentos(response.data);
    })
    .catch(error => {
      console.error("Error fetching departamentos:", error);
    });

    
    axios.get("http://localhost:8080/ciudades", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setCiudades(response.data);
    })
    .catch(error => {
      console.error("Error fetching ciudades:", error);
    });
  }, [token]);

  useEffect(() => {
    if (selectedDepartamento) {
      const filtered = ciudades.filter(
        ciudad => ciudad.departamento.id === parseInt(selectedDepartamento)
      );
      setFilteredCiudades(filtered);
    } else {
      setFilteredCiudades([]);
    }
  }, [selectedDepartamento, ciudades]);

  const handleDepartamentoChange = (e) => {
    setSelectedDepartamento(e.target.value);
    setSelectedCiudad("");
  };

  const handleCiudadChange = (e) => {
    setSelectedCiudad(e.target.value);
  };

  return {departamentos,
    filteredCiudades,
    selectedDepartamento,
    selectedCiudad,
    handleDepartamentoChange,
    handleCiudadChange,
    setDepartamentos,
  setSelectedCiudad,
setSelectedDepartamento,}
    
  
};

export default useSelectCityDepaUtils;
