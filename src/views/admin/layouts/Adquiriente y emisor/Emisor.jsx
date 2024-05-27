
import useListEmisor from "../../../hook/Facturas/Adquiriente y emisor/useListEmisor";
import { RiSearchLine, RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";

const Emisor = () => {
  const { emisores } = useListEmisor();

  return (
    <div>
      <div className="flex justify-end items-center space-x-4">
        <div className="absolute right-0">
          <input
            type="text"
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6  "
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary  ">
            <RiSearchLine className="h-6 w-6 " />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">Factura de Emisores</h1>
      <table className="table-auto w-full mt-8">
        <thead>
          <tr>
          <th className="px-4 py-2 bg-secundary text-white">#</th>
            <th className="px-4 py-2 bg-secundary text-white">
              Nombre o Razón Social del Emisor
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Número Documento del Emisor
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              País del Emisor
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Departamento del Emisor
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Municipio del Emisor
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Dirección del Emisor
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Correo del Emisor
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Total Bruto
            </th>
            <th className="px-4 py-2 bg-secundary text-white">ACCIONES</th>
          </tr>
        </thead>

        <tbody>
          {emisores.map((emisor, index) => (
            <tr key={emisor.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{emisor.nombreComercialEmisor}</td>
              <td className="border px-4 py-2">{emisor.nitEmisor}</td>
              <td className="border px-4 py-2">{emisor.paisEmisor}</td>
              <td className="border px-4 py-2">{emisor.departamentoEmisor}</td>
              <td className="border px-4 py-2">{emisor.municipioEmisor}</td>
              <td className="border px-4 py-2">{emisor.direccionEmisor}</td>
              <td className="border px-4 py-2">{emisor.correoEmisor}</td>
              <td className="border px-4 py-2">${emisor.totalFactura}</td>
              <td className="border p-6 flex justify-center items-center">
                <button className="flex mr-2 justify-center items-center gap-2 w-12 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3]">
                  <RiEdit2Fill />
                </button>
                <button className="flex justify-center items-center gap-2 w-12 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]">
                  <RiDeleteBin5Fill className="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Emisor;
