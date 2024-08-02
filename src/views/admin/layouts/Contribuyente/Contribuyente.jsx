import useListContribuyente from "../../../hook/Contribuyente/useListContribuyente";
import { useState } from "react";
import { RiSearchLine, RiDownloadLine } from "react-icons/ri";
import HighlightedText from "../../../../utils/HighlightedText";
import useDownloadContribuyente from "../../../hook/Contribuyente/useDownloadContribuyente";
const Contribuyente = () => {
  const { contribuyentes, searchContribuyentes } = useListContribuyente();
  const { handleDownloadExcel} = useDownloadContribuyente();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchContribuyentes(query);
  };
  const handleDownload = () => {
    handleDownloadExcel(searchQuery);
  };

  return (
    <div>
      <div className="flex justify-end items-center px-4 py-6 ">
      <div className="xl:relative mr-4">
          <button
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>
        <div className="relative xl:right-0 ">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-secundary font-semibold " />
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4 mt-4 xl:mt-0">
        Lista de Contribuyentes
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white">#</th>

              <th className="px-4 py-2 bg-secundary text-white">
                Nombre Contribuyente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nit Contribuyente
              </th>

              <th className="px-4 py-2 bg-secundary text-white">
                Departamento Contribuyente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio Contribuyente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección Contribuyente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo Contribuyente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Teléfono Contribuyente
              </th>
            </tr>
          </thead>
          <tbody>
            {contribuyentes.map((contribuyente, index) => (
              <tr
                key={contribuyente.id}
                className={
                  index % 2 === 0
                    ? "bg-gray-100 whitespace-nowrap"
                    : "bg-white whitespace-nowrap"
                }
              >
                <td className="border px-4 py-2 text-center">{index + 1}</td>

                <td className="border px-4 text-center">
                  <HighlightedText
                    text={contribuyente.nombreContribuyente}
                    highlight={searchQuery}
                  />
                </td>

                <td className="border px-4 py-2 text-center">
                  <HighlightedText
                    text={contribuyente.nitContribuyente}
                    highlight={searchQuery}
                  />
                </td>

                <td className="border px-4 py-2 text-center">
                  {contribuyente.departamentoContribuyente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {contribuyente.municipioContribuyente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {contribuyente.direccionContribuyente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {contribuyente.correoContribuyente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {contribuyente.telefonoContribuyente}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contribuyente;
