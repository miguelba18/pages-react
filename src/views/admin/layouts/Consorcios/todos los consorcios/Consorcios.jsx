import useListConsorcios from "../../../../hook/Contribuyente/Consorcios/useListConsorcios";
import { useState, useEffect } from "react";
const Consorcios = () => {
  const { consorcios } = useListConsorcios();
  const [totalSubtotal, setTotalSubtotal] = useState(0);

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
      <div className="mt-4 text-right font-bold">
        <p>Total facturas: ${totalSubtotal.toLocaleString("de-DE")}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white">#</th>
              <th className="px-4 py-2 bg-secundary text-white">
                CUFE
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Numero Factura
              </th>

              <th className="px-4 py-2 bg-secundary text-white">
                Forma de Pago
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Fecha Emision
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Pais Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamemto Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">Municipio Emisor</th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre Comercial Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                NIT Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Tipo Contribuyente Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre Adquiriente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Numero Documento Adquiriente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
               Tipo Documento Adquiriente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Pais Adquiriente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento Adquiriente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio Adquiriente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección Adquiriente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo Adquiriente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Adquiriente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Subtotal
              </th>

            </tr>
          </thead>
          <tbody>
            {consorcios.map((consorcio, index) => (
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
                  {consorcio.codigoUnico}
                </td>

                <td className="border px-4 py-2 text-center">
                  
                  {consorcio.numeroFactura}
                </td>

                <td className="border px-4 py-2 text-center">
                  {consorcio.formaPago}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.fechaEmision}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.paisEmisor}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.departamentoEmisor}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.municipioEmisor}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.direccionEmisor}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.correoEmisor}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.telefonoEmisor}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.nombreComercialEmisor}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.nitEmisor}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.tipoContribuyenteEmisor}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.nombreAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.numeroDocumentoAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.tipoDocumentoAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.paisAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.departamentoAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.municipioAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.direccionAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.correoAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.telefonoAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  ${consorcio.subtotal}
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Consorcios;
