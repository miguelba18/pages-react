import useListConsorcios from "../../../../hook/Consorcios/useListConsorcios";
import { useEffect } from "react";

const ConsorcioVendedorMunicipio = () => {
  const { consorcios, listConsorcios } = useListConsorcios();

  useEffect(() => {
    listConsorcios();
  }, [listConsorcios]);
  return (
    <div>
      <table className="table-auto w-full mt-8">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-secundary text-white">#</th>
            <th className="px-4 py-2 bg-secundary text-white">
              Fecha <br />
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

            <th className="px-4 py-2 bg-secundary text-white">Subtotal Factura</th>
            <th className="px-4 py-2 bg-secundary text-white">
              Nombre Comprador
            </th>
          </tr>
        </thead>
        <tbody>
          {consorcios.length === 0 ? (
            <tr>
              <td colSpan="17" className="px-4 py-2 text-red-500 text-center">
                Este año no tiene facturas disponibles
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
                <td className="border px-4 py-2">{index + 1}</td>
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
          )}
        </tbody>
        
      </table>
    </div>
  );
};

export default ConsorcioVendedorMunicipio;
