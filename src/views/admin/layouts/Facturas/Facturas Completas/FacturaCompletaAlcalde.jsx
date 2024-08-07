import { useState, useEffect } from "react";
import HighlightedText from "../../../../../utils/HighlightedText";
import { RiSearchLine, RiDownloadLine } from "react-icons/ri";
import useListAlcalde from "../../../../hook/Facturas/Factura Completa/alcalde/useListAlcalde";

const FacturaCompleta = () => {
  const { facturas, searchFacturas, totalSuma } = useListAlcalde();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnio, setSelectedAnio] = useState("");

  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    searchFacturas(searchQuery, anio);
  };

  useEffect(() => {
    searchFacturas(searchQuery, selectedAnio);
  }, [searchQuery, selectedAnio, searchFacturas]);

  return (
    <div>
      <div className="xl:flex justify-end">
        <div className="xl:relative mr-4 xl:mt-6">
          <button className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]">
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>

        <div className="relative xl:right-0 xl:mt-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchFacturas(e.target.value, selectedAnio); 
            }}
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
              <th className="px-4 py-2 bg-secundary text-white">
                Fecha
                <select
                  id="anio"
                  value={selectedAnio}
                  onChange={(e) => handleAnioChange(e.target.value)}
                  className="p-1 rounded border border-gray-300 text-black"
                >
                  <option value="">Todos</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">CUFE</th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre Comercial Emisor o vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                NIT Emisor o vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento Emisor o vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio Emisor o vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección Emisor o vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo Emisor o vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre adquiriente o comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                NIT adquiriente o comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento adquiriente o comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio adquiriente o comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección adquiriente o comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo adquiriente o comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono adquiriente
              </th>
              <th className="px-4 py-2 bg-secundary text-white">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {facturas.length === 0 && selectedAnio ? (
              <tr>
                <td colSpan="17" className="px-4 py-2 text-red-500 text-center">
                  Este año no tiene facturas disponibles
                </td>
              </tr>
            ) : (
              facturas.map((factura, index) => (
                <tr
                  key={factura.id}
                  className={index % 2 === 0 ? "bg-gray-100 whitespace-nowrap" : "bg-white whitespace-nowrap"}
                >
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">
                    {factura.fechaEmision}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.codigoUnico}
                  </td>
                  <td className="border px-4">
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
                  <td className="border px-4 py-2 text-center">
                    {factura.direccionEmisor}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.correoEmisor}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.telefonoEmisor}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.nombreAdquiriente}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.nitAdquiriente}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {factura.departamentoAdquiriente}
                  </td>
                  <td className="border px-4 py-2 text-center">
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
              ))
            )}
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
