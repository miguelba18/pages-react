

const Contribuyente = () => {
  return (
    <div>
      <div className="overflow-x-auto">
            <table className="table-auto w-full mt-6">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-secundary text-white">#</th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Fecha
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Nombre Comercial Emisor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Nit Emisor o Vendedor
                  </th>

                  <th className="px-4 py-2 bg-secundary text-white">Total Bruto Facturado</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
              <tr>
              <th className="px-4 py-2 bg-secundary text-white" colSpan={4}>Total</th>
              <th className="border px-4 py-2">${}</th>
            </tr>
            </table>
          </div>
    </div>
  )
}

export default Contribuyente
