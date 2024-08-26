import { useEffect } from "react";

import useListConsorcios from "../../../../hook/Consorcios/useListConsorcios";
const ClienteAlcalde = () => {
  const { consorcios, listConsorcios } = useListConsorcios();

  useEffect(() => {
    listConsorcios();
  }, [listConsorcios]);

  return (
    <div>
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
            consorcios.map((consorcio, index) => (
              <tr
                key={consorcio.id}
                className={
                  index % 2 === 0
                    ? "bg-gray-100 whitespace-nowrap"
                    : "bg-white whitespace-nowrap"
                }
              >
                <td className="border px-4 py-2 text-center">{index + 1}</td>
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
