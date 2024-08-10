import useListFacturasEmisor from "../../../../../hook/Facturas/Adquiriente y emisor/Emisor/Agrupadas/Alcalde/useListFacturasEmisor";
import { useEffect } from "react";
import {
  RiSearchLine,
  RiDownloadLine,
  RiCloseLine,
} from "react-icons/ri";
import { MdOutlineGroupOff } from "react-icons/md";
import useDescargarFacturas from "../../../../../hook/Facturas/Adquiriente y emisor/Emisor/Agrupadas/Alcalde/useDescargarFacturas";
import { useState } from "react";
import HighlightedText from "../../../../../../utils/HighlightedText";
import useAuthToken from "../../../../../hook/Token/useAuthToken";
import useDescargarFacturasDesagrupadas from "../../../../../hook/Facturas/Adquiriente y emisor/Emisor/Desagrupadas/Alcalde/useDescargarFacturasDesagrupadas";
const AgrupadasEmisorAlcalde = () => {
  const { facturas, totalSuma, fetchFacturas } = useListFacturasEmisor();
  const { handleDownloadExcelDesagrupadas } =
    useDescargarFacturasDesagrupadas();

  const { handleDownloadExcel } = useDescargarFacturas();
  const [searchQuery, setSearchQuery] = useState("");
  const [resetAnio, setResetAnio] = useState(false);
  const [setFacturasDisponibles] = useState(true);
  const [selectedAnio, setSelectedAnio] = useState("");
  const [facturasDesagrupadas, setFacturasDesagrupadas] = useState([]);
  const [totalSumaDesagrupadas, setTotalSumaDesagrupadas] = useState(0);
  const { token } = useAuthToken();

  useEffect(() => {
    fetchFacturas();
  }, [fetchFacturas]);

  const handleDownload = () => {
    handleDownloadExcel("", searchQuery, selectedAnio);
  };

  const handleSearchWithResetAnio = (query) => {
    setSelectedAnio("");
    handleSearch(query, "");
    setResetAnio(true);
  };
  useEffect(() => {
    if (resetAnio) {
      setResetAnio(false);
    }
  }, [resetAnio]);
  const handleSearch = (query, anio) => {
    setSearchQuery(query);
    fetchFacturas("", query, anio);
  };
  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    setSearchQuery("");
    fetchFacturas("", "", anio)
      .then((facturas) => {
        setFacturasDisponibles(facturas.length > 0);
      })
      .catch(() => {
        setFacturasDisponibles(false);
      });
  };
  const handleClose = () => {
    setFacturasDesagrupadas([]);
  };

  const handleDesagrupar = async (factura) => {
    try {
      const url = new URL("http://localhost:8080/factura/emisor-desagrupar");
      const params = new URLSearchParams();

      if (factura.nitEmisor) {
        params.append("filtro", factura.nitEmisor);
      }
      if (factura.fechaEmision) {
        params.append("anio", factura.fechaEmision);
      }

      url.search = params.toString();

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al desagrupar la factura");
      }

      const data = await response.json();

      setFacturasDesagrupadas(data.facturas);
      setTotalSumaDesagrupadas(data.totalSuma);
    } catch (error) {
      console.error("Error en handleDesagrupar:", error);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="grid justify-end">
          <div className="flex justify-around">
            <div className="xl:relative  mr-4">
              <button
                onClick={handleDownload}
                className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
              >
                <span className="">Descargar facturas</span>
                <RiDownloadLine className="mr-0 xl:mr-2" />
              </button>
            </div>

            <div className="relative xl:right-0 ">
              <input
                type="number"
                value={searchQuery}
                onChange={(e) => handleSearchWithResetAnio(e.target.value)}
                className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
                placeholder="Search"
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
                <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-secundary font-semibold " />
              </div>
            </div>
          </div>
        </div>
        <table className="table-auto w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white">#</th>
              <th className="px-4 py-2 bg-secundary text-white">
                Fecha <br />
                <select
                  onChange={(e) => handleAnioChange(e.target.value)}
                  value={selectedAnio}
                  className="text-black"
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
                Nombre o Razón Social del Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Número Documento del Emisor
              </th>

              <th className="px-4 py-2 bg-secundary text-white">Subtotal</th>
              <th className="px-4 py-2 bg-secundary text-white">Desagrupar</th>
            </tr>
          </thead>
          <tbody>
            {facturas.length > 0 ? (
              facturas.map((factura, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 whitespace-nowrap"
                      : "bg-white whitespace-nowrap"
                  }
                >
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 text-center">
                    {factura.fechaEmision}
                  </td>

                  <td className="border px-4 text-center">
                    {factura.nombreComercialEmisor}
                  </td>
                  <td className="border px-4 text-center">
                    <HighlightedText
                      text={factura.nitEmisor}
                      highlight={searchQuery}
                    />
                  </td>

                  <td className="border px-4">${factura.subtotal}</td>
                  <td className="border px-4 py-2 text-center">
                    <div className="grid justify-center">
                    <button
                      onClick={() => handleDesagrupar(factura)}
                      className="flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                    >
                      <MdOutlineGroupOff className="h-6 w-6" />
                    </button></div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-red-500">
                  {selectedAnio
                    ? "No hay facturas para el año seleccionado."
                    : "Esta ciudad no tiene facturas."}
                </td>
              </tr>
            )}
          </tbody>
          <tr>
            <th className="px-4 py-2 bg-secundary text-white" colSpan={4}>
              Total
            </th>
            <th className="border px-4 py-2">${totalSuma}</th>
            <th className="px-4 py-2 bg-secundary text-white"></th>
          </tr>
        </table>
      </div>
      {facturasDesagrupadas.length > 0 && (
        <>
          <div className="xl:relative flex justify-between mt-10">
            <div>
              <button className="flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-full shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]" onClick={handleClose}>
                <RiCloseLine className="h-6 w-6 " />
              </button>
            </div>
            <div className="flex">
              {facturasDesagrupadas.map((factura, index) => (
                <div key={index}>
                  {index === 0 && (
                    <button
                      onClick={() => handleDownloadExcelDesagrupadas(factura)}
                      className="flex justify-center mr-3 items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
                    >
                      <span className="">Descargar facturas</span>
                      <RiDownloadLine className="mr-0 xl:mr-2" />
                    </button>
                  )}
                </div>
              ))}

              <div className="mt-4 text-right font-bold">
                <p>Total facturas desagrupadas: ${totalSumaDesagrupadas}</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-secundary text-white">#</th>
                  <th className="px-4 py-2 bg-secundary text-white">Fecha</th>
                  <th className="px-4 py-2 bg-secundary text-white">Cufe</th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Numero de factura
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Forma de pago
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Pais Emisor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Departamento Emisor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Municipio Emisor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Direccion Emisor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Correo Emisor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Telefono Emisor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Tipo Contribuyente Emisor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Nombre Comercial Emisor o vendedor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    NIT Emisor
                  </th>

                  <th className="px-4 py-2 bg-secundary text-white">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {facturasDesagrupadas.map((factura, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-gray-100 whitespace-nowrap"
                        : "bg-white whitespace-nowrap"
                    }
                  >
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.fechaEmision}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.codigoUnico}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.numeroFactura}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.formaPago}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.paisEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.departamentoEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.municipioEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.direccionEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.correoEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.telefonoEmisor}
                    </td>

                    <td className="border px-4 text-center">
                      {factura.nombreComercialEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.nitEmisor}
                    </td>
                    <td className="border px-4 text-center">
                      {factura.tipoContribuyenteEmisor}
                    </td>

                    <td className="border px-4">${factura.subtotal}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th
                    className="px-4 py-2 bg-secundary text-white"
                    colSpan={14}
                  >
                    Total
                  </th>
                  <th className="border px-4 py-2">${totalSumaDesagrupadas}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AgrupadasEmisorAlcalde;
