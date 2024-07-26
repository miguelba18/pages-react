import useListFacturasEmisor from "../../../../../hook/Facturas/Adquiriente y emisor/Emisor/Agrupadas/Alcalde/useListFacturasEmisor"
import { useEffect } from "react"

const AgrupadasEmisorAlcalde = () => {
  const { facturas, totalSuma, fetchFacturas } = useListFacturasEmisor();
  useEffect(() => {
    fetchFacturas();
  }, [fetchFacturas]);

  return (
    <div>
        <div className="overflow-x-auto">
            <table className="table-auto w-full mt-6">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-secundary text-white">#</th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Nombre o Razón Social del Emisor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Número Documento del Emisor
                  </th>

                  <th className="px-4 py-2 bg-secundary text-white">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {facturas.map((factura, index) => (
                  <tr key={factura.id} className={
                    index % 2 === 0
                      ? "bg-gray-100 whitespace-nowrap"
                      : "bg-white whitespace-nowrap"
                  }>
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 text-center">
                      {factura.nombreComercialEmisor}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {factura.nitEmisor}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      ${factura.subtotal}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tr>
              <th className="px-4 py-2 bg-secundary text-white" colSpan={3}>Total</th>
              <th className="border px-4 py-2">${totalSuma}</th>
            </tr>
            </table>
          </div>
      
    </div>
  )
}

export default AgrupadasEmisorAlcalde
