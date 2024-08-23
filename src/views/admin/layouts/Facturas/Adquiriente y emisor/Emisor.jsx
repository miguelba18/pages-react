import useListEmisor from "../../../../../views/hook/Facturas/Adquiriente y emisor/Emisor/useListEmisor";
import useDescargarFacturas from "../../../../hook/Facturas/Adquiriente y emisor/Emisor/useDescargarFacturas";
import { RiSearchLine, RiDownloadLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import HighlightedText from "../../../../../utils/HighlightedText";

const Emisor = () => {
  const { emisores, searchEmisores } = useListEmisor();
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { handleDownloadExcel } = useDescargarFacturas();
  const [selectedAnio, setSelectedAnio] = useState("");

  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    searchEmisores(searchQuery, anio);
  };

  useEffect(() => {
    searchEmisores(searchQuery, selectedAnio);
  }, [searchQuery, selectedAnio, searchEmisores]);

  useEffect(() => {
    const total = emisores.reduce((sum, emisor) => {
      const subtotalStr = emisor.subtotal.replace(/\./g, "");
      const subtotal = parseFloat(subtotalStr.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);

    setTotalSubtotal(total);
  }, [emisores]);
  const handleDownload = () => {
    handleDownloadExcel(searchQuery, selectedAnio);
  };

  return (
    <div className="overflow-auto">
      <div className="flex xl:justify-end items-center">
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
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchEmisores(e.target.value, selectedAnio);
            }}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-secundary font-semibold" />
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
                Fecha <br />
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
                Nombre o Razón Social del Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Número Documento del Emisor
              </th>

              <th className="px-4 py-2 bg-secundary text-white">
                Total Factura
              </th>
            </tr>
          </thead>
          <tbody>
            {emisores.length === 0 && selectedAnio ? (
              <tr>
                <td colSpan="17" className="px-4 py-2 text-red-500 text-center">
                  Este año no tiene facturas disponibles
                </td>
              </tr>
            ) : (
              emisores.map((emisor, index) => (
                <tr
                  key={emisor.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 whitespace-nowrap"
                      : "bg-white whitespace-nowrap"
                  }
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 text-center">{emisor.fechaEmision}</td>
                  <td className="border px-4 text-center">
                    <HighlightedText
                      text={emisor.nombreComercialEmisor}
                      highlight={searchQuery}
                    />
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <HighlightedText
                      text={emisor.nitEmisor}
                      highlight={searchQuery}
                    />
                  </td>

                  <td className="border px-4 py-2 text-center">${emisor.subtotal}</td>
                </tr>
              ))
            )}
          </tbody>
          <tr>
            <th className="px-4 py-2 bg-secundary text-white" colSpan={4}>
              Total
            </th>
            <th className="border px-4 py-2">
              ${totalSubtotal.toLocaleString("de-DE")}
            </th>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Emisor;
