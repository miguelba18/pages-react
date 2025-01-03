import { useState, useEffect } from "react";
import HighlightedText from "../../../../../utils/HighlightedText";
import {
  RiDownloadLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import useListAlcalde from "../../../../hook/Facturas/Factura Completa/alcalde/useListAlcalde";
import useDescargarFacturas from "../../../../hook/Facturas/Factura Completa/admin/useDescargarFacturas";
import Select from "react-select";



const FacturaCompleta = () => {
  const {
    facturas,
    fetchFacturas,
    totalSuma,
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
  } = useListAlcalde();

  const [searchQuery] = useState("");
  
  const [selectedAnio, setSelectedAnio] = useState("");
  const { handleDownloadExcel } = useDescargarFacturas();
 
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNombresComerciales, setSelectedNombresComerciales] = useState(
    []
  );
  const [selectedTelefonosAdquirientes, setSelectedTelefonosAdquirientes] =
    useState([]);
  const [selectedCorreosAdquirientes, setSelectedCorreosAdquirientes] =
    useState([]);
  const [selectedDireccionesAdquirientes, setSelectedDireccionesAdquirientes] =
    useState([]);
  const [selectedMunicipiosAdquirientes, setSelectedMunicipiosAdquirientes] =
    useState([]);
  const [
    selectedDepartamentosAdquirientes,
    setSelectedDepartamentosAdquirientes,
  ] = useState([]);
  const [
    selectedNumerosDocumentoAdquirientes,
    setSelectedNumerosDocumentoAdquirientes,
  ] = useState([]);
  const [selectedNombresAdquirientes, setSelectedNombresAdquirientes] =
    useState([]);
  const [selectedNitsEmisores, setSelectedNitsEmisores] = useState([]);
  const [selectedTelefonosEmisores, setSelectedTelefonosEmisores] = useState(
    []
  );
  const [selectedCorreosEmisores, setSelectedCorreosEmisores] = useState([]);
  const [selectedDireccionesEmisores, setSelectedDireccionesEmisores] =
    useState([]);
  const [selectedMunicipiosEmisores, setSelectedMunicipiosEmisores] = useState(
    []
  );
  const [selectedDepartamentosEmisores, setSelectedDepartamentosEmisores] =
    useState([]);

  
  

 

  const itemsPerPage = 100;

  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    fetchFacturas(
      searchQuery,
      anio,
      "",
      selectedNombresComerciales,
      selectedTelefonosAdquirientes,
      selectedCorreosAdquirientes,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedNitsEmisores,
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedDireccionesEmisores,
      selectedMunicipiosEmisores,
      selectedDepartamentosEmisores
    );
  };

  useEffect(() => {
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedTelefonosAdquirientes,
      selectedCorreosAdquirientes,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedNitsEmisores,
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedDireccionesEmisores,
      selectedMunicipiosEmisores,
      selectedDepartamentosEmisores
    );
  }, [
    searchQuery,
    selectedAnio,
    selectedNombresComerciales,
    selectedTelefonosAdquirientes,
    selectedCorreosAdquirientes,
    selectedDireccionesAdquirientes,
    selectedMunicipiosAdquirientes,
    selectedDepartamentosAdquirientes,
    selectedNumerosDocumentoAdquirientes,
    selectedNombresAdquirientes,
    selectedNitsEmisores,
    selectedTelefonosEmisores,
    selectedCorreosEmisores,
    selectedDireccionesEmisores,
    selectedMunicipiosEmisores,
    selectedDepartamentosEmisores,
    fetchFacturas,
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facturas.slice(indexOfFirstItem, indexOfLastItem);
  const handleDownload = () => {
    handleDownloadExcel({
      filtro: "",
      ciudad: "", 
      anio: selectedAnio, 
      codigoUnico: "", 
      nombreComercialEmisor: selectedNombresComerciales, 
      telefonoAdquiriente: selectedTelefonosAdquirientes,
      correoAdquiriente: selectedCorreosAdquirientes, 
      direccionAdquiriente: selectedDireccionesAdquirientes, 
      municipioAdquiriente: selectedMunicipiosAdquirientes, 
      departamentoAdquiriente: selectedDepartamentosAdquirientes, 
      numeroDocumentoAdquiriente: selectedNumerosDocumentoAdquirientes, 
      nombreAdquiriente: selectedNombresAdquirientes, 
      nitEmisor: selectedNitsEmisores, 
      telefonoEmisor: selectedTelefonosEmisores, 
      correoEmisor: selectedCorreosEmisores,
      direccionEmisor: selectedDireccionesEmisores, 
      municipioEmisor: selectedMunicipiosEmisores,
      departamentoEmisor: selectedDepartamentosEmisores 
    });
  };
  

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: "38px",
      fontSize: "14px",
      minWidth: "200px",
      width: "100%",
      boxSizing: "border-box",
      border: "1px solid #ccc",
      borderRadius: "4px",
      "&:hover": {
        borderColor: "#888",
      },
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused ? "#f0f0f0" : isSelected ? "#eaeaea" : null,
      color: "#333",
      fontWeight: isSelected ? "bold" : "normal",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e0e0e0",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#000",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ff0000",
      ":hover": {
        backgroundColor: "#f00",
        color: "#fff",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999",
    }),
  };
  const resetAllSelectsExcept = (excludedSetter) => {
    const allSetters = [
      setSelectedNombresComerciales,
      setSelectedNitsEmisores,
      setSelectedTelefonosAdquirientes,
      setSelectedCorreosAdquirientes,
      setSelectedDireccionesAdquirientes,
      setSelectedMunicipiosAdquirientes,
      setSelectedDepartamentosAdquirientes,
      setSelectedNumerosDocumentoAdquirientes,
      setSelectedNombresAdquirientes,
      setSelectedTelefonosEmisores,
      setSelectedCorreosEmisores,
      setSelectedDireccionesEmisores,
      setSelectedMunicipiosEmisores,
      setSelectedDepartamentosEmisores,
    ];
  
    allSetters.forEach((setter) => {
      if (setter !== excludedSetter) {
        setter([]); 
      }
    });
  };
  
  const getNombresComercialesOptions = (nombresComerciales) => {
    return nombresComerciales.map((nombre) => ({
      value: nombre,
      label: nombre,
    }));
  };
  const handleSelectNombresComerciales = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedNombresComerciales(selectedValues);
  
  
    resetAllSelectsExcept(setSelectedNombresComerciales);
  
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedValues,  
      selectedTelefonosAdquirientes,
      selectedCorreosAdquirientes,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedNitsEmisores,
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedDireccionesEmisores,
      selectedMunicipiosEmisores,
      selectedDepartamentosEmisores
    );
  };
  
  const getNitsEmisoresOptions = (nitsEmisores) => {
    return nitsEmisores.map((nit) => ({
      value: nit,
      label: nit,
    }));
  };
  const handleSelectNitsEmisores = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedNitsEmisores(selectedValues);
  
    
    resetAllSelectsExcept(setSelectedNitsEmisores);
  
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedTelefonosAdquirientes,
      selectedCorreosAdquirientes,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedValues, 
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedDireccionesEmisores,
      selectedMunicipiosEmisores,
      selectedDepartamentosEmisores
    );
  };
  
  const getTelefonosAdquirientesOptions = (telefonosAdquirientes) => {
    return telefonosAdquirientes.map((telefono) => ({
      value: telefono,
      label: telefono,
    }));
  };
  const handleSelectTelefonosAdquirientes = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedTelefonosAdquirientes(selectedValues);
    
    resetAllSelectsExcept(setSelectedTelefonosAdquirientes);
    
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedValues,
      selectedCorreosAdquirientes,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedNitsEmisores,
      selectedValues,
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedDireccionesEmisores,
      selectedMunicipiosEmisores,
      selectedDepartamentosEmisores
    );
  };
  
  const getCorreosAdquirientesOptions = (correosAdquirientes) => {
    return correosAdquirientes.map((correo) => ({
      value: correo,
      label: correo,
    }));
  };
  const handleSelectCorreosAdquirientes = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedCorreosAdquirientes(selectedValues);
    
    resetAllSelectsExcept(setSelectedCorreosAdquirientes);
    
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedNitsEmisores,
      selectedValues,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedValues,
      selectedDireccionesEmisores,
      selectedMunicipiosEmisores,
      selectedDepartamentosEmisores
    );
  };
  
  const getDireccionesAdquirientesOptions = (direccionesAdquirientes) => {
    return direccionesAdquirientes.map((direccion) => ({
      value: direccion,
      label: direccion,
    }));
  };
  const handleSelectDireccionesAdquirientes = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedDireccionesAdquirientes(selectedValues);
    
    resetAllSelectsExcept(setSelectedDireccionesAdquirientes);
    
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedNitsEmisores,
      selectedTelefonosAdquirientes,
      selectedValues,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedDireccionesEmisores,
      selectedMunicipiosEmisores,
      selectedDepartamentosEmisores
    );
  };
  
  const getMunicipiosAdquirientesOptions = (municipiosAdquirientes) => {
    return municipiosAdquirientes.map((municipio) => ({
      value: municipio,
      label: municipio,
    }));
  };
  const handleSelectMunicipiosAdquirientes = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedMunicipiosAdquirientes(selectedValues);
    
    resetAllSelectsExcept(setSelectedMunicipiosAdquirientes);
    
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedNitsEmisores,
      selectedTelefonosAdquirientes,
      selectedCorreosAdquirientes,
      selectedValues,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedDireccionesEmisores,
      selectedValues,
      selectedDepartamentosEmisores
    );
  };
  
  const getDepartamentosAdquirientesOptions = (departamentosAdquirientes) => {
    return departamentosAdquirientes.map((departamento) => ({
      value: departamento,
      label: departamento,
    }));
  };
  const handleSelectDepartamentosAdquirientes = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedDepartamentosAdquirientes(selectedValues);
    
    resetAllSelectsExcept(setSelectedDepartamentosAdquirientes);
    
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedNitsEmisores,
      selectedTelefonosAdquirientes,
      selectedCorreosAdquirientes,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedValues,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedDireccionesEmisores,
      selectedMunicipiosEmisores,
      selectedValues
    );
  };
  
  const getNombresAdquirientesOptions = (nombresAdquirientes) => {
    return nombresAdquirientes.map((nombre) => ({
      value: nombre,
      label: nombre,
    }));
  };
  const handleSelectNombresAdquirientes = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedNombresAdquirientes(selectedValues);
    
    resetAllSelectsExcept(setSelectedNombresAdquirientes);
    
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedNitsEmisores,
      selectedTelefonosAdquirientes,
      selectedCorreosAdquirientes,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedValues,
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedDireccionesEmisores,
      selectedMunicipiosEmisores,
      selectedDepartamentosEmisores
    );
  };
  const getNumerosDocumentoAdquirientesOptions = (numerosDocumentoAdquirientes) => {
    return numerosDocumentoAdquirientes.map((numero) => ({
      value: numero,
      label: numero,
    }));
  };
  const handleSelectNumerosDocumentoAdquirientes = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedNumerosDocumentoAdquirientes(selectedValues);
    
    resetAllSelectsExcept(setSelectedNumerosDocumentoAdquirientes);
    
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedNitsEmisores,
      selectedTelefonosAdquirientes,
      selectedCorreosAdquirientes,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedValues,
      selectedNombresAdquirientes,
      selectedTelefonosEmisores,
      selectedValues,
      selectedDireccionesEmisores,
      selectedMunicipiosEmisores,
      selectedDepartamentosEmisores
    );
  };
  
  
  
  const getTelefonosEmisoresOptions = (telefonosEmisores) => {
    return telefonosEmisores.map((telefono) => ({
      value: telefono,
      label: telefono,
    }));
  };
  const handleSelectTelefonosEmisores = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedTelefonosEmisores(selectedValues);
    
    resetAllSelectsExcept(setSelectedTelefonosEmisores);
    
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedNitsEmisores,
      selectedValues,
      selectedCorreosAdquirientes,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedDireccionesEmisores,
      selectedMunicipiosEmisores,
      selectedDepartamentosEmisores
    );
  };
  
  const getCorreosEmisoresOptions = (correosEmisores) => {
    return correosEmisores.map((correo) => ({
      value: correo,
      label: correo,
    }));
  };
  const handleSelectCorreosEmisores = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedCorreosEmisores(selectedValues);
    
    resetAllSelectsExcept(setSelectedCorreosEmisores);
    
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedNitsEmisores,
      selectedTelefonosAdquirientes,
      selectedValues,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedTelefonosEmisores,
      selectedValues,
      selectedMunicipiosEmisores,
      selectedDepartamentosEmisores
    );
  };
  
  const getDireccionesEmisoresOptions = (direccionesEmisores) => {
    return direccionesEmisores.map((direccion) => ({
      value: direccion,
      label: direccion,
    }));
  };
  const handleSelectDireccionesEmisores = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedDireccionesEmisores(selectedValues);
    
    resetAllSelectsExcept(setSelectedDireccionesEmisores);
    
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedNitsEmisores,
      selectedTelefonosAdquirientes,
      selectedCorreosAdquirientes,
      selectedValues,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedValues,
      selectedDepartamentosEmisores
    );
  };
  
  const getMunicipiosEmisoresOptions = (municipiosEmisores) => {
    return municipiosEmisores.map((municipio) => ({
      value: municipio,
      label: municipio,
    }));
  };
  const handleSelectMunicipiosEmisores = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedMunicipiosEmisores(selectedValues);
    
    resetAllSelectsExcept(setSelectedMunicipiosEmisores);
    
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedNitsEmisores,
      selectedTelefonosAdquirientes,
      selectedCorreosAdquirientes,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedDepartamentosAdquirientes,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedDireccionesEmisores,
      selectedValues,
      selectedDepartamentosEmisores
    );
  };
  const getDepartamentosEmisoresOptions = (departamentosEmisores) => {
    return departamentosEmisores.map((departamento) => ({
      value: departamento,
      label: departamento,
    }));
  };
  const handleSelectDepartamentosEmisores = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedDepartamentosEmisores(selectedValues);
    
    resetAllSelectsExcept(setSelectedDepartamentosEmisores);
    
    fetchFacturas(
      searchQuery,
      selectedAnio,
      "",
      selectedNombresComerciales,
      selectedNitsEmisores,
      selectedTelefonosAdquirientes,
      selectedCorreosAdquirientes,
      selectedDireccionesAdquirientes,
      selectedMunicipiosAdquirientes,
      selectedValues,
      selectedNumerosDocumentoAdquirientes,
      selectedNombresAdquirientes,
      selectedTelefonosEmisores,
      selectedCorreosEmisores,
      selectedDireccionesEmisores,
      selectedMunicipiosEmisores,
      selectedValues
    );
  };




  

  

  return (
    <div>
      <div className="xl:flex justify-between">
        <h1 className="font-bold text-3xl text-secundary">Facturas Completas</h1>
        <div className="xl:relative mr-4">
          <button
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>
      </div>

      <div className="flex  justify-between">
          <div className="flex">
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowLeftSLine />
              </button>
              <span className="mt-2 text-sm">{`Página ${currentPage} de ${Math.ceil(
                facturas.length / itemsPerPage
              )}`}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(facturas.length / itemsPerPage)
                }
                className="p-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowRightSLine />
              </button>
            </div>
          </div>
          <div className="items-center  mt-2  flex justify-end font-bold">
            <p>Total facturas: ${totalSuma}</p>
          </div>
        </div>


      

      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-2">
        
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white">#</th>
              <th className="px-4 py-2 bg-secundary text-white">
                Fecha
                <select
                  id="anio"
                  value={selectedAnio}
                  onChange={(e) => handleAnioChange(e.target.value)}
                  className="p-1 rounded border border-gray-300 text-black"
                >
                  <option value="">Todos</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">CUFE</th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre Comercial vendedor
                <Select
                  options={getNombresComercialesOptions(nombresComerciales)}
                  value={getNombresComercialesOptions(
                    selectedNombresComerciales
                  )}
                  onChange={handleSelectNombresComerciales}
                  placeholder="Selecciona nombre comercial"
                  isMulti
                  styles={customStyles}
           
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                NIT vendedor
                <Select
                  options={getNitsEmisoresOptions(nitsEmisores)}
                  value={getNitsEmisoresOptions(
                    selectedNitsEmisores
                  )}
                  onChange={handleSelectNitsEmisores}
                  placeholder="Selecciona nit Emisor"
                  isMulti
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
                
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento vendedor
                <Select
                  options={getDepartamentosEmisoresOptions(departamentosEmisores)}
                  value={getDepartamentosEmisoresOptions(
                    selectedDepartamentosEmisores
                  )}
                  onChange={handleSelectDepartamentosEmisores}
                  placeholder="Selecciona Departamento Emisor"
                  isMulti
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
                
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio vendedor
                <Select
                  options={getMunicipiosEmisoresOptions(municipiosEmisores)}
                  value={getMunicipiosEmisoresOptions(
                    selectedMunicipiosEmisores
                  )}
                  onChange={handleSelectMunicipiosEmisores}
                  placeholder="Selecciona Municipio Emisor"
                  isMulti
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección vendedor
                <Select
                  options={getDireccionesEmisoresOptions(direccionesEmisores)}
                  value={getDireccionesEmisoresOptions(
                    selectedDireccionesEmisores
                  )}
                  onChange={handleSelectDireccionesEmisores}
                  placeholder="Selecciona direccion emisor"
                  isMulti
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo vendedor
                <Select
                  options={getCorreosEmisoresOptions(correosEmisores)}
                  value={getCorreosEmisoresOptions(
                    selectedCorreosEmisores
                  )}
                  onChange={handleSelectCorreosEmisores}
                  placeholder="Selecciona Correo Emisor"
                  isMulti
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Vendedor
                <Select
                  options={getTelefonosEmisoresOptions(telefonosEmisores)}
                  value={getTelefonosEmisoresOptions(
                    selectedTelefonosEmisores
                  )}
                  onChange={handleSelectTelefonosEmisores}
                  placeholder="Selecciona Telefono Emisor"
                  isMulti
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
                
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre adquiriente
                <Select
                  options={getNombresAdquirientesOptions(nombresAdquirientes)}
                  value={getNombresAdquirientesOptions(
                    selectedNombresAdquirientes
                  )}
                  onChange={handleSelectNombresAdquirientes}
                  placeholder="Selecciona Nombre Comprador"
                  isMulti
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                # Documento comprador
                <Select
                  options={getNumerosDocumentoAdquirientesOptions(numerosDocumentoAdquirientes)}
                  value={getNumerosDocumentoAdquirientesOptions(
                    selectedNumerosDocumentoAdquirientes
                  )}
                  onChange={handleSelectNumerosDocumentoAdquirientes}
                  placeholder="Selecciona Correo Emisor"
                  isMulti
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento comprador
                <Select
                  options={getDepartamentosAdquirientesOptions(departamentosAdquirientes)}
                  value={getDepartamentosAdquirientesOptions(
                    selectedDepartamentosAdquirientes
                  )}
                  onChange={handleSelectDepartamentosAdquirientes}
                  placeholder="Selecciona Departamento Comprador"
                  isMulti
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio comprador
                <Select
                  options={getMunicipiosAdquirientesOptions(municipiosAdquirientes)}
                  value={getMunicipiosAdquirientesOptions(
                    selectedMunicipiosAdquirientes
                  )}
                  onChange={handleSelectMunicipiosAdquirientes}
                  placeholder="Selecciona Municipio Comprador"
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección comprador
                <Select
                  options={getDireccionesAdquirientesOptions(direccionesAdquirientes)}
                  value={getDireccionesAdquirientesOptions(
                    selectedDireccionesAdquirientes
                  )}
                  onChange={handleSelectDireccionesAdquirientes}
                  placeholder="Selecciona Direccion Comprador"
                  isMulti
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo comprador
                <Select
                  options={getCorreosAdquirientesOptions(correosAdquirientes)}
                  value={getCorreosAdquirientesOptions(
                    selectedCorreosAdquirientes
                  )}
                  onChange={handleSelectCorreosAdquirientes}
                  placeholder="Selecciona Correo Comprador"
                  isMulti
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Comprador
                <Select
                  options={getTelefonosAdquirientesOptions(telefonosAdquirientes)}
                  value={getTelefonosAdquirientesOptions(
                    selectedTelefonosAdquirientes
                  )}
                  onChange={handleSelectTelefonosAdquirientes}
                  placeholder="Selecciona Telefono Comprador"
                  isMulti
                  styles={customStyles}
                  
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Total acumulado
              </th>
              
            </tr>
          </thead>
          <tbody>
            {facturas.length === 0 && selectedAnio ? (
              <tr>
                <td colSpan="17" className="px-4 py-2 text-red-500 text-center">
                  Este año no tiene facturas disponibles
                </td>
              </tr>
            ) : (
              currentItems.map((factura, index) => (
                <tr
                  key={factura.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 whitespace-nowrap"
                      : "bg-white whitespace-nowrap"
                  }
                >
                  <td className="border px-4 py-2 text-center">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.fechaEmision}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.codigoUnico}
                  </td>
                  <td className="border px-4">
                    <HighlightedText
                      text={factura.nombreComercialEmisor}
                      highlight={searchQuery}
                    />
                  </td>
                  <td className="border px-4 text-center">
                    <HighlightedText
                      text={factura.nitEmisor}
                      highlight={searchQuery}
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.departamentoEmisor}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.municipioEmisor}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.direccionEmisor}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.correoEmisor}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.telefonoEmisor}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.nombreAdquiriente}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.numeroDocumentoAdquiriente}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.departamentoAdquiriente}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.municipioAdquiriente}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.direccionAdquiriente}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.correoAdquiriente}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.telefonoAdquiriente}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    ${factura.subtotal}
                  </td>
                  
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white" colSpan="17">
                Total
              </th>
              <th className="border px-4 py-2">${totalSuma}</th>
              
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FacturaCompleta;
