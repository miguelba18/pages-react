import { useState, useEffect } from "react";
import { RiSearchLine, RiDownloadLine,RiArrowLeftSLine,RiArrowRightSLine } from "react-icons/ri";
import useListAdquiriente from "../../../../hook/Facturas/Adquiriente y emisor/adquiriente/useListAdquiriente";
import useDescargarFacturas from "../../../../hook/Facturas/Adquiriente y emisor/adquiriente/useDescargarFacturas";
import HighlightedText from "../../../../../utils/HighlightedText";

const Adquiriente = () => {
  const { adquirientes, searchAdquirientes } = useListAdquiriente();
  const { handleDownloadExcel } = useDescargarFacturas();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnio, setSelectedAnio] = useState("");
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const itemsPerPage = 100;
  const [currentPage, setCurrentPage] = useState(1);
  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    searchAdquirientes(searchQuery, anio);
  };

  useEffect(() => {
    searchAdquirientes(searchQuery, selectedAnio);
  }, [searchQuery, selectedAnio, searchAdquirientes]);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adquirientes.slice(indexOfFirstItem, indexOfLastItem);
  useEffect(() => {
    const total = adquirientes.reduce((sum, adquiriente) => {
      const subtotalStr = adquiriente.subtotal.replace(/\./g, "");
      const subtotal = parseFloat(subtotalStr.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);

    setTotalSubtotal(total);
  }, [adquirientes]);

  const handleDownload = () => {
    handleDownloadExcel(searchQuery, selectedAnio);
  };

  return (
    <div className=" ">
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
              searchAdquirientes(e.target.value, selectedAnio);
            }}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-secundary font-semibold " />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 mt-4 xl:mt-0">
        Facturas de Adquirientes
      </h1>
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
                adquirientes.length / itemsPerPage
              )}`}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(adquirientes.length / itemsPerPage)
                }
                className="p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowRightSLine />
              </button>
            </div>
            <div className="items-center  flex justify-end font-bold">
              <p>Total facturas: ${totalSubtotal.toLocaleString("de-DE")}</p>
            </div>
          </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-6">
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
                Nombre o Razón Social del Adquiriente
              </th>

              <th className="px-4 py-2 bg-secundary text-white">
                Número Documento del Adquiriente
              </th>

              <th className="px-4 py-2 bg-secundary text-white">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {adquirientes.length === 0 && selectedAnio ? (
              <tr>
                <td colSpan="17" className="px-4 py-2 text-red-500 text-center">
                  Este año no tiene facturas disponibles
                </td>
              </tr>
            ) : (
              currentItems.map((adquiriente, index) => (
                <tr
                  key={adquiriente.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 whitespace-nowrap"
                      : "bg-white whitespace-nowrap"
                  }
                >
                  <td className="border px-4 py-2 text-center">{indexOfFirstItem+index + 1}</td>
                  <td className="border px-4 text-center">{adquiriente.fechaEmision}</td>
                  <td className="border px-4 text-center">
                    <HighlightedText
                      text={adquiriente.nombreAdquiriente}
                      highlight={searchQuery}
                    />
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <HighlightedText
                      text={adquiriente.numeroDocumentoAdquiriente}
                      highlight={searchQuery}
                    />
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-between">
                      ${adquiriente.subtotal}
                    </div>
                  </td>
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

export default Adquiriente;
