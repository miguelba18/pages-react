import { useEffect, useState } from "react";
import useDescargarConsorciosPersona from "../../../../hook/Consorcios/use DescargarConsorciosPersona";
import {
  RiSearchLine,
  RiDownloadLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSearchEyeLine
} from "react-icons/ri";
import useListConsorciosPersona from "../../../../../views/hook/Consorcios/useListConsorciosPersona";
import HighlightedText from "../../../../../utils/HighlightedText";
import useSelectCityDepaUtils from "../../../../../utils/useSelectCityDepaUtils";
import Modal from "../../../../modal/Modal";
import useListId from "../../../../hook/Consorcios/useListId";

const ConsorcioVendedorMunicipio = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const { consorcios, listConsorcios, setConsorcios } =
    useListConsorciosPersona();
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({});
  const { handleDownloadExcel } = useDescargarConsorciosPersona();
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacturaId, setSelectedFacturaId] = useState(null);
  const { factura, loading, error } = useListId(selectedFacturaId);

  const [selectedAnio, setSelectedAnio] = useState("");
  const [resetAnio, setResetAnio] = useState(false);
  const [facturasDisponibles, setFacturasDisponibles] = useState(false);

  const {
    departamentos,
    filteredCiudades,
    selectedDepartamento,
    selectedCiudad,
    handleDepartamentoChange,
    handleCiudadChange,
  } = useSelectCityDepaUtils();

  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    listConsorcios(selectedCiudad, searchQuery, anio)
      .then((facturas) => {
        setFacturasDisponibles(facturas.length > 0);
      })
      .catch(() => {
        setFacturasDisponibles(false);
      });
  };

  useEffect(() => {
    if (selectedCiudad) {
      listConsorcios(selectedCiudad);
    } else {
      setConsorcios([]);
    }
  }, [listConsorcios, selectedCiudad, setConsorcios]);

  const handleSearchWithResetAnio = (query) => {
    const filteredQuery = query.replace(/[0-9]/g, "");
    setSelectedAnio("");
    handleSearch(filteredQuery, "");
    setResetAnio(true);
  };

  useEffect(() => {
    if (resetAnio) {
      setResetAnio(false);
    }
  }, [resetAnio]);

  const handleSearch = (query, anio) => {
    setSearchQuery("");
    setSearchQuery(query);
    listConsorcios(selectedCiudad, query, anio);
  };
  const handleDownload = () => {
    handleDownloadExcel(selectedCiudad, searchQuery, selectedAnio);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consorcios.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const total = consorcios.reduce((sum, consorcio) => {
      const subtotalStr = consorcio.subtotal.replace(/\./g, "");
      const subtotal = parseFloat(subtotalStr.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);
    setTotalSubtotal(total);
  }, [consorcios]);

  const handleViewConsorcio = (id) => {
    setSelectedFacturaId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFacturaId(null);
  };

  return (
    <div>
      <div className="xl:flex xl:justify-between items-center">
        <div className="flex justify-end">
          <div className="relative " hidden={!selectedCiudad}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                handleSearchWithResetAnio(e.target.value, facturasDisponibles)
              }
              className="rounded-[10px] shadow-xl  w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
              placeholder="Search"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
              <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-secundary font-semibold " />
            </div>
          </div>
        </div>
        <div hidden={!selectedCiudad} className="xl:relative mr-4">
          <button
            disabled={consorcios.length < 1}
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>
        <div className="flex justify-around  ">
          <div className="ml-4 mt-3">
            <select
              value={selectedDepartamento}
              onChange={(e) => {
                handleDepartamentoChange(e);
                setFormData({
                  ...formData,
                  departamentoId: e.target.value,
                });
              }}
              className="mb-4 rounded-xl  text-secundary shadow-md shadow-blue-500 px-2  py-3 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
            >
              <option value="">Selecciona un departamento</option>
              {departamentos.map((departamento) => (
                <option key={departamento.id} value={departamento.id}>
                  {departamento.departamento}
                </option>
              ))}
            </select>
          </div>
          <div className="ml-10 mt-3">
            <select
              value={selectedCiudad}
              onChange={(e) => {
                handleCiudadChange(e);
                setFormData({
                  ...formData,
                  ciudadId: e.target.value,
                });
                listConsorcios(e.target.value, selectedAnio);
              }}
              disabled={!selectedDepartamento}
              className="mb-4 rounded-xl  text-secundary shadow-md shadow-blue-500 px-2  py-3 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
            >
              <option value="">Selecciona una ciudad</option>
              {filteredCiudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.ciudad}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {selectedCiudad && (
        <>
          <div className="flex  justify-between">
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="  p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowLeftSLine />
              </button>
              <span className="mt-2 mx-2">{`Página ${currentPage} de ${Math.ceil(
                consorcios.length / itemsPerPage
              )}`}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(consorcios.length / itemsPerPage)
                }
                className="p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowRightSLine />
              </button>
            </div>
            <div className="mt-8 text-right font-bold">
              <p>Total facturas: ${totalSubtotal.toLocaleString("de-DE")}</p>
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
          <table className="table-auto w-full mt-8">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-secundary text-white">#</th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Fecha <br />
                  <select
                    onChange={(e) => handleAnioChange(e.target.value)}
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
                  Nombre o Razón Social del Emisor
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Nombre Comprador
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Subtotal Factura
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                 Ver mas
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
                    <td className="border px-4 py-2">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="border px-4 text-center">
                      {consorcio.fechaEmision}
                    </td>
                    <td className="border px-4 text-center">
                      <HighlightedText
                        text={consorcio.nombreComercialEmisor}
                        highlight={searchQuery}
                      />
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <HighlightedText
                        text={consorcio.nombreAdquiriente}
                        highlight={searchQuery}
                      />
                    </td>
                    <td className="border px-4 py-2 text-center">
                      ${consorcio.subtotal}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleViewConsorcio(consorcio.id)}
                        className="p-1 rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-1
                        duration-300 hover:from-secundary hover:to-[#042cb3]"
                      ><RiSearchEyeLine /></button>
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
          </table>
        </div>
          <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        
        
        
        cancelText="Cerrar"
        showConfirmButton={false}
       
      >
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {factura && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Detalles de la Factura</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 break-words">
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">ID</p>
              <p className="text-lg font-semibold">{factura.id}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Fecha Creación</p>
              <p className="text-lg font-semibold">{factura.fechaCreacion}</p>
            </div>
            
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Número Factura</p>
              <p className="text-lg font-semibold">{factura.numeroFactura}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Forma de Pago</p>
              <p className="text-lg font-semibold">{factura.formaPago}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Fecha Emisión</p>
              <p className="text-lg font-semibold">{factura.fechaEmision}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">País Emisor</p>
              <p className="text-lg font-semibold">{factura.paisEmisor}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Departamento Emisor</p>
              <p className="text-lg font-semibold">{factura.departamentoEmisor}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Municipio Emisor</p>
              <p className="text-lg font-semibold">{factura.municipioEmisor}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Dirección Emisor</p>
              <p className="text-lg font-semibold">{factura.direccionEmisor}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Correo Emisor</p>
              <p className="text-lg font-semibold">{factura.correoEmisor}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Teléfono Emisor</p>
              <p className="text-lg font-semibold">{factura.telefonoEmisor}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Nombre Comercial Emisor</p>
              <p className="text-lg font-semibold">{factura.nombreComercialEmisor}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">NIT Emisor</p>
              <p className="text-lg font-semibold">{factura.nitEmisor}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Tipo Contribuyente Emisor</p>
              <p className="text-lg font-semibold">{factura.tipoContribuyenteEmisor}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Nombre Adquiriente</p>
              <p className="text-lg font-semibold">{factura.nombreAdquiriente}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Codigo Unico</p>
              <p className="text-lg font-semibold ">{factura.codigoUnico}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Número Documento Adquiriente</p>
              <p className="text-lg font-semibold">{factura.numeroDocumentoAdquiriente}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Tipo Documento Adquiriente</p>
              <p className="text-lg font-semibold">{factura.tipoDocumentoAdquiriente}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">País Adquiriente</p>
              <p className="text-lg font-semibold">{factura.paisAdquiriente}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Departamento Adquiriente</p>
              <p className="text-lg font-semibold">{factura.departamentoAdquiriente}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Municipio Adquiriente</p>
              <p className="text-lg font-semibold">{factura.municipioAdquiriente}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Dirección Adquiriente</p>
              <p className="text-lg font-semibold">{factura.direccionAdquiriente}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Correo Adquiriente</p>
              <p className="text-lg font-semibold">{factura.correoAdquiriente}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Teléfono Adquiriente</p>
              <p className="text-lg font-semibold">{factura.telefonoAdquiriente}</p>
            </div>
            <div className="border-t pt-2">
              <p className="text-sm text-gray-500">Subtotal</p>
              <p className="text-lg font-semibold">${factura.subtotal}</p>
            </div>
            <div className="border-t pt-2">
              <p className="text-sm text-gray-500">Total Factura</p>
              <p className="text-lg font-semibold">${factura.totalFactura}</p>
            </div>
          </div>
        </div>
        
        )}
      </Modal>
        </>
      )}
    </div>
  );
};

export default ConsorcioVendedorMunicipio;
