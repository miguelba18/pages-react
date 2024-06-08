import useListEmisor from "../../../hook/Facturas/Adquiriente y emisor/Emisor/useListEmisor";
import useDescargarFacturas from "../../../hook/Facturas/Adquiriente y emisor/Emisor/useDescargarFacturas";
import { RiSearchLine, RiDownloadLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import HighlightedText from "../../../../utils/HighlightedText";

const Emisor = () => {
  const { emisores, searchEmisores } = useListEmisor();
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { handleDownloadExcel } = useDescargarFacturas();

  useEffect(() => {
    const total = emisores.reduce((sum, emisor) => {
      const subtotalStr = emisor.totalFactura.replace(/\./g, "");
      const subtotal = parseFloat(subtotalStr.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);

    setTotalSubtotal(total);
  }, [emisores]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchEmisores(query);
  };

  const handleDownload = () => {
    handleDownloadExcel(searchQuery);
  };

  return (
    <div className="overflow-auto">
      <div className="flex xl:justify-end items-center">
        <div className="xl:relative mr-4">
          <button
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>
        <div className="relative xl:right-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-6 w-6" />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 mt-4 xl:mt-0">
        Factura de Emisores
      </h1>
      <div className="mt-4 text-right font-bold">
        <p>Total facturas: ${totalSubtotal.toLocaleString("de-DE")}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-8">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white">#</th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre o Razón Social del Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Número Documento del Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                País del Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento del Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio del Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección del Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo del Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">Total Bruto</th>
            </tr>
          </thead>
          <tbody>
            {searchQuery === ""
              ? emisores.map((emisor, index) => (
                  <tr key={emisor.id} className="whitespace-nowrap">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4">
                      {emisor.nombreComercialEmisor}
                    </td>
                    <td className="border px-4 py-2">{emisor.nitEmisor}</td>
                    <td className="border px-4 py-2">{emisor.paisEmisor}</td>
                    <td className="border px-4 py-2">
                      {emisor.departamentoEmisor}
                    </td>
                    <td className="border px-4 py-2">
                      {emisor.municipioEmisor}
                    </td>
                    <td className="border px-4 py-2">
                      {emisor.direccionEmisor}
                    </td>
                    <td className="border px-4 py-2">{emisor.correoEmisor}</td>
                    <td className="border px-4 py-2">{emisor.totalFactura}</td>
                  </tr>
                ))
              : emisores.map((emisor, index) => (
                  <tr key={emisor.id} className="whitespace-nowrap">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4">
                      <HighlightedText
                        text={emisor.nombreComercialEmisor}
                        highlight={searchQuery}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <HighlightedText
                        text={emisor.nitEmisor}
                        highlight={searchQuery}
                      />
                    </td>
                    <td className="border px-4 py-2">{emisor.paisEmisor}</td>
                    <td className="border px-4 py-2">
                      {emisor.departamentoEmisor}
                    </td>
                    <td className="border px-4 py-2">
                      {emisor.municipioEmisor}
                    </td>
                    <td className="border px-4 py-2">
                      {emisor.direccionEmisor}
                    </td>
                    <td className="border px-4 py-2">{emisor.correoEmisor}</td>
                    <td className="border px-4 py-2">{emisor.totalFactura}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Emisor;
