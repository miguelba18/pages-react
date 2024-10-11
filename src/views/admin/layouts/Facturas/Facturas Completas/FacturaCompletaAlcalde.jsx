import { useState, useEffect } from "react";
import HighlightedText from "../../../../../utils/HighlightedText";
import {
  RiSearchLine,
  RiDownloadLine,
  RiAddCircleFill,
  RiCheckboxCircleFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import useListAlcalde from "../../../../hook/Facturas/Factura Completa/alcalde/useListAlcalde";
import useDescargarFacturas from "../../../../hook/Facturas/Factura Completa/admin/useDescargarFacturas";
import Select from "react-select";

import useAddConsorcio from "../../../../hook/Facturas/Factura Completa/admin/useAddConsorcio";
import { toast } from "react-toastify";
const FacturaCompleta = () => {
  const { facturas, fetchFacturas, totalSuma } = useListAlcalde();
  const [searchQuery, setSearchQuery] = useState("");
  const { addConsorcio } = useAddConsorcio();
  const [selectedAnio, setSelectedAnio] = useState("");
  const { handleDownloadExcel } = useDescargarFacturas();
  const [processedFacturas, setProcessedFacturas] = useState(new Set());
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCUFE, setSelectedCUFE] = useState("");
  const [selectedNombreComercialVendedor, setSelectedNombreComercialVendedor] =
    useState("");
  const [selectedNitEmisor, setSelectedNitEmisor] = useState("");
  const [selectedDepartamentoEmisor, setSelectedDepartamentoEmisor] =
    useState("");
  const [selectedMunicipioEmisor, setSelectedMunicipioEmisor] = useState("");
  const [selectedDireccionEmisor, setSelectedDireccionEmisor] = useState("");
  const [selectedCorreoEmisor, setSelectedCorreoEmisor] = useState("");
  const [selectedTelefonoEmisor, setSelectedTelefonoEmisor] = useState("");
  const [selectedNombreAdquiriente, setSelectedNombreAdquirente] = useState("");
  const [
    selectedNumeroDocumentoAdquiriente,
    setSelectedNumeroDocumentoAdquiriente,
  ] = useState("");
  const [selectedDepartamentoAdquiriente, setSelectedDepartamentoAdquiriente] =
    useState("");
  const [selectedMunicipioAdquiriente, setSelectedMunicipioAdquiriente] =
    useState("");
  const [selectedDireccionAdquiriente, setSelectedDireccionAdquiriente] =
    useState("");
  const [selectedCorreoAdquiriente, setSelectedCorreoAdquiriente] =
    useState("");
  const [selectedTelefonoAdquiriente, setSelectedTelefonoAdquiriente] =
    useState("");

  const itemsPerPage = 100;
  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    fetchFacturas(
      searchQuery,
      anio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      selectedMunicipioEmisor,
      selectedDireccionEmisor,
      selectedCorreoEmisor,
      selectedTelefonoEmisor,
      selectedNombreAdquiriente,
      selectedNumeroDocumentoAdquiriente,
      selectedDepartamentoAdquiriente,
      selectedMunicipioAdquiriente,
      selectedDireccionAdquiriente
    );
  };
  const handleselectCufe = (selectedOption) => {
    console.log("CUFE seleccionado:", selectedOption);
    setSelectedCUFE(selectedOption ? selectedOption.value : "");
    resetAllSelectsExcept([setSelectedCUFE]);
  };

  const handleNombreComercialVendedorChange = (e) => {
    const nombreComercialEmisor = e.target.value;
    setSelectedNombreComercialVendedor(nombreComercialEmisor);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      nombreComercialEmisor
    );
  };
  const handleNitEmisorChange = (e) => {
    const nitEmisor = e.target.value;
    setSelectedNitEmisor(nitEmisor);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      nitEmisor
    );
  };
  const handleDepartamentoEmisorChange = (e) => {
    const departamentoEmisor = e.target.value;
    setSelectedDepartamentoEmisor(departamentoEmisor);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      departamentoEmisor
    );
  };
  const handleMunicipioEmisorChange = (e) => {
    const municipioEmisor = e.target.value;
    setSelectedMunicipioEmisor(municipioEmisor);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      municipioEmisor
    );
  };
  const handleDireccionEmisorChange = (e) => {
    const direccionEmisor = e.target.value;
    setSelectedDireccionEmisor(direccionEmisor);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      selectedMunicipioEmisor,
      direccionEmisor
    );
  };
  const handleCorreoEmisorChange = (e) => {
    const correoEmisor = e.target.value;
    setSelectedCorreoEmisor(correoEmisor);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      selectedMunicipioEmisor,
      selectedDireccionEmisor,
      correoEmisor
    );
  };
  const handleTelefonoEmisorChange = (e) => {
    const telefonoEmisor = e.target.value;
    setSelectedTelefonoEmisor(telefonoEmisor);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      selectedMunicipioEmisor,
      selectedDireccionEmisor,
      selectedCorreoEmisor,
      telefonoEmisor
    );
  };
  const handleNombreAdquirienteChange = (e) => {
    const nombreAdquiriente = e.target.value;
    setSelectedNombreAdquirente(nombreAdquiriente);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      selectedMunicipioEmisor,
      selectedDireccionEmisor,
      selectedCorreoEmisor,
      selectedTelefonoEmisor,
      nombreAdquiriente
    );
  };
  const handleNumeroDocumentoAdquirienteChange = (e) => {
    const numeroDocumentoAdquiriente = e.target.value;
    setSelectedNumeroDocumentoAdquiriente(numeroDocumentoAdquiriente);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      selectedMunicipioEmisor,
      selectedDireccionEmisor,
      selectedCorreoEmisor,
      selectedTelefonoEmisor,
      selectedNombreAdquiriente,
      numeroDocumentoAdquiriente
    );
  };
  const handleDepartamentoAdquirienteChange = (e) => {
    const departamentoAdquiriente = e.target.value;
    setSelectedDepartamentoAdquiriente(departamentoAdquiriente);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      selectedMunicipioEmisor,
      selectedDireccionEmisor,
      selectedCorreoEmisor,
      selectedTelefonoEmisor,
      selectedNombreAdquiriente,
      selectedNumeroDocumentoAdquiriente,
      departamentoAdquiriente
    );
  };
  const handleMunicipioAdquirienteChange = (e) => {
    const municipioAdquiriente = e.target.value;
    setSelectedMunicipioAdquiriente(municipioAdquiriente);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      selectedMunicipioEmisor,
      selectedDireccionEmisor,
      selectedCorreoEmisor,
      selectedTelefonoEmisor,
      selectedNombreAdquiriente,
      selectedNumeroDocumentoAdquiriente,
      selectedDepartamentoAdquiriente,
      municipioAdquiriente
    );
  };
  const handleDireccionAdquirienteChange = (e) => {
    const direccionAdquiriente = e.target.value;
    setSelectedDireccionAdquiriente(direccionAdquiriente);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      selectedMunicipioEmisor,
      selectedDireccionEmisor,
      selectedCorreoEmisor,
      selectedTelefonoEmisor,
      selectedNombreAdquiriente,
      selectedNumeroDocumentoAdquiriente,
      selectedDepartamentoAdquiriente,
      selectedMunicipioAdquiriente,
      direccionAdquiriente
    );
  };
  const handleCorreoAdquirienteChange = (e) => {
    const correoAdquiriente = e.target.value;
    setSelectedCorreoAdquiriente(correoAdquiriente);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      selectedMunicipioEmisor,
      selectedDireccionEmisor,
      selectedCorreoEmisor,
      selectedTelefonoEmisor,
      selectedNombreAdquiriente,
      selectedNumeroDocumentoAdquiriente,
      selectedDepartamentoAdquiriente,
      selectedMunicipioAdquiriente,
      selectedDireccionAdquiriente,
      correoAdquiriente
    );
  };
  const handleTelefonoAdquirienteChange = (e) => {
    const telefonoAdquiriente = e.target.value;
    setSelectedTelefonoAdquiriente(telefonoAdquiriente);
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      selectedMunicipioEmisor,
      selectedDireccionEmisor,
      selectedCorreoEmisor,
      selectedTelefonoEmisor,
      selectedNombreAdquiriente,
      selectedNumeroDocumentoAdquiriente,
      selectedDepartamentoAdquiriente,
      selectedMunicipioAdquiriente,
      selectedDireccionAdquiriente,
      selectedCorreoAdquiriente,
      telefonoAdquiriente
    );
  };

  useEffect(() => {
    fetchFacturas(
      searchQuery,
      selectedAnio,
      selectedCUFE,
      selectedNombreComercialVendedor,
      selectedNitEmisor,
      selectedDepartamentoEmisor,
      selectedMunicipioEmisor,
      selectedDireccionEmisor,
      selectedCorreoEmisor,
      selectedTelefonoEmisor
    );
  }, [
    searchQuery,
    selectedAnio,
    selectedCUFE,
    selectedNombreComercialVendedor,
    selectedNitEmisor,
    selectedDepartamentoEmisor,
    selectedMunicipioEmisor,
    selectedDireccionEmisor,
    selectedCorreoEmisor,
    selectedTelefonoEmisor,
    fetchFacturas,
    processedFacturas,
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facturas.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddConsorcio = async (ids) => {
    const idsArray = ids.split(",");
    const results = await Promise.all(idsArray.map((id) => addConsorcio(id)));
    const successfulIds = results.filter((result) => result);

    if (successfulIds.length > 0) {
      successfulIds.forEach((resultId) => {
        setProcessedFacturas((prev) => new Set(prev).add(resultId));
      });

      fetchFacturas("", searchQuery, selectedAnio).then();
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => {
      const newSelectedIds = new Set(prev);
      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }
      return newSelectedIds;
    });
  };

  const handleAddSelectedConsorcios = () => {
    const idsArray = Array.from(selectedIds);
    if (idsArray.length > 0) {
      handleAddConsorcio(idsArray.join(","));
      setSelectedIds(new Set());
      setIsSelecting(false);
    } else {
      toast.info("No se han seleccionado facturas.");
    }
  };
  const handleSelectAllConsorcios = () => {
    if (selectedIds.size === facturas.length) {
      setSelectedIds(new Set());
    } else {
      const allIds = facturas.map((factura) => factura.id);
      setSelectedIds(new Set(allIds));
    }
  };

  const handleDownload = () => {
    const filtro = searchQuery;
    const ciudad = "";
    const anio = selectedAnio || null;
    const codigoUnico = selectedCUFE || null;

    handleDownloadExcel({ filtro, ciudad, anio, codigoUnico });
  };

  const resetAllSelectsExcept = (excludedSetters) => {
    const allSetters = [
      setSelectedAnio,
      setSelectedCUFE,
      setSelectedNombreComercialVendedor,
      setSelectedNitEmisor,
      setSelectedDepartamentoEmisor,
      setSelectedMunicipioEmisor,
      setSelectedDireccionEmisor,
      setSelectedCorreoEmisor,
      setSelectedTelefonoEmisor,
      setSelectedNombreAdquirente,
      setSelectedNumeroDocumentoAdquiriente,
      setSelectedDepartamentoAdquiriente,
      setSelectedMunicipioAdquiriente,
      setSelectedDireccionAdquiriente,
      setSelectedCorreoAdquiriente,
      setSelectedTelefonoAdquiriente,
    ];

    allSetters.forEach((setter) => {
      if (!excludedSetters.includes(setter)) {
        setter("");
      }
    });
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: "34px",
      fontSize: "14px",
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
  };
  const cufeOptions = facturas.map((factura) => ({
    value: factura.codigoUnico,
    label: factura.codigoUnico,
  }));
  console.log(facturas);

  return (
    <div>
      <div className="xl:flex justify-end">
        <div className="xl:relative mr-4">
          <button
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>

        <div className="relative xl:right-0   ">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              fetchFacturas(e.target.value, selectedAnio, selectedCUFE);
            }}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1 xl:mb-0 mb-1 rounded-md shadow-2xl text-secundary font-semibold " />
          </div>
        </div>
      </div>

      <div className="flex  justify-between">
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
          >
            <RiArrowLeftSLine />
          </button>
          <span className="mt-2">{`Página ${currentPage} de ${Math.ceil(
            facturas.length / itemsPerPage
          )}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(facturas.length / itemsPerPage)}
            className="p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
          >
            <RiArrowRightSLine />
          </button>
        </div>
        <div className="items-center  mt-2  flex justify-end font-bold">
          <p>Total facturas: ${totalSuma}</p>
        </div>
      </div>

      <div className="flex justify-end mb-2">
        <button
          onClick={() => setIsSelecting((prev) => !prev)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isSelecting ? "Cancelar selección" : "Seleccionar consorcios"}
        </button>
        {isSelecting && (
          <>
            <button
              onClick={handleSelectAllConsorcios}
              className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded"
            >
              {selectedIds.size === facturas.length
                ? "Deseleccionar Todos"
                : "Seleccionar Todos"}
            </button>

            <button
              onClick={handleAddSelectedConsorcios}
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Agregar Consorcios
            </button>
          </>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-6">
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
              <th className="px-4 py-2 bg-secundary text-white">
                CUFE
                <Select
                  value={
                    selectedCUFE
                      ? cufeOptions.find(
                          (option) => option.value === selectedCUFE
                        )
                      : null
                  }
                  onChange={handleselectCufe}
                  options={cufeOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>

              <th className="px-4 py-2 bg-secundary text-white">
                Nombre Comercial vendedor
                <select
                  id="nombreComercialVendedor"
                  value={selectedNombreComercialVendedor}
                  onChange={handleNombreComercialVendedorChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(
                      facturas.map((factura) => factura.nombreComercialEmisor)
                    )
                  ).map((nombreComercialEmisor, index) => (
                    <option key={index} value={nombreComercialEmisor}>
                      {nombreComercialEmisor}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                NIT vendedor
                <select
                  id="nitemisor"
                  value={selectedNitEmisor}
                  onChange={handleNitEmisorChange}
                  className="p-2 border rounded-md ml-2  bg-white text-black"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(facturas.map((factura) => factura.nitEmisor))
                  ).map((nitEmisor, index) => (
                    <option key={index} value={nitEmisor}>
                      {nitEmisor}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento vendedor
                <select
                  id="departamentoEmisor"
                  value={selectedDepartamentoEmisor}
                  onChange={handleDepartamentoEmisorChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(
                      facturas.map((factura) => factura.departamentoEmisor)
                    )
                  ).map((departamentoEmisor, index) => (
                    <option key={index} value={departamentoEmisor}>
                      {departamentoEmisor}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio vendedor
                <select
                  id="municipioEmisor"
                  value={selectedMunicipioEmisor}
                  onChange={handleMunicipioEmisorChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(facturas.map((factura) => factura.municipioEmisor))
                  ).map((municipioEmisor, index) => (
                    <option key={index} value={municipioEmisor}>
                      {municipioEmisor}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección vendedor
                <select
                  id="direccionEmisor"
                  value={selectedDireccionEmisor}
                  onChange={handleDireccionEmisorChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(facturas.map((factura) => factura.direccionEmisor))
                  ).map((direccionEmisor, index) => (
                    <option key={index} value={direccionEmisor}>
                      {direccionEmisor}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo vendedor
                <select
                  id="correoEmisor"
                  value={selectedCorreoEmisor}
                  onChange={handleCorreoEmisorChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(facturas.map((factura) => factura.correoEmisor))
                  ).map((correoEmisor, index) => (
                    <option key={index} value={correoEmisor}>
                      {correoEmisor}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Vendedor
                <select
                  id="telefonoEmisor"
                  value={selectedTelefonoEmisor}
                  onChange={handleTelefonoEmisorChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(facturas.map((factura) => factura.telefonoEmisor))
                  ).map((telefonoEmisor, index) => (
                    <option key={index} value={telefonoEmisor}>
                      {telefonoEmisor}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre adquiriente
                <select
                  id="nombreAdquiriente"
                  value={selectedNombreAdquiriente}
                  onChange={handleNombreAdquirienteChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(
                      facturas.map((factura) => factura.nombreAdquiriente)
                    )
                  ).map((nombreAdquiriente, index) => (
                    <option key={index} value={nombreAdquiriente}>
                      {nombreAdquiriente}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                NIT comprador
                <select
                  id="nitAdquiriente"
                  value={selectedNumeroDocumentoAdquiriente}
                  onChange={handleNumeroDocumentoAdquirienteChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(
                      facturas.map(
                        (factura) => factura.numeroDocumentoAdquiriente
                      )
                    )
                  ).map((numeroDocumentoAdquiriente, index) => (
                    <option key={index} value={numeroDocumentoAdquiriente}>
                      {numeroDocumentoAdquiriente}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento comprador
                <select
                  id="departamentoAdquiriente"
                  value={selectedDepartamentoAdquiriente}
                  onChange={handleDepartamentoAdquirienteChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(
                      facturas.map((factura) => factura.departamentoAdquiriente)
                    )
                  ).map((departamentoAdquiriente, index) => (
                    <option key={index} value={departamentoAdquiriente}>
                      {departamentoAdquiriente}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio comprador
                <select
                  id="municipioAdquiriente"
                  value={selectedMunicipioAdquiriente}
                  onChange={handleMunicipioAdquirienteChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(
                      facturas.map((factura) => factura.municipioAdquiriente)
                    )
                  ).map((municipioAdquiriente, index) => (
                    <option key={index} value={municipioAdquiriente}>
                      {municipioAdquiriente}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección comprador
                <select
                  id="direccionAdquiriente"
                  value={selectedDireccionAdquiriente}
                  onChange={handleDireccionAdquirienteChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(
                      facturas.map((factura) => factura.direccionAdquiriente)
                    )
                  ).map((direccionAdquiriente, index) => (
                    <option key={index} value={direccionAdquiriente}>
                      {direccionAdquiriente}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo comprador
                <select
                  id="correoAdquiriente"
                  value={selectedCorreoAdquiriente}
                  onChange={handleCorreoAdquirienteChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(
                      facturas.map((factura) => factura.correoAdquiriente)
                    )
                  ).map((correoAdquiriente, index) => (
                    <option key={index} value={correoAdquiriente}>
                      {correoAdquiriente}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Comprador
                <select
                  id="telefonoAdquiriente"
                  value={selectedTelefonoAdquiriente}
                  onChange={handleTelefonoAdquirienteChange}
                  className="p-1 rounded border border-gray-300 text-black mt-2"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(
                      facturas.map((factura) => factura.telefonoAdquiriente)
                    )
                  ).map((telefonoAdquiriente, index) => (
                    <option key={index} value={telefonoAdquiriente}>
                      {telefonoAdquiriente}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Total acumulado
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Agregar No vinculante
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
                  <td className="border px-4">
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
                  <td className="border px-4 text-center">
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          if (isSelecting) {
                            handleToggleSelect(factura.id);
                          } else {
                            handleAddConsorcio(factura.id);
                          }
                        }}
                        disabled={factura.estado === 1 || !isSelecting}
                        className={`flex justify-center items-center gap-2 w-8 h-8 rounded-md shadow-2xl text-white font-semibold ${
                          factura.estado === 1
                            ? "bg-gradient-to-r from-[#81fb71] via-[#2de11d] to-[#2cbe12] cursor-not-allowed"
                            : isSelecting
                            ? selectedIds.has(factura.id)
                              ? "bg-gradient-to-r from-[#ffcc00] to-[#ff9900]"
                              : "bg-gradient-to-r from-[#718afb] to-[#1215be] hover:scale-105"
                            : "bg-gradient-to-r from-[#718afb] via-[#1d27e1] to-[#1215be] hover:shadow-xl"
                        }`}
                        aria-label={
                          factura.estado === 1
                            ? "Factura procesada"
                            : isSelecting
                            ? "Seleccionar factura"
                            : "Agregar factura"
                        }
                      >
                        {factura.estado === 1 ? (
                          <RiCheckboxCircleFill />
                        ) : isSelecting ? (
                          selectedIds.has(factura.id) ? (
                            <RiCheckboxCircleFill />
                          ) : (
                            <RiAddCircleFill />
                          )
                        ) : (
                          <RiAddCircleFill />
                        )}
                      </button>
                    </div>
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
              <th className="px-4 py-2 bg-secundary text-white"></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FacturaCompleta;
