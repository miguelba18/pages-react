import useListAdquiriente from "../../../hook/Facturas/Adquiriente y emisor/adquiriente/useListAdquiriente";
import { RiSearchLine, RiDownloadLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import useDescargarFacturas from "../../../hook/Facturas/Adquiriente y emisor/adquiriente/useDescargarFacturas";

const Adquiriente = () => {
  const { adquirientes, searchAdquirientes } = useListAdquiriente();
  const { handleDownloadExcel } = useDescargarFacturas();
  const [searchQuery, setSearchQuery] = useState("");
  const [totalSubtotal, setTotalSubtotal] = useState(0);

  useEffect(() => {
    const total = adquirientes.reduce((sum, adquiriente) => {
      const subtotalStr = adquiriente.subtotal.replace(/\./g, ''); 
      const subtotal = parseFloat(subtotalStr.replace(/[^0-9.-]+/g, "")); 
      return sum + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);
    
    setTotalSubtotal(total);
  }, [adquirientes]);

  const handleSearch = () => {
    searchAdquirientes(searchQuery);
  };
  const handleDownload = () => {
    handleDownloadExcel(searchQuery);
  };

  return (
    <div className="overflow-auto">
      <div className="flex xl:justify-end items-center">
      <div className="xl:relative mr-4">
          <button onClick={handleDownload} className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]">
            
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>
        
        <div className="relative xl:right-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-6 w-6 p-1 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3]" onClick={handleSearch} />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 mt-4 xl:mt-0">Facturas de Adquirientes</h1>
      <div className="mt-4 text-right font-bold">
        <p>Total facturas: ${totalSubtotal.toLocaleString('de-DE')}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white">#</th>
              <th className="px-4 py-2 bg-secundary text-white">Nombre o Razón Social del Adquiriente</th>
              <th className="px-4 py-2 bg-secundary text-white">Tipo Documento del Adquiriente</th>
              <th className="px-4 py-2 bg-secundary text-white">Número Documento del Adquiriente</th>
              <th className="px-4 py-2 bg-secundary text-white">País del Adquiriente</th>
              <th className="px-4 py-2 bg-secundary text-white">Departamento del Adquiriente</th>
              <th className="px-4 py-2 bg-secundary text-white">Municipio del Adquiriente</th>
              <th className="px-4 py-2 bg-secundary text-white">Dirección del Adquiriente</th>
              <th className="px-4 py-2 bg-secundary text-white">Correo del Adquiriente</th>
              <th className="px-4 py-2 bg-secundary text-white">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {adquirientes.map((adquiriente, index) => (
              <tr key={adquiriente.id} className="whitespace-nowrap">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4">{adquiriente.nombreAdquiriente}</td>
                <td className="border px-4 py-2">{adquiriente.tipoDocumentoAdquiriente}</td>
                <td className="border px-4 py-2">{adquiriente.numeroDocumentoAdquiriente}</td>
                <td className="border px-4 py-2">{adquiriente.paisAdquiriente}</td>
                <td className="border px-4 py-2">{adquiriente.departamentoAdquiriente}</td>
                <td className="border px-4 py-2">{adquiriente.municipioAdquiriente}</td>
                <td className="border px-4 py-2">{adquiriente.direccionAdquiriente}</td>
                <td className="border px-4 py-2">{adquiriente.correoAdquiriente}</td>
                <td className="border px-4 py-2">${adquiriente.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adquiriente;
