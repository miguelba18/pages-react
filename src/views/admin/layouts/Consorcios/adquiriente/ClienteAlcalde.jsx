import { useEffect, useState } from "react";
import {
  
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import useListConsorcios from "../../../../hook/Consorcios/useListConsorcios";
const ClienteAlcalde = () => {
  const { consorcios, listConsorcios } = useListConsorcios();
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  useEffect(() => {
    listConsorcios();
  }, [listConsorcios]);
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
  return (
    <div>
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
       <div className="overflow-x-auto">
      <table className="table-auto w-full mt-6">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-secundary text-white">#</th>
            <th className="px-4 py-2 bg-secundary text-white">
              Fecha <br />
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Nombre o Razón Social del Adquiriente
            </th>

            <th className="px-4 py-2 bg-secundary text-white">
              Número Documento del Adquiriente
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Departamento del Adquiriente
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Municipio del Adquiriente
            </th>

            <th className="px-4 py-2 bg-secundary text-white">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {consorcios.length === 0 ? (
            <tr>
              <td colSpan="17" className="px-4 py-2 text-red-500 text-center">
                No hay facturas para esta ciudad
              </td>
            </tr>
          ) : (
            currentItems.map((consorcio, index) => (
              <tr
                key={consorcio.id}
                className={
                  index % 2 === 0
                    ? "bg-gray-100 whitespace-nowrap"
                    : "bg-white whitespace-nowrap"
                }
              >
                <td className="border px-4 py-2 text-center">{indexOfFirstItem+index + 1}</td>
                <td className="border px-4 text-center">
                  {consorcio.fechaEmision}
                </td>
                <td className="border px-4 text-center">
                  {consorcio.nombreAdquiriente}
                </td>

                <td className="border px-4 py-2 text-center">
                  {consorcio.numeroDocumentoAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.departamentoAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.municipioAdquiriente}
                </td>

                <td className="border px-4 py-2 text-center">
                  <div className="flex justify-between">
                    ${consorcio.subtotal}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ClienteAlcalde;
