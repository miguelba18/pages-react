import { useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import useSelectCityDepaUtils from "../../../../../utils/useSelectCityDepaUtils";
import useListConsorcios from "../../../../hook/Consorcios/useListConsorcios";

const ConsorcioClienteMunicipio = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [totalSubtotal, setTotalSubtotal] = useState(0);

  const { consorcios, listConsorcios, setConsorcios } = useListConsorcios();
  const [formData, setFormData] = useState({});
  const {
    departamentos,
    filteredCiudades,
    selectedDepartamento,
    selectedCiudad,
    handleDepartamentoChange,
    handleCiudadChange,
  } = useSelectCityDepaUtils();
  useEffect(() => {
    if (selectedCiudad) {
      listConsorcios(selectedCiudad);
    } else {
      setConsorcios([]);
    }
  }, [listConsorcios, selectedCiudad, setConsorcios]);

  useEffect(() => {
    setConsorcios([]);
  }, [selectedDepartamento, setConsorcios]);
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
              listConsorcios(e.target.value);
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
      {selectedCiudad && (
        <>
        <h1 className="font-bold text-3xl text-secundary">
          Facturas No Vinculante Clientes
        </h1>
          <div className="flex  justify-between">
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="  p-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowLeftSLine />
              </button>
              <span className="mt-2 mx-2 text-sm">{`Página ${currentPage} de ${Math.ceil(
                consorcios.length / itemsPerPage
              )}`}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(consorcios.length / itemsPerPage)
                }
                className="p-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowRightSLine />
              </button>
            </div>
            <div className="mt-8 text-right font-bold">
              <p>Total facturas: ${totalSubtotal.toLocaleString("de-DE")}</p>
            </div>
          </div>
          <div className=" overflow-x-auto">
            <table className="table-auto w-full mt-6">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-secundary text-white">#</th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Fecha <br />
                  </th>
                 

                  <th className="px-4 py-2 bg-secundary text-white">
                    Nombre Vendedor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Nit Vendedor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Nombre o Razón Social del Comprador
                  </th>

                  <th className="px-4 py-2 bg-secundary text-white">
                    Número Documento del Comprador
                  </th>

                  <th className="px-4 py-2 bg-secundary text-white">
                  Total acumulado
                  </th>
                </tr>
              </thead>
              <tbody>
                {consorcios.length === 0 ? (
                  <tr>
                    <td
                      colSpan="17"
                      className="px-4 py-2 text-red-500 text-center"
                    >
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
                      <td className="border px-4 py-2 text-center">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="border px-4 text-center">
                        {consorcio.fechaEmision}
                      </td>
                      

                      <td className="border px-4 py-2 text-center">
                        {consorcio.nombreComercialEmisor}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {consorcio.nitEmisor}
                      </td>
                      <td className="border px-4 text-center">
                        {consorcio.nombreAdquiriente}
                      </td>

                      <td className="border px-4 py-2 text-center">
                        {consorcio.numeroDocumentoAdquiriente}
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
        </>
      )}
    </div>
  );
};

export default ConsorcioClienteMunicipio;
