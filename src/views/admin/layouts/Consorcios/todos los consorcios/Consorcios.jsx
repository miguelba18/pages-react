import { useState, useEffect } from "react";
import useListConsorcios from "../../../../hook/Consorcios/useListConsorcios";

import {
  RiSearchLine,
  RiDownloadLine,
  RiDeleteBin5Fill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import useDescargarConsorcios from "../../../../hook/Consorcios/useDescargarConsorcios";
import HighlightedText from "../../../../../utils/HighlightedText";

import useDeleteConsorcios from "../../../../hook/Consorcios/useDeleteConsorcios";
import Modal from "../../../../modal/Modal";
import Select from "react-select";
const Consorcios = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [resetAnio, setResetAnio] = useState(false);
  const { handleDownloadExcel } = useDescargarConsorcios();
  const [facturasDisponibles, setFacturasDisponibles] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [facturaToDelete, setFacturaToDelete] = useState(null);
  const { deleteConsorcio } = useDeleteConsorcios();
  const [selectedAnio, setSelectedAnio] = useState("");
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const { consorcios, listConsorcios,nombresComerciales,
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
    departamentosEmisores, } = useListConsorcios();

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consorcios.slice(indexOfFirstItem, indexOfLastItem);

  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    listConsorcios("", anio)
      .then((facturas) => {
        setFacturasDisponibles(facturas.length > 0);
      })
      .catch(() => {
        setFacturasDisponibles(false);
      });
  };
  useEffect(() => {
    const params = {
      filtro: searchQuery,
      anio: selectedAnio,
      nombreComercialEmisor: selectedNombresComerciales.join(","),
      telefonoAdquiriente: selectedTelefonosAdquirientes.join(","),
      correoAdquiriente: selectedCorreosAdquirientes.join(","),
      direccionAdquiriente: selectedDireccionesAdquirientes.join(","),
      municipioAdquiriente: selectedMunicipiosAdquirientes.join(","),
      departamentoAdquiriente: selectedDepartamentosAdquirientes.join(","),
      numeroDocumentoAdquiriente:
        selectedNumerosDocumentoAdquirientes.join(","),
      nombreAdquiriente: selectedNombresAdquirientes.join(","),
      nitEmisor: selectedNitsEmisores.join(","),
      telefonoEmisor: selectedTelefonosEmisores.join(","),
      correoEmisor: selectedCorreosEmisores.join(","),
      direccionEmisor: selectedDireccionesEmisores.join(","),
      municipioEmisor: selectedMunicipiosEmisores.join(","),
      departamentoEmisor: selectedDepartamentosEmisores.join(","),
    };

    listConsorcios(params);
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
    listConsorcios,
  ]);

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
      departamentoEmisor: selectedDepartamentosEmisores,
    });
  };
  const handleSearch = (query, anio) => {
    setSearchQuery("");
    setSearchQuery(query);
    listConsorcios(query, anio);
  };

  const handleSearchWithResetAnio = (query) => {
    setSelectedAnio("");
    handleSearch(query, "");
    setResetAnio(true);
  };
  useEffect(() => {
    if (resetAnio) {
      setResetAnio(false);
    }
  }, [resetAnio]);

  useEffect(() => {
    const total = consorcios.reduce((sum, consorcio) => {
      const subtotalStr = consorcio.subtotal.replace(/\./g, "");
      const subtotal = parseFloat(subtotalStr.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);
    setTotalSubtotal(total);
  }, [consorcios]);
  const openDeleteModal = (factura) => {
    setFacturaToDelete(factura);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    handleDelete();
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setFacturaToDelete(null);
  };
  const handleDelete = () => {
    if (facturaToDelete) {
      deleteConsorcio(facturaToDelete.id);
      setIsDeleteModalOpen(false);
    }
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

   
  };
  const getNumerosDocumentoAdquirientesOptions = (
    numerosDocumentoAdquirientes
  ) => {
    return numerosDocumentoAdquirientes.map((numero) => ({
      value: numero,
      label: numero,
    }));
  };
  const handleSelectNumerosDocumentoAdquirientes = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedNumerosDocumentoAdquirientes(selectedValues);

    resetAllSelectsExcept(setSelectedNumerosDocumentoAdquirientes);

   
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

    
  };

  return (
    <div>
      <h1 className="font-bold text-3xl text-secundary">
        Todas las facturas No Vinculantes
      </h1>

      <div className="flex justify-end">
        {consorcios.length > 0 && (
          <div className="xl:relative mr-4">
            <button
              onClick={handleDownload}
              className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
            >
              <span className="hidden md:inline">Descargar facturas</span>
              <RiDownloadLine className="mr-0 xl:mr-2" />
            </button>
          </div>
        )}
        <div className="relative ">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchWithResetAnio(e.target.value)}
            className="rounded-[10px] shadow-xl  w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-secundary font-semibold " />
          </div>
        </div>
      </div>


        <>
          <div className="flex  justify-between">
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="  p-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowLeftSLine />
              </button>
              <span className="mt-2 mx-2 text-sm">{`Página ${currentPage} de ${Math.ceil(
                consorcios.length / itemsPerPage
              )}`}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(consorcios.length / itemsPerPage)
                }
                className="p-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowRightSLine />
              </button>
            </div>
            <div className="mt-4 text-right font-bold">
              <p>Total facturas: ${totalSubtotal.toLocaleString("de-DE")}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full mt-2">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-secundary text-white">#</th>
                  <th className="px-4 py-2 bg-secundary text-white">CUFE
                  <Select
                      
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                 
                  

                  
                
                  <th className="px-4 py-2 bg-secundary text-white">
                    Fecha Emision
                    
                    <br />
                    <select
                      onChange={(e) =>
                        handleAnioChange(e.target.value, facturasDisponibles)
                      }
                      value={selectedAnio}
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
                  
                 
                  <th className="px-4 py-2 bg-secundary text-white">
                    Departamento Vendedor
                    <Select
                      options={getDepartamentosEmisoresOptions(
                        departamentosEmisores
                      )}
                      value={getDepartamentosEmisoresOptions(
                        selectedDepartamentosEmisores
                      )}
                      onChange={handleSelectDepartamentosEmisores}
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Municipio Vendedor
                    <Select
                      options={getMunicipiosEmisoresOptions(municipiosEmisores)}
                      value={getMunicipiosEmisoresOptions(
                        selectedMunicipiosEmisores
                      )}
                      onChange={handleSelectMunicipiosEmisores}
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Dirección Vendedor
                    <Select
                      options={getDireccionesEmisoresOptions(direccionesEmisores)}
                      value={getDireccionesEmisoresOptions(
                        selectedDireccionesEmisores
                      )}
                      onChange={handleSelectDireccionesEmisores}
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Correo Vendedor
                    <Select
                      options={getCorreosEmisoresOptions(correosEmisores)}
                      value={getCorreosEmisoresOptions(selectedCorreosEmisores)}
                      onChange={handleSelectCorreosEmisores}
                      placeholder="Selecciona nombre comercial"
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
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Nombre Comercial Vendedor
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
                    NIT Vendedor
                    <Select
                      options={getNitsEmisoresOptions(nitsEmisores)}
                      value={getNitsEmisoresOptions(selectedNitsEmisores)}
                      onChange={handleSelectNitsEmisores}
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  
                  <th className="px-4 py-2 bg-secundary text-white">
                    Nombre Comprador
                    <Select
                      options={getNombresAdquirientesOptions(nombresAdquirientes)}
                      value={getNombresAdquirientesOptions(
                        selectedNombresAdquirientes
                      )}
                      onChange={handleSelectNombresAdquirientes}
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Numero Documento Comprador
                    <Select
                      options={getNumerosDocumentoAdquirientesOptions(
                        numerosDocumentoAdquirientes
                      )}
                      value={getNumerosDocumentoAdquirientesOptions(
                        selectedNumerosDocumentoAdquirientes
                      )}
                      onChange={handleSelectNumerosDocumentoAdquirientes}
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  
                  <th className="px-4 py-2 bg-secundary text-white">
                    Departamento Comprador
                    <Select
                      options={getDepartamentosAdquirientesOptions(
                        departamentosAdquirientes
                      )}
                      value={getDepartamentosAdquirientesOptions(
                        selectedDepartamentosAdquirientes
                      )}
                      onChange={handleSelectDepartamentosAdquirientes}
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Municipio Comprador
                    <Select
                      options={getMunicipiosAdquirientesOptions(
                        municipiosAdquirientes
                      )}
                      value={getMunicipiosAdquirientesOptions(
                        selectedMunicipiosAdquirientes
                      )}
                      onChange={handleSelectMunicipiosAdquirientes}
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Dirección Comprador
                    <Select
                      options={getDireccionesAdquirientesOptions(
                        direccionesAdquirientes
                      )}
                      value={getDireccionesAdquirientesOptions(
                        selectedDireccionesAdquirientes
                      )}
                      onChange={handleSelectDireccionesAdquirientes}
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Correo Comprador
                    <Select
                      options={getCorreosAdquirientesOptions(correosAdquirientes)}
                      value={getCorreosAdquirientesOptions(
                        selectedCorreosAdquirientes
                      )}
                      onChange={handleSelectCorreosAdquirientes}
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Telefono Comprador
                    <Select
                      options={getTelefonosAdquirientesOptions(
                        telefonosAdquirientes
                      )}
                      value={getTelefonosAdquirientesOptions(
                        selectedTelefonosAdquirientes
                      )}
                      onChange={handleSelectTelefonosAdquirientes}
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Total Acumulado
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Eliminar No vinculante
                  </th>
                </tr>
              </thead>
              <tbody>
                {consorcios.length > 0 ? (
                  currentItems.map((consorcio, index) => (
                    <tr
                      key={consorcio.id}
                      className={
                        index % 2 === 0
                          ? "bg-gray-100 whitespace-nowrap"
                          : "bg-white whitespace-nowrap"
                      }
                    >
                      <td className="border px-4 py-2 text-center">
                        {indexOfFirstItem + index + 1}
                      </td>

                      <td className="border px-4 text-center">
                        {consorcio.codigoUnico}
                      </td>

                     

                    
                      <td className="border px-4 py-2 text-center">
                        {consorcio.fechaEmision}
                      </td>
                    
                      <td className="border px-4 py-2 text-center">
                        {consorcio.departamentoEmisor}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.municipioEmisor}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.direccionEmisor}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.correoEmisor}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.telefonoEmisor}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.nombreComercialEmisor}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <HighlightedText
                          text={consorcio.nitEmisor}
                          highlight={searchQuery}
                        />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.tipoContribuyenteEmisor}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.nombreAdquiriente}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <HighlightedText
                          text={consorcio.numeroDocumentoAdquiriente}
                          highlight={searchQuery}
                        />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.tipoDocumentoAdquiriente}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.paisAdquiriente}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.departamentoAdquiriente}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.municipioAdquiriente}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.direccionAdquiriente}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.correoAdquiriente}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.telefonoAdquiriente}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        ${consorcio.subtotal}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => openDeleteModal(consorcio)}
                            className="flex justify-center items-center mr-2 gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                          >
                            <RiDeleteBin5Fill className="" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={20} className="text-center py-4 text-red-500">
                      {selectedAnio
                        ? "No hay facturas para el año seleccionado."
                        : "Esta ciudad no tiene facturas."}
                    </td>
                  </tr>
                )}
              </tbody>
              {consorcios.length > 0 && (
                <tfoot>
                  <tr>
                    <th
                      className="px-4 py-2 bg-secundary text-white"
                      colSpan={23}
                    >
                      Total
                    </th>
                    <th className="border px-4 py-2">
                      ${totalSubtotal.toLocaleString("de-DE")}
                    </th>
                    <th className="px-4 py-2 bg-secundary text-white"></th>
                  </tr>
                </tfoot>
              )}
            </table>
            <Modal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              title="Eliminar Factura"
              confirmText="Confirmar"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            >
              <p>¿Estás seguro de eliminar esta factura?</p>
            </Modal>
          </div>
        </>
   
    </div>
  );
};

export default Consorcios;
