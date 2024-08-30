import { useEffect } from "react";
import TablaVendedorAlcalde from "./TablaVendedorAlcalde";
import { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import useListConsorcios from "../../../../hook/Consorcios/useListConsorcios";
const VendedorAlcalde = () => {
  const { consorcios, listConsorcios } = useListConsorcios();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [selectedAnio, setSelectedAnio] = useState("");
  const [facturasDisponibles, setFacturasDisponibles] = useState(false);
  const [totalSubtotal, setTotalSubtotal] = useState(0);

  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    listConsorcios("", "", anio)
      .then((facturas) => {
        setFacturasDisponibles(facturas.length > 0);
      })
      .catch(() => {
        setFacturasDisponibles(false);
      });
  };
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
        <div className="overflow-x-auto">
          <table className="table-auto w-full mt-8">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-secundary text-white">#</th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Fecha <br />
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
                  Nombre o Razón Social del Emisor
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Número Documento del Emisor
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Departamento del Emisor
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Municipio del Emisor
                </th>

                <th className="px-4 py-2 bg-secundary text-white">
                  Subtotal Factura
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Nombre Comprador
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
                    <td className="border px-4 py-2">{indexOfFirstItem+index + 1}</td>
                    <td className="border px-4 text-center">
                      {consorcio.fechaEmision}
                    </td>
                    <td className="border px-4 text-center">
                      {consorcio.nombreComercialEmisor}
                    </td>

                    <td className="border px-4 py-2 text-center">
                      {consorcio.nitEmisor}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {consorcio.departamentoEmisor}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {consorcio.municipioEmisor}
                    </td>

                    <td className="border px-4 py-2 text-center">
                      ${consorcio.subtotal}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {consorcio.nombreAdquiriente}
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
        <div className="mt-6">
          <TablaVendedorAlcalde />
        </div>
      </>
    </div>
  );
};

export default VendedorAlcalde;
