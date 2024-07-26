import  { useState } from 'react';
import HighlightedText from '../../../../../utils/HighlightedText'; // Asegúrate de importar este componente si es necesario
import { RiSearchLine, RiDownloadLine } from 'react-icons/ri';
import useListAlcalde from '../../../../hook/Facturas/Factura Completa/alcalde/useListAlcalde';

const FacturaCompleta = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { facturas, searchFacturas, totalSuma } = useListAlcalde();

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchFacturas(query);
  };

  return (
    <div>
      <div className="xl:flex justify-end">
        <div className="xl:relative mr-4 xl:mt-6">
          <button
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>

        <div className="relative xl:right-0 xl:mt-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1 xl:mb-2 mb-1 rounded-md shadow-2xl text-secundary font-semibold " />
          </div>
        </div>
      </div>

      <div className="mt-4 text-right font-bold">
        <p>Total facturas: ${totalSuma}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white">#</th>
              <th className="px-4 py-2 bg-secundary text-white">Fecha</th>
              <th className="px-4 py-2 bg-secundary text-white">CUFE</th>
              <th className="px-4 py-2 bg-secundary text-white">Nombre Comercial Emisor o vendedor</th>
              <th className="px-4 py-2 bg-secundary text-white">NIT Emisor o vendedor</th>
              <th className="px-4 py-2 bg-secundary text-white">Departamento Emisor o vendedor</th>
              <th className="px-4 py-2 bg-secundary text-white">Municipio Emisor o vendedor</th>
              <th className="px-4 py-2 bg-secundary text-white">Dirección Emisor o vendedor</th>
              <th className="px-4 py-2 bg-secundary text-white">Correo Emisor o vendedor</th>
              <th className="px-4 py-2 bg-secundary text-white">Telefono Emisor</th>
              <th className="px-4 py-2 bg-secundary text-white">Nombre adquiriente o comprador</th>
              <th className="px-4 py-2 bg-secundary text-white">NIT adquiriente o comprador</th>
              <th className="px-4 py-2 bg-secundary text-white">Departamento adquiriente o comprador</th>
              <th className="px-4 py-2 bg-secundary text-white">Municipio adquiriente o comprador</th>
              <th className="px-4 py-2 bg-secundary text-white">Dirección adquiriente o comprador</th>
              <th className="px-4 py-2 bg-secundary text-white">Correo adquiriente o comprador</th>
              <th className="px-4 py-2 bg-secundary text-white">Telefono adquiriente</th>
              <th className="px-4 py-2 bg-secundary text-white">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {searchQuery ===""
            ?facturas.map((factura, index) => (
              <tr key={factura.id} className="whitespace-nowrap">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4">{factura.fechaCreacion}</td>
                <td className="border px-4 py-2 text-center">{factura.codigoUnico}</td>
                <td className="border px-4 py-2 text-center">{factura.nombreComercialEmisor}</td>
                <td className="border px-4">{factura.nitEmisor}</td>
                <td className="border px-4 py-2 text-center">{factura.departamentoEmisor}</td>
                <td className="border px-4 py-2 text-center">{factura.municipioEmisor}</td>
                <td className="border px-4">{factura.direccionEmisor}</td>
                <td className="border px-4 py-2 text-center">{factura.correoEmisor}</td>
                <td className="border px-4 py-2 text-center">{factura.telefonoEmisor}</td>
                <td className="border px-4">{factura.nombreAdquiriente}</td>
                <td className="border px-4 py-2 text-center">{factura.numeroDocumentoAdquiriente}</td>
                <td className="border px-4 py-2 text-center">{factura.departamentoAdquiriente}</td>
                <td className="border px-4">{factura.municipioAdquiriente}</td>
                <td className="border px-4 py-2 text-center">{factura.direccionAdquiriente}</td>
                <td className="border px-4 py-2 text-center">{factura.correoAdquiriente}</td>
                <td className="border px-4 py-2 text-center">{factura.telefonoAdquiriente}</td>
                <td className="border px-4 py-2 text-center">${factura.subtotal}</td>
              </tr>
            ))
        :facturas.map((factura, index) => (
            <tr key={index} className="whitespace-nowrap">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4">{factura.fechaEmision}</td>
              <td className="border px-4 py-2 text-center">
                {factura.codigoUnico}
              </td>
              <td className="border px-4 py-2 text-center">
                <HighlightedText
                  text={factura.nombreComercialEmisor}
                  highlight={searchQuery}
                />
              </td>
              <td className="border px-4">
                <HighlightedText
                  text={factura.nitEmisor}
                  highlight={searchQuery}
                />
              </td>

              <td className="border px-4 py-2 text-center">
                {factura.departamentoEmisor}
              </td>
              <td className="border px-4 py-2 text-center">
                {factura.municipioEmisor}
              </td>
              <td className="border px-4">
                {factura.direccionEmisor}
              </td>
              <td className="border px-4 py-2 text-center">
                {factura.correoEmisor}
              </td>
              <td className="border px-4 py-2 text-center">
                {factura.telefonoEmisor}
              </td>
              
              <td className="border px-4">
                <HighlightedText
                  text={factura.nombreAdquiriente}
                  highlight={searchQuery}
                />
              </td>
              <td className="border px-4 py-2 text-center">
                <HighlightedText
                  text={factura.numeroDocumentoAdquiriente}
                  highlight={searchQuery}
                />
              </td>
              <td className="border px-4 py-2 text-center">
                {factura.departamentoAdquiriente}
              </td>
              <td className="border px-4">
                {factura.municipioAdquiriente}
              </td>
              <td className="border px-4 py-2 text-center">
                {factura.direccionAdquiriente}
              </td>
              <td className="border px-4 py-2 text-center">
                {factura.correoAdquiriente}
              </td>
              <td className="border px-4 py-2 text-center">
                {factura.telefonoAdquiriente}
              </td>
              
              <td className="border px-4 py-2 text-center">
                ${factura.subtotal}
              </td>
            </tr>
          ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white" colSpan="17">
                Total
              </th>
              <th className="border px-4 py-2">${totalSuma}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FacturaCompleta;
