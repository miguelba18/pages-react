import { useState, useEffect } from "react";
import {
  RiDownloadLine,
  RiDeleteBin5Fill,
  RiSearchLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import useListTodas from "../../../../hook/Facturas/Factura Completa/admin/useListTodas";
import useDescargarTodas from "../../../../hook/Facturas/Factura Completa/admin/useDescargarTodas";
import useDeleteFacturas from "../../../../hook/Facturas/Factura Completa/admin/useDeleteFacturas";
import Modal from "../../../../modal/Modal";
import Select from "react-select";
import { toast } from "react-toastify";
import useAgregarConsorcios from "../../../../hook/Consorcios/useAgregarConsorcios";
import useAgregarOtroTipo from "../../../../hook/Consorcios/useAgregarOtroTipo";
const FacturaCompletaTodas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const [facturasDisponibles, setFacturasDisponibles] = useState(true);
  const { handleDownloadExcel } = useDescargarTodas();
  const [resetAnio, setResetAnio] = useState(false);
  const { deleteFactura } = useDeleteFacturas();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [facturaToDelete, setFacturaToDelete] = useState(null);
  const { agregarConsorcio, isLoading } = useAgregarConsorcios();
  const { agregarOtroTipo, isCargando } = useAgregarOtroTipo();
  const [nitFiltro, setNitFiltro] = useState("");
  const [isSearchingByNit, setIsSearchingByNit] = useState(false);

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

  const {
    totalSuma,
    facturas,
    setFacturas,
    fetchFacturas,
    fetchFacturasPorNit,
    selectedAnio,
    setSelectedAnio,
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
    
  } = useListTodas();

  useEffect(() => {
    if (!isSearchingByNit) {
      fetchFacturas(
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
        selectedDepartamentosEmisores
      ).then();
    }
  }, [
    isSearchingByNit,
    fetchFacturas,
    selectedAnio,
    setFacturas,
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
  ]);

  const handleSearch = () => {
    if (nitFiltro) {
      fetchFacturasPorNit(nitFiltro);
      setIsSearchingByNit(true);
    } else {
      fetchFacturas();
      setIsSearchingByNit(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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

  const getNitsEmisoresOptions = (nitsEmisores) => {
    return nitsEmisores.map((nit) => ({
      value: nit,
      label: nit,
    }));
  };

  const getTelefonosAdquirientesOptions = (telefonosAdquirientes) => {
    return telefonosAdquirientes.map((telefono) => ({
      value: telefono,
      label: telefono,
    }));
  };

  const getCorreosAdquirientesOptions = (correosAdquirientes) => {
    return correosAdquirientes.map((correo) => ({
      value: correo,
      label: correo,
    }));
  };

  const getDireccionesAdquirientesOptions = (direccionesAdquirientes) => {
    return direccionesAdquirientes.map((direccion) => ({
      value: direccion,
      label: direccion,
    }));
  };

  const getMunicipiosAdquirientesOptions = (municipiosAdquirientes) => {
    return municipiosAdquirientes.map((municipio) => ({
      value: municipio,
      label: municipio,
    }));
  };

  const getDepartamentosAdquirientesOptions = (departamentosAdquirientes) => {
    return departamentosAdquirientes.map((departamento) => ({
      value: departamento,
      label: departamento,
    }));
  };

  const getNombresAdquirientesOptions = (nombresAdquirientes) => {
    return nombresAdquirientes.map((nombre) => ({
      value: nombre,
      label: nombre,
    }));
  };

  const getNumerosDocumentoAdquirientesOptions = (
    numerosDocumentoAdquirientes
  ) => {
    return numerosDocumentoAdquirientes.map((numero) => ({
      value: numero,
      label: numero,
    }));
  };

  const getTelefonosEmisoresOptions = (telefonosEmisores) => {
    return telefonosEmisores.map((telefono) => ({
      value: telefono,
      label: telefono,
    }));
  };

  const getCorreosEmisoresOptions = (correosEmisores) => {
    return correosEmisores.map((correo) => ({
      value: correo,
      label: correo,
    }));
  };

  const getDireccionesEmisoresOptions = (direccionesEmisores) => {
    return direccionesEmisores.map((direccion) => ({
      value: direccion,
      label: direccion,
    }));
  };

  const getMunicipiosEmisoresOptions = (municipiosEmisores) => {
    return municipiosEmisores.map((municipio) => ({
      value: municipio,
      label: municipio,
    }));
  };

  const getDepartamentosEmisoresOptions = (departamentosEmisores) => {
    return departamentosEmisores.map((departamento) => ({
      value: departamento.toUpperCase(),
      label: departamento,
    }));
  };

  const handleSelectChange = async (type, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);

    switch (type) {
      case "nombresComerciales":
        setSelectedNombresComerciales(selectedValues);
        resetAllSelectsExcept(setSelectedNombresComerciales);

        break;
      case "nitsEmisores":
        setSelectedNitsEmisores(selectedValues);
        resetAllSelectsExcept(setSelectedNitsEmisores);
        break;
      case "telefonosEmisores":
        setSelectedTelefonosEmisores(selectedValues);
        resetAllSelectsExcept(setSelectedTelefonosEmisores);
        break;
      case "correosEmisores":
        setSelectedCorreosEmisores(selectedValues);
        resetAllSelectsExcept(setSelectedCorreosEmisores);
        break;
      case "direccionesEmisores":
        setSelectedDireccionesEmisores(selectedValues);
        resetAllSelectsExcept(setSelectedDireccionesEmisores);
        break;
      case "municipiosEmisores":
        setSelectedMunicipiosEmisores(selectedValues);
        resetAllSelectsExcept(setSelectedMunicipiosEmisores);
        break;
      case "departamentosEmisores":
        setSelectedDepartamentosEmisores(selectedValues);
        resetAllSelectsExcept(setSelectedDepartamentosEmisores);
        break;
      case "telefonosAdquirientes":
        setSelectedTelefonosAdquirientes(selectedValues);
        resetAllSelectsExcept(setSelectedTelefonosAdquirientes);

        break;
      case "correosAdquirientes":
        setSelectedCorreosAdquirientes(selectedValues);
        resetAllSelectsExcept(setSelectedCorreosAdquirientes);
        break;
      case "direccionesAdquirientes":
        setSelectedDireccionesAdquirientes(selectedValues);
        resetAllSelectsExcept(setSelectedDireccionesAdquirientes);
        break;
      case "municipiosAdquirientes":
        setSelectedMunicipiosAdquirientes(selectedValues);
        resetAllSelectsExcept(setSelectedMunicipiosAdquirientes);
        break;
      case "departamentosAdquirientes":
        setSelectedDepartamentosAdquirientes(selectedValues);
        resetAllSelectsExcept(setSelectedDepartamentosAdquirientes);
        break;
      case "numerosDocumentoAdquirientes":
        setSelectedNumerosDocumentoAdquirientes(selectedValues);
        resetAllSelectsExcept(setSelectedNumerosDocumentoAdquirientes);
        break;
      case "nombresAdquirientes":
        setSelectedNombresAdquirientes(selectedValues);
        resetAllSelectsExcept(setSelectedNombresAdquirientes);
        break;

      default:
        break;
    }
  };

  const handleDelete = () => {
    if (facturaToDelete) {
      deleteFactura(facturaToDelete.id);
      setIsDeleteModalOpen(false);
    }
  };

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

  useEffect(() => {
    if (resetAnio) {
      setResetAnio(false);
    }
  }, [resetAnio]);

  const handleDownload = () => {
    handleDownloadExcel({
      filtro: "",

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

  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    fetchFacturas(anio)
      .then((facturas) => {
        setFacturasDisponibles(facturas.length > 0);
        setFacturas(facturas);
      })
      .catch(() => {
        setFacturasDisponibles(false);
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facturas.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div>
      <div className="xl:flex justify-between">
        <h1 className="font-bold text-3xl text-secundary">
          Facturas Completas Todas
        </h1>

        <div className="flex justify-around">
          <div hidden={nitFiltro} className="xl:relative mr-4 xl:mt-0">
            <button
              onClick={handleDownload}
              className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
            >
              <span className="hidden md:inline">Descargar facturas</span>
              <RiDownloadLine className="mr-0 xl:mr-2" />
            </button>
          </div>
        </div>
      </div>

      <>
        <div className="mt-4">
          <table>
            <thead>
              <tr>
                <th></th>
                <th className="px-4 py-2 bg-secundary text-white">Nit </th>

                <th className="px-4 py-2 bg-secundary text-white">
                  Consorcio o Union temporal
                </th>
                <th className="px-4 py-2 bg-secundary text-white">Otro tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-center border">
                  Agrupar Contribuyente No Vinculante
                </td>
                <td className="px-4 py-2 text-center border">
                  <div className="relative ">
                    <input
                      type="number"
                      value={nitFiltro}
                      onChange={(e) => setNitFiltro(e.target.value)}
                      className="rounded-[10px] shadow-xl  w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
                      placeholder="Search"
                      onKeyDown={handleKeyDown}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                      <button
                        onClick={handleSearch}
                        className="flex justify-center items-center gap-2 xl:gap-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#7196fb] via-[#1d8fe1] to-[#125abe] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-[#125fbe] hover:to-[#71c6fb]"
                      >
                        <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-white  font-semibold " />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 text-center border">
                  <div className="grid justify-center">
                    <button
                      onClick={() => {
                        if (!nitFiltro.trim()) {
                          toast.info(
                            "Por favor, ingrese un NIT antes de agregar un consorcio."
                          );
                          return;
                        }
                        agregarConsorcio(nitFiltro);
                      }}
                      className="flex justify-center items-center gap-2 xl:gap-2 px-3 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
                    >
                      {isLoading ? "Agregando..." : "Agregar Consorcio"}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 text-center border">
                  <div className="grid justify-center">
                    <button
                      onClick={() => {
                        if (!nitFiltro.trim()) {
                          toast.info(
                            "Por favor, ingrese un NIT antes de agregar otro tipo."
                          );
                          return;
                        }
                        agregarOtroTipo(nitFiltro);
                      }}
                      className="flex justify-center items-center gap-2 xl:gap-2 px-3 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fbf671] via-[#dae11d] to-[#bea712] hover:shadow-xl hover:shadow-yellow-500 hover:scale-105 duration-300 hover:from-[#bead12] hover:to-[#fbf271]"
                    >
                      {isCargando ? "Agregando..." : "Agregar Otro Tipo"}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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

        <div className="overflow-x-auto mt-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-secundary text-white">#</th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Fecha
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
                <th className="px-4 py-2 bg-secundary text-white">CUFE</th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Nombre Comercial vendedor
                  <Select
                    options={getNombresComercialesOptions(nombresComerciales)}
                    value={getNombresComercialesOptions(
                      selectedNombresComerciales
                    )}
                    onChange={(selectedOptions) =>
                      handleSelectChange("nombresComerciales", selectedOptions)
                    }
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
                    value={getNitsEmisoresOptions(selectedNitsEmisores)}
                    onChange={(selectedOptions) =>
                      handleSelectChange("nitsEmisores", selectedOptions)
                    }
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
                    options={getDepartamentosEmisoresOptions(
                      departamentosEmisores
                    )}
                    value={getDepartamentosEmisoresOptions(
                      selectedDepartamentosEmisores
                    )}
                    onChange={(selectedOptions) =>
                      handleSelectChange(
                        "departamentosEmisores",
                        selectedOptions
                      )
                    }
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
                    onChange={(selectedOptions) =>
                      handleSelectChange("municipiosEmisores", selectedOptions)
                    }
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
                    onChange={(selectedOptions) =>
                      handleSelectChange("direccionesEmisores", selectedOptions)
                    }
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
                    value={getCorreosEmisoresOptions(selectedCorreosEmisores)}
                    onChange={(selectedOptions) =>
                      handleSelectChange("correosEmisores", selectedOptions)
                    }
                    placeholder="Selecciona Correo Emisor"
                    isMulti
                    styles={customStyles}
                    menuPlacement="auto"
                    menuPosition="fixed"
                  />
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Telefono
                  <Select
                    options={getTelefonosEmisoresOptions(telefonosEmisores)}
                    value={getTelefonosEmisoresOptions(
                      selectedTelefonosEmisores
                    )}
                    onChange={(selectedOptions) =>
                      handleSelectChange("telefonosEmisores", selectedOptions)
                    }
                    placeholder="Selecciona Telefono Emisor"
                    isMulti
                    styles={customStyles}
                    menuPlacement="auto"
                    menuPosition="fixed"
                  />
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Nombre comprador
                  <Select
                    options={getNombresAdquirientesOptions(nombresAdquirientes)}
                    value={getNombresAdquirientesOptions(
                      selectedNombresAdquirientes
                    )}
                    onChange={(selectedOptions) =>
                      handleSelectChange("nombresAdquirientes", selectedOptions)
                    }
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
                    onChange={(selectedOptions) =>
                      handleSelectChange("numerosDocumentoAdquirientes", selectedOptions)
                    }
                    placeholder="Selecciona documento Comprador"
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
                    onChange={(selectedOptions) =>
                      handleSelectChange("departamentosAdquirientes", selectedOptions)
                    }
                    placeholder="Selecciona un departamento adquiriente"
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
                    onChange={(selectedOptions) =>
                      handleSelectChange("municipiosAdquirientes", selectedOptions)
                    }
                    placeholder="Selecciona un municipio adquiriente"
                    isMulti
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
                    onChange={(selectedOptions) =>
                      handleSelectChange("direccionesAdquirientes", selectedOptions)
                    }
                    placeholder="Selecciona una direccion adquiriente"
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
                    onChange={(selectedOptions) =>
                      handleSelectChange("correosAdquirientes", selectedOptions)
                    }
                    placeholder="Selecciona un municipio adquiriente"
                    isMulti
                    styles={customStyles}
                    menuPlacement="auto"
                    menuPosition="fixed"
                  />
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Teléfono Comprador
                  <Select
                    options={getTelefonosAdquirientesOptions(telefonosAdquirientes)}
                    value={getTelefonosAdquirientesOptions(
                      selectedTelefonosAdquirientes
                    )}
                    onChange={(selectedOptions) =>
                      handleSelectChange("telefonosAdquirientes", selectedOptions)
                    }
                    placeholder="Selecciona un municipio adquiriente"
                    isMulti
                    styles={customStyles}
                    menuPlacement="auto"
                    menuPosition="fixed"
                  />
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Total acumulado
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Eliminar Factura
                </th>
              </tr>
            </thead>
            <tbody>
              {facturas.length > 0 ? (
                currentItems.map((factura, index) => (
                  <tr
                    key={index}
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
                      {factura.fechaEmision}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.codigoUnico}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.nombreComercialEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.nitEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.departamentoEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.municipioEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.direccionEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.correoEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.telefonoEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.nombreAdquiriente}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {factura.numeroDocumentoAdquiriente}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {factura.departamentoAdquiriente}
                    </td>
                    <td className="border px-4 text-center">
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
                    <td className="border px-4">${factura.subtotal}</td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => openDeleteModal(factura)}
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
                  <td colSpan={17} className="text-center py-4 text-red-500">
                    {selectedAnio
                      ? "No hay facturas para el año seleccionado."
                      : "Esta ciudad no tiene facturas."}
                  </td>
                </tr>
              )}
            </tbody>
            {facturas.length > 0 && (
              <tfoot>
                <tr>
                  <th
                    className="px-4 py-2 bg-secundary text-white"
                    colSpan={17}
                  >
                    Total
                  </th>
                  <th className="border px-4 py-2">${totalSuma}</th>
                  <th className="px-4 py-2 bg-secundary text-white"></th>
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

export default FacturaCompletaTodas;
