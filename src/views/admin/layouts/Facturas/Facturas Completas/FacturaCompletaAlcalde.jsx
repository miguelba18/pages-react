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

  const [searchQuery, setSearchQuery] = useState("");
  const { addConsorcio } = useAddConsorcio();
  const [selectedAnio, setSelectedAnio] = useState("");
  const { handleDownloadExcel } = useDescargarFacturas();
  const [processedFacturas, setProcessedFacturas] = useState(new Set());
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNombresComerciales, setSelectedNombresComerciales] = useState(
    []
  );

  // Additional selected states for new filters
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
    handleDownloadExcel("", searchQuery, selectedAnio);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "2px solid #7f22f2" : "2px solid #efb810",
      borderRadius: "0.375rem",
      padding: "0.5rem",
      boxShadow: state.isFocused ? "0 0 0 1px #7f22f2" : "",
      "&:hover": {
        borderColor: "#7f22f2",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      position: "absolute",
      marginTop: "4px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#7f22f2"
        : state.isFocused
        ? "#efb810"
        : null,
      color: state.isSelected ? "#fff" : "#333",
    }),
  };
  useEffect(() => {
    console.log("NITs Emisores cargados: ", nitsEmisores);
  }, [nitsEmisores]);

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
              <th className="px-4 py-2 bg-secundary text-white">CUFE</th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre Comercial vendedor
                <Select
                  options={nombresComerciales.map((nombre) => ({
                    value: nombre,
                    label: nombre,
                  }))}
                  value={selectedNombresComerciales.map((nombre) => ({
                    value: nombre,
                    label: nombre,
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedNombresComerciales(selectedValues);
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
                  }}
                  placeholder="Selecciona nombres comerciales"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                NIT vendedor
                <Select
  options={nitsEmisores.map((nit) => ({
    value: nit,
    label: nit,
  }))}
  value={selectedNitsEmisores.map((nit) => ({
    value: nit,
    label: nit,
  }))}
  onChange={(selectedOptions) => {
    const selectedValues = selectedOptions.map(
      (option) => option.value
    );
    setSelectedNitsEmisores(selectedValues);
    console.log("NITs seleccionados:", selectedValues);
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
      selectedValues 
    );
  }}
  placeholder="Selecciona NITs de emisores"
  isMulti
  styles={customStyles}
  closeMenuOnSelect={false}
/>


              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento vendedor
                <Select
                  options={departamentosEmisores.map((departamento) => ({
                    value: departamento,
                    label: departamento,
                  }))}
                  value={selectedDepartamentosEmisores.map((departamento) => ({
                    value: departamento,
                    label: departamento,
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedDepartamentosEmisores(selectedValues);
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
                      selectedNombresAdquirientes,
                      selectedNitsEmisores,
                      selectedTelefonosEmisores,
                      selectedCorreosEmisores,
                      selectedDireccionesEmisores,
                      selectedMunicipiosEmisores,
                      selectedValues
                    );
                  }}
                  placeholder="Selecciona departamentos de emisores"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio vendedor
                <Select
                  options={municipiosEmisores.map((municipio) => ({
                    value: municipio,
                    label: municipio,
                  }))}
                  value={selectedMunicipiosEmisores.map((municipio) => ({
                    value: municipio,
                    label: municipio,
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedMunicipiosEmisores(selectedValues);
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
                      selectedNombresAdquirientes,
                      selectedNitsEmisores,
                      selectedTelefonosEmisores,
                      selectedCorreosEmisores,
                      selectedDireccionesEmisores,
                      selectedValues
                    );
                  }}
                  placeholder="Selecciona municipios de emisores"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección vendedor
                <Select
                  options={direccionesEmisores.map((direccion) => ({
                    value: direccion,
                    label: direccion,
                  }))}
                  value={selectedDireccionesEmisores.map((direccion) => ({
                    value: direccion,
                    label: direccion,
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedDireccionesEmisores(selectedValues);
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
                      selectedNombresAdquirientes,
                      selectedNitsEmisores,
                      selectedTelefonosEmisores,
                      selectedCorreosEmisores,
                      selectedValues
                    );
                  }}
                  placeholder="Selecciona direcciones de emisores"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo vendedor
                <Select
                  options={correosEmisores.map((correo) => ({
                    value: correo,
                    label: correo,
                  }))}
                  value={selectedCorreosEmisores.map((correo) => ({
                    value: correo,
                    label: correo,
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedCorreosEmisores(selectedValues);
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
                      selectedValues
                    );
                  }}
                  placeholder="Selecciona correos de emisores"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Vendedor
                <Select
                  options={telefonosEmisores.map((telefono) => ({
                    value: telefono,
                    label: telefono,
                  }))}
                  value={selectedTelefonosEmisores.map((telefono) => ({
                    value: telefono,
                    label: telefono,
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedTelefonosEmisores(selectedValues);
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
                      selectedValues
                    );
                  }}
                  placeholder="Selecciona teléfonos de emisores"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre adquiriente
                <Select
                  options={nombresAdquirientes.map((nombre) => ({
                    value: nombre,
                    label: nombre,
                  }))}
                  value={selectedNombresAdquirientes.map((nombre) => ({
                    value: nombre,
                    label: nombre,
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedNombresAdquirientes(selectedValues);
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
                      selectedValues
                    );
                  }}
                  placeholder="Selecciona nombres de adquirientes"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                NIT comprador
                <Select
                  options={numerosDocumentoAdquirientes.map((documento) => ({
                    value: documento,
                    label: documento,
                  }))}
                  value={selectedNumerosDocumentoAdquirientes.map(
                    (documento) => ({
                      value: documento,
                      label: documento,
                    })
                  )}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedNumerosDocumentoAdquirientes(selectedValues);
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
                      selectedValues
                    );
                  }}
                  placeholder="Selecciona números de documento de adquirientes"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento comprador
                <Select
                  options={departamentosAdquirientes.map((departamento) => ({
                    value: departamento,
                    label: departamento,
                  }))}
                  value={selectedDepartamentosAdquirientes.map(
                    (departamento) => ({
                      value: departamento,
                      label: departamento,
                    })
                  )}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedDepartamentosAdquirientes(selectedValues);
                    fetchFacturas(
                      searchQuery,
                      selectedAnio,
                      "",
                      selectedNombresComerciales,
                      selectedTelefonosAdquirientes,
                      selectedCorreosAdquirientes,
                      selectedDireccionesAdquirientes,
                      selectedMunicipiosAdquirientes,
                      selectedValues
                    );
                  }}
                  placeholder="Selecciona departamentos de adquirientes"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio comprador
                <Select
                  options={municipiosAdquirientes.map((municipio) => ({
                    value: municipio,
                    label: municipio,
                  }))}
                  value={selectedMunicipiosAdquirientes.map((municipio) => ({
                    value: municipio,
                    label: municipio,
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedMunicipiosAdquirientes(selectedValues);
                    fetchFacturas(
                      searchQuery,
                      selectedAnio,
                      "",
                      selectedNombresComerciales,
                      selectedTelefonosAdquirientes,
                      selectedCorreosAdquirientes,
                      selectedDireccionesAdquirientes,
                      selectedValues
                    );
                  }}
                  placeholder="Selecciona municipios de adquirientes"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección comprador
                <Select
                  options={direccionesAdquirientes.map((direccion) => ({
                    value: direccion,
                    label: direccion,
                  }))}
                  value={selectedDireccionesAdquirientes.map((direccion) => ({
                    value: direccion,
                    label: direccion,
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedDireccionesAdquirientes(selectedValues);
                    fetchFacturas(
                      searchQuery,
                      selectedAnio,
                      "",
                      selectedNombresComerciales,
                      selectedTelefonosAdquirientes,
                      selectedCorreosAdquirientes,
                      selectedValues
                    );
                  }}
                  placeholder="Selecciona direcciones de adquirientes"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo comprador
                <Select
                  options={correosAdquirientes.map((correo) => ({
                    value: correo,
                    label: correo,
                  }))}
                  value={selectedCorreosAdquirientes.map((correo) => ({
                    value: correo,
                    label: correo,
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedCorreosAdquirientes(selectedValues);
                    fetchFacturas(
                      searchQuery,
                      selectedAnio,
                      "",
                      selectedNombresComerciales,
                      selectedTelefonosAdquirientes,
                      selectedValues
                    );
                  }}
                  placeholder="Selecciona correos de adquirientes"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Comprador
                <Select
                  options={telefonosAdquirientes.map((telefono) => ({
                    value: telefono,
                    label: telefono,
                  }))}
                  value={selectedTelefonosAdquirientes.map((telefono) => ({
                    value: telefono,
                    label: telefono,
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setSelectedTelefonosAdquirientes(selectedValues);
                    fetchFacturas(
                      searchQuery,
                      selectedAnio,
                      "",
                      selectedNombresComerciales,
                      selectedValues 
                    );
                  }}
                  placeholder="Selecciona teléfonos de adquirientes"
                  isMulti
                  styles={customStyles}
                  closeMenuOnSelect={false}
                />
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
