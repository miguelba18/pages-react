import useListDocumentoComprador from "../../../../hook/documento soporte/useListDocumentoComprador";
import {
  RiSearchLine,
  RiDownloadLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { useState, useEffect } from "react";
import HighlightedText from "../../../../../utils/HighlightedText";
import useDescargarFacturasAdquirientes from "../../../../hook/documento soporte/useDescargarFacturasAdquirientes";
const DocumentoCompradorAlcalde = () => {
  const { handleDownloadExcel } = useDescargarFacturasAdquirientes();
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [resetAnio, setResetAnio] = useState(false);
  const [facturasDisponibles, setFacturasDisponibles] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnio, setSelectedAnio] = useState("");
  const itemsPerPage = 100;
  const {
    facturas,

    fetchFacturas,
  } = useListDocumentoComprador();

  useEffect(() => {
    fetchFacturas("", searchQuery, selectedAnio);
  }, [searchQuery, selectedAnio, fetchFacturas]);

  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    fetchFacturas("", searchQuery, anio)
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
  const handleSearch = (query, anio) => {
    setSearchQuery(query);
    fetchFacturas("", query, anio);
  };

  useEffect(() => {
    if (resetAnio) {
      setResetAnio(false);
    }
  }, [resetAnio]);

  useEffect(() => {
    const total = facturas.reduce((sum, adquiriente) => {
      const subtotalStr = adquiriente.subtotal.replace(/\./g, "");
      const subtotal = parseFloat(subtotalStr.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);

    setTotalSubtotal(total);
  }, [facturas]);

  const handleDownload = () => {
    handleDownloadExcel("", searchQuery, selectedAnio);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facturas.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="">
      
      <div className="flex xl:justify-between items-center ">
      <h1 className="font-bold text-3xl text-secundary mb-4">
          Facturas Documento Comprador
        </h1>
        <div className="flex  ">
          <div className="xl:relative mr-4">
            <button
              onClick={handleDownload}
              className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
            >
              <span className="hidden md:inline">Descargar facturas</span>
              <RiDownloadLine className="mr-0 xl:mr-2" />
            </button>
          </div>

          <div className="relative xl:right-0">
            <input
              type="number"
              value={searchQuery}
              onChange={(e) =>
                handleSearchWithResetAnio(e.target.value, facturasDisponibles)
              }
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
        <div className="mt-8 text-right font-bold">
          <p>Total facturas: ${totalSubtotal.toLocaleString("de-DE")}</p>
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white">#</th>
              <th className="px-4 py-2 bg-secundary text-white ">
                Fecha Generacion <br />
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
                Fecha Vencimiento
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Codigo Unico
              </th>

              <th className="px-4 py-2 bg-secundary text-white">
                Nombre adquiriente o comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                NIT adquiriente o comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Tipo Contribuyente
              </th>

              <th className="px-4 py-2 bg-secundary text-white">SubTotal</th>
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
                    {factura.fechaGeneracion}
                  </td>
                  <td className="border px-4 text-center">
                    {factura.fechaVencimiento}
                  </td>
                  <td className="border px-4 text-center">
                    {factura.codigoUnico}
                  </td>

                  <td className="border px-4 text-center">
                    <HighlightedText
                      text={factura.nombreAdquiriente}
                      highlight={searchQuery}
                    />
                  </td>
                  <td className="border px-4 text-center">
                    <HighlightedText
                      text={factura.nitAdquiriente}
                      highlight={searchQuery}
                    />
                  </td>
                  <td className="border px-4 text-center">
                    {factura.tipoContribuyenteAdquiriente}
                  </td>
                  <td className="border px-4 text-center">
                    ${factura.subtotal}
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
                <th className="px-4 py-2 bg-secundary text-white" colSpan={7}>
                  Total
                </th>
                <th className="border px-4 py-2">
                  ${totalSubtotal.toLocaleString("de-DE")}
                </th>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default DocumentoCompradorAlcalde;
