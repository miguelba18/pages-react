const Consorcios = () => {
  return (
    <div>
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
                Direccion Contribuyente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo Contribuyente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">Telefono</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">Juan Perez</td>
              <td className="border px-4 py-2">123456789</td>
              <td className="border px-4 py-2">Guatemala</td>
              <td className="border px-4 py-2">Guatemala</td>
              <td className="border px-4 py-2">Zona 1</td>
              <td className="border px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Consorcios;
