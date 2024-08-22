import { useState, useEffect } from "react";
import useListConsorcios from "../../../../hook/Consorcios/useListConsorcios";
import { RiSearchLine, RiDownloadLine } from "react-icons/ri";
import useDescargarConsorcios from "../../../../hook/Consorcios/useDescargarConsorcios";
const Consorcios = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {handleDownloadExcel} = useDescargarConsorcios();
  const { consorcios, listConsorcios } = useListConsorcios();
  const [selectedAnio, setSelectedAnio] = useState("");
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const handleDownload = () => {
    handleDownloadExcel(searchQuery,selectedAnio);
  };
  useEffect(() => {
    listConsorcios(searchQuery, selectedAnio);
  }, [searchQuery, selectedAnio, listConsorcios]);
  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    listConsorcios(searchQuery, anio);
  };

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
      <div className="flex xl:justify-end items-center">
        <div className="xl:relative mr-4">
          <button
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>

        <div className="relative xl:right-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              listConsorcios(e.target.value, selectedAnio);
            }}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-secundary font-semibold " />
          </div>
        </div>
      </div>
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
                <br />
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
