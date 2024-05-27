
import useListAdquiriente from "../../../hook/Facturas/Adquiriente y emisor/useListAdquiriente";
import { RiSearchLine, RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import { useState } from "react";

const Adquiriente = () => {
  const { adquirientes, searchAdquirientes } = useListAdquiriente();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    searchAdquirientes(searchQuery);
  };

  return (
    <div >
      <div className="flex justify-end items-center space-x-4">
        <div className="absolute right-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6  "
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary  ">
            <RiSearchLine className="h-6 w-6 p-1 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] " onClick={handleSearch} />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">Factura de Adquirientes</h1>
      <table className="table-auto w-full mt-8">
        <thead>
          <tr>
          <th className="px-4 py-2 bg-secundary text-white">#</th>
            <th className="px-4 py-2 bg-secundary text-white">
              Nombre o Razón Social del Adquiriente
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Tipo Documento del Adquiriente
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Número Documento del Adquiriente
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              País del Adquiriente
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Departamento del Adquiriente
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Municipio del Adquiriente
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Dirección del Adquiriente
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Correo del Adquiriente
            </th>
            <th className="px-4 py-2 bg-secundary text-white">
              Subtotal
            </th>
            <th className="px-4 py-2 bg-secundary text-white">ACCIONES</th>
          </tr>
        </thead>

        <tbody>
          {adquirientes.map((adquiriente, index) => (
            <tr key={adquiriente.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 ">{adquiriente.nombreAdquiriente}</td>
              <td className="border px-4 py-2">{adquiriente.tipoDocumentoAdquiriente}</td>
              <td className="border px-4 py-2">{adquiriente.numeroDocumentoAdquiriente}</td>
              <td className="border px-4 py-2">{adquiriente.paisAdquiriente}</td>
              <td className="border px-4 py-2">{adquiriente.departamentoAdquiriente}</td>
              <td className="border px-4 py-2">{adquiriente.municipioAdquiriente}</td>
              <td className="border px-4 py-2">{adquiriente.direccionAdquiriente}</td>
              <td className="border px-4 py-2">{adquiriente.correoAdquiriente}</td>
              <td className="border px-4 py-2">${adquiriente.subtotal}</td>
              <td className="border p-10 flex justify-center items-center">
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

export default Adquiriente;
