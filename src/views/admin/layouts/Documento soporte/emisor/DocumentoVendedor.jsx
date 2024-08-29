import useListDocumentoVendedor from "../../../../hook/documento soporte/useListDocumentoVendedor";
import useDescargarFacturas from "../../../../hook/Facturas/Adquiriente y emisor/Emisor/useDescargarFacturas";
import { RiSearchLine, RiDownloadLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import HighlightedText from "../../../../../utils/HighlightedText";
const DocumentoVendedor = () => {
  const [formData, setFormData] = useState({});

  const { handleDownloadExcel } = useDescargarFacturas();
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [resetAnio, setResetAnio] = useState(false);
  const [setFacturasDisponibles] = useState(true);

  const {
    handleSearch,
    facturas,
    departamentos,
    filteredCiudades,
    handleCiudadChange,
    handleDepartamentoChange,
    selectedCiudad,
    selectedDepartamento,
    searchQuery,
    fetchFacturas,
    selectedAnio,
    setSelectedAnio,
  } = useListDocumentoVendedor();

  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    fetchFacturas(selectedCiudad, searchQuery, anio)
      .then((facturas) => {
        setFacturasDisponibles(facturas.length > 0);
      })
      .catch(() => {
        setFacturasDisponibles(false);
      });
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
    const total = facturas.reduce((sum, emisor) => {
      const subtotalStr = emisor.subtotal.replace(/\./g, "");
      const subtotal = parseFloat(subtotalStr.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);

    setTotalSubtotal(total);
  }, [facturas]);

  const handleDownload = () => {
    handleDownloadExcel(selectedCiudad,searchQuery, selectedAnio);
  };

  return (
    <div className="">
      <div className="flex xl:justify-between items-center ">
        <div className="flex justify-around  ">
          <div className="ml-4">
            
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
          <div className="ml-20">
            
            <select
              value={selectedCiudad}
              onChange={(e) => {
                handleCiudadChange(e);
                setFormData({
                  ...formData,
                  ciudadId: e.target.value,
                });
                fetchFacturas(e.target.value, searchQuery, selectedAnio);
              }}
              disabled={!selectedDepartamento}
              className="mb-4 rounded-xl  text-secundary shadow-md shadow-blue-500 px-2  py-3 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent  "
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
        <div className="flex  ">
          <div className="xl:relative mr-4">
            <button
              onClick={handleDownload}
              disabled={!selectedCiudad}
              className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
            >
              <span className="hidden md:inline">Descargar facturas</span>
              <RiDownloadLine className="mr-0 xl:mr-2" />
            </button>
          </div>

          <div className="relative xl:right-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchWithResetAnio(e.target.value)}
              className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
              placeholder="Search"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
              <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-secundary font-semibold " />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 mt-4 xl:mt-0">
        Facturas de Emisores
      </h1>
      {selectedCiudad && (
        <>
        <div className="mt-4 text-right font-bold">
        <p>Total facturas: ${totalSubtotal.toLocaleString("de-DE")}</p>
      </div>
        <div className="overflow-x-auto mt-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-secundary text-white">#</th>
                <th className="px-4 py-2 bg-secundary text-white ">
                  Fecha Generacion<br/>
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
                  Fecha Vencimiento
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Codigo Unico
                </th>
                
           
                <th className="px-4 py-2 bg-secundary text-white">
                  Nombre Emisor
                </th>
                
                <th className="px-4 py-2 bg-secundary text-white">
                  Tipo Documento
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  NIT Emisor
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Tipo Contribuyente
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Departamento Emisor
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Municipio Emisor
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Direccion
                </th>
                
                <th className="px-4 py-2 bg-secundary text-white">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {facturas.length > 0 ? (
                facturas.map((factura, index) => (
                  <tr key={index} className={
                    index % 2 === 0
                      ? "bg-gray-100 whitespace-nowrap"
                      : "bg-white whitespace-nowrap"
                  }>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 text-center">{factura.fechaGeneracion}</td>
                    <td className="border px-4 text-center">{factura.fechaVencimiento}</td>
                    <td className="border px-4 text-center">{factura.codigoUnico}</td>
                   
                    <td className="border px-4 text-center">
                      <HighlightedText
                        text={factura.nombreVendedor}
                        highlight={searchQuery}
                      />
                    </td>
                    <td className="border px-4 text-center">
                        {factura.tipoDocumentoVendedor}
                    </td>
                    <td className="border px-4 text-center">
                      <HighlightedText
                        text={factura.numeroDocumentoVendedor}
                        highlight={searchQuery}
                      />
                    </td>



                    <td className="border px-4 text-center">
                        {factura.tipoContribuyenteVendedor}
                    </td>
                    <td className="border px-4 text-center">
                        {factura.departamentoVendedor}
                    </td>
                    <td className="border px-4 text-center">
                        {factura.municipioVendedor}
                    </td>
                    <td className="border px-4 text-center">
                        {factura.direccionVendedor}
                    </td>


                    <td className="border px-4 text-center">${factura.subtotal}</td>
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
                    colSpan={11}
                  >
                    Total
                  </th>
                  <th className="border px-4 py-2">${totalSubtotal.toLocaleString("de-DE")}</th>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        </>
      )}
    </div>
  );
};

export default DocumentoVendedor;
