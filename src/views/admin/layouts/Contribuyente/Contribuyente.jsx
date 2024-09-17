import { useState, useEffect } from "react";
import useListContribuyente from "../../../hook/Contribuyente/useListContribuyente";
import {
  RiSearchLine,
  RiDownloadLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import HighlightedText from "../../../../utils/HighlightedText";
import useDownloadContribuyente from "../../../hook/Contribuyente/useDownloadContribuyente";

const Contribuyente = () => {
  const { contribuyentes, fetchContribuyentes, fetchFacturaById, factura } =
    useListContribuyente();
    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const { handleDownloadExcel } = useDownloadContribuyente();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isFacturaSelected, setIsFacturaSelected] = useState(false);

  useEffect(() => {
    fetchContribuyentes(searchQuery);
  }, [searchQuery, fetchContribuyentes]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contribuyentes.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (selectedId) {
      fetchFacturaById(selectedId);
      setIsFacturaSelected(true);
    } else {
      setIsFacturaSelected(false);
    }
  }, [selectedId, fetchFacturaById]);

  const handleSelect = (id) => {
    setSelectedId(id);
  };
  const handleDownload = () => {
    handleDownloadExcel(searchQuery);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedId("");
  };

  const tableRows = () => {
    if (isFacturaSelected && factura) {
      return factura.map((facturaItem, index) => (
        <tr
          key={facturaItem.id}
          className={
            index % 2 === 0
              ? "bg-gray-100 whitespace-nowrap"
              : "bg-white whitespace-nowrap"
          }
        >
          <td className="border px-4 py-2 text-center">{index + 1}</td>
          <td className="border px-4 text-center">
            {facturaItem.nombreContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            <HighlightedText
              text={facturaItem.nitContribuyente}
              highlight={searchQuery}
            />
          </td>
          <td className="border px-4 py-2 text-center">
            {facturaItem.departamentoContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            {facturaItem.municipioContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            {facturaItem.direccionContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            {facturaItem.correoContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            {facturaItem.telefonoContribuyente}
          </td>
        </tr>
      ));
    } else {
      return currentItems.map((contribuyente, index) => (
        <tr
          key={contribuyente.id}
          className={
            index % 2 === 0
              ? "bg-gray-100 whitespace-nowrap"
              : "bg-white whitespace-nowrap"
          }
        >
          <td className="border px-4 py-2 text-center">{indexOfFirstItem+index + 1}</td>
          <td className="border px-4 text-center">
            {contribuyente.nombreContribuyente}
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
      ));
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center px-4 py-6">
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
            onChange={(e) => handleSearch(e.target.value)}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1 rounded-md shadow-2xl text-secundary font-semibold" />
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4 mt-4 xl:mt-0">
        Lista de Contribuyentes
      </h1>
      <div className="flex mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="  p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                
                <RiArrowLeftSLine />
              </button>
              <span className="mt-2 mx-2">{`Página ${currentPage} de ${Math.ceil(
                contribuyentes.length / itemsPerPage
              )}`}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(contribuyentes.length / itemsPerPage)
                }
                className="p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowRightSLine />
              </button>
            </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white">#</th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre Contribuyente <br />
                <select
                  value={selectedId}
                  onChange={(e) => handleSelect(e.target.value)}
                  className="mt-4 text-secundary rounded-md px-2 w-full  py-1 bg-tertiary-100 focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
                >
                  <option value="">Selecciona un nombre</option>
                  {contribuyentes.map((contribuyente) => (
                    <option key={contribuyente.id} value={contribuyente.id}>
                      {contribuyente.nombreContribuyente}
                    </option>
                  ))}
                </select>
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
          <tbody>{tableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Contribuyente;
