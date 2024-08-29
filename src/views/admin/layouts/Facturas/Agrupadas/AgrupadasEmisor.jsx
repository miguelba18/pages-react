import React, { useState, useEffect } from "react";
import useSelectCityDepaUtils from "../../../../../utils/useSelectCityDepaUtils";
import useAuthToken from "../../../../hook/Token/useAuthToken";
import {
  RiDownloadLine,
  RiSearchLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import useDescargarFacturas from "../../../../hook/Facturas/Adquiriente y emisor/Emisor/Agrupadas/useDescargarFacturas";
import HighlightedText from "../../../../../utils/HighlightedText";
import { toast } from "react-toastify";
import { MdOutlineGroupOff, MdOutlineGroup } from "react-icons/md";
import useListFacturas from "../../../../hook/Facturas/Adquiriente y emisor/Emisor/Agrupadas/useListFacturas";

const AgrupadasEmisor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [formData, setFormData] = useState({});
  const { facturas, fetchFacturas, totalSuma, setFacturas } = useListFacturas();
  const [setFacturasDisponibles] = useState(true);
  const [selectedAnio, setSelectedAnio] = useState("");
  const { handleDownloadExcel } = useDescargarFacturas();
  const { token } = useAuthToken();
  const [isDesagrupado, setIsDesagrupado] = useState(false);
  const [totalSumaDesagrupadas, setTotalSumaDesagrupadas] = useState(0);
  const [resetAnio, setResetAnio] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [facturasDesplegadas, setFacturasDesplegadas] = useState({});
  const [facturasDesagrupadas, setFacturasDesagrupadas] = useState([]);

  const {
    departamentos,
    filteredCiudades,
    selectedDepartamento,
    selectedCiudad,
    handleDepartamentoChange,
    handleCiudadChange,
  } = useSelectCityDepaUtils();

  useEffect(() => {
    if (selectedCiudad) {
      fetchFacturas(selectedCiudad);
    } else {
      setFacturas([]);
    }
  }, [fetchFacturas, selectedCiudad, setFacturas]);

  useEffect(() => {
    setFacturas([]);
  }, [selectedDepartamento, setFacturas]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facturas.slice(indexOfFirstItem, indexOfLastItem);

  const handleDownload = () => {
    if (selectedCiudad || searchQuery || selectedAnio) {
      handleDownloadExcel({
        ciudad: selectedCiudad || undefined,
        filtro: searchQuery || undefined,
        anio: selectedAnio || undefined,
      });
    } else {
      toast.error("Por favor selecciona una ciudad o introduce un filtro.");
    }
  };

  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    fetchFacturas(selectedCiudad, "", anio)
      .then((facturas) => {
        setFacturasDisponibles(facturas.length > 0);
      })
      .catch(() => {
        setFacturasDisponibles(false);
      });
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
    setSearchQuery("");
    setSearchQuery(query);
    fetchFacturas(selectedCiudad, query, anio);
  };

  const handleDesagrupar = async (facturas, tipo = "emisores") => {
    const tipoString = typeof tipo === "string" ? tipo : "emisores";

    try {
      const url = new URL("http://localhost:8080/factura/persona-desagrupar");
      const params = new URLSearchParams();

      if (selectedCiudad) {
        params.append("ciudad", selectedCiudad);
      }

      facturas.forEach((factura) => {
        if (factura.nitEmisor) {
          params.append("filtros", factura.nitEmisor);
        }
        if (factura.fechaEmision) {
          params.append("anios", factura.fechaEmision);
        }
      });
      if (tipo) {
        params.append("tipo", tipoString);
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
        throw new Error("Error al desagrupar las facturas");
      }

      const data = await response.json();
      setFacturasDesagrupadas(data.facturas);
      setTotalSumaDesagrupadas(data.subtotalSuma);
      setIsDesagrupado(true);
    } catch (error) {
      console.error("Error en handleDesagrupar:", error);
    }
  };

  const handleDownloadExcelDesagrupadas = async (
    factura,
    tipo = "emisores"
  ) => {
    const tipoString = typeof tipo === "string" ? tipo : "emisores";

    try {
      const url = new URL(
        "http://localhost:8080/factura/descargar-excel-persona-desagrupar"
      );
      const params = new URLSearchParams();

      if (selectedCiudad) {
        params.append("ciudad", selectedCiudad);
      }
      const desagrupadoFacturas = facturasDesagrupadas;

      desagrupadoFacturas.forEach((facturaItem) => {
        if (facturaItem.nitEmisor) {
          params.append("filtros", facturaItem.nitEmisor);
        }

        if (facturaItem.fechaEmision) {
          params.append("anios", facturaItem.fechaEmision);
        }
      });

      if (tipo) {
        params.append("tipo", tipoString);
      }

      url.search = params.toString();
      console.log("Desagrupar URL:", url.toString());
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          errorMessage || "No se pudo descargar el archivo Excel."
        );
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      const fileNameMatch =
        contentDisposition && contentDisposition.match(/filename="?([^"]+)"?/);
      const fileName = fileNameMatch
        ? fileNameMatch[1]
        : "datos_factura_emisor_desagrupar.xlsx";

      if (window.showSaveFilePicker) {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "Excel files",
              accept: {
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                  [".xlsx"],
              },
            },
          ],
        });
        const writableStream = await handle.createWritable();
        await writableStream.write(blob);
        await writableStream.close();
        toast.success("El excel se ha descargado correctamente  .");
      } else {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success("El excel se ha descargado correctamente .");
      }
    } catch (error) {
      console.error("Error al descargar el archivo Excel:", error);
      toast.error("Hubo un problema al descargar el archivo Excel.");
    }
  };

  const toggleDespliegue = (factura) => {
    setFacturasDesplegadas((prev) => {
      const claveFactura = `${factura.nitEmisor}-${factura.fechaEmision}`;

      const newState = {
        ...prev,
        [claveFactura]: !prev[claveFactura],
      };

      const facturasADesagrupar = Object.keys(newState)
        .filter((key) => newState[key])
        .map((key) => {
          const [nitEmisor, fechaEmision] = key.split("-");
          return facturas.find(
            (f) => f.nitEmisor === nitEmisor && f.fechaEmision === fechaEmision
          );
        })
        .filter((f) => f);

      if (facturasADesagrupar.length > 0) {
        handleDesagrupar(facturasADesagrupar);
      }

      setIsDesagrupado(facturasADesagrupar.length > 0);

      return newState;
    });
  };

  return (
    <div>
      <div className="xl:flex justify-around">
        <div>
          <select
            value={selectedDepartamento}
            onChange={(e) => {
              handleDepartamentoChange(e);
              setFormData({
                ...formData,
                departamentoId: e.target.value,
              });
            }}
            className="mb-4 rounded-xl  text-secundary shadow-md shadow-blue-500 px-2  py-3 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
          >
            <option value="">Selecciona un departamento</option>
            {departamentos.map((departamento) => (
              <option key={departamento.id} value={departamento.id}>
                {departamento.departamento}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={selectedCiudad}
            onChange={(e) => {
              handleCiudadChange(e);
              setFormData({
                ...formData,
                ciudadId: e.target.value,
              });
            }}
            disabled={!selectedDepartamento}
            className=" mb-4 px-2 rounded-xl shadow-md shadow-blue-500 text-secundary py-3 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
          >
            <option value="">Selecciona una ciudad</option>
            {filteredCiudades.map((ciudad) => (
              <option key={ciudad.id} value={ciudad.id}>
                {ciudad.ciudad}
              </option>
            ))}
          </select>
        </div>
        <div className="xl:relative mr-2 ">
          {!isDesagrupado ? (
            <button
              onClick={handleDownload}
              disabled={!selectedCiudad}
              className="flex justify-center items-center gap-2 xl:gap-2 px-3 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
            >
              <span className="">Descargar facturas</span>
              <RiDownloadLine className="mr-0 xl:mr-2" />
            </button>
          ) : (
            <>
              {facturasDesagrupadas.map((facturas, index) => (
                <div key={index}>
                  {index === 0 && (
                    <button
                      onClick={() => handleDownloadExcelDesagrupadas(facturas)}
                      className="flex justify-center items-center gap-2 xl:gap-2 px-3 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
                    >
                      <span className="">Descargar facturas</span>
                      <RiDownloadLine className="mr-0 xl:mr-2" />
                    </button>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="relative xl:right-0 xl:mt-0">
          <input
            disabled={!selectedCiudad}
            type="number"
            value={searchQuery}
            onChange={(e) => handleSearchWithResetAnio(e.target.value)}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1 xl:mb-3 mb-1 rounded-md shadow-2xl text-secundary font-semibold " />
          </div>
        </div>
      </div>

      {selectedCiudad && (
        <>
          <div className="flex  justify-between">
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="  p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                
                <RiArrowLeftSLine />
              </button>
              <span className="mt-2 mx-2">{`Página ${currentPage} de ${Math.ceil(
                facturas.length / itemsPerPage
              )}`}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(facturas.length / itemsPerPage)
                }
                className="p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowRightSLine />
              </button>
            </div>
            <div className="mt-4 text-right font-bold">
              {!isDesagrupado ? (
                <p>Total facturas: ${totalSuma}</p>
              ) : (
                <p>Total facturas Desagrupadas: ${totalSumaDesagrupadas}</p>
              )}
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-secundary text-white">#</th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Fecha <br />
                    <select
                      onChange={(e) => handleAnioChange(e.target.value)}
                      value={selectedAnio}
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
                    Nombre Comercial Emisor o vendedor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    NIT Emisor o vendedor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Subtotal
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Desagrupar
                  </th>
                </tr>
              </thead>
              <tbody>
                {facturas.length > 0 ? (
                  currentItems.map((factura, index) => {
                    const claveFactura = `${factura.nitEmisor}-${factura.fechaEmision}`;

                    return (
                      <React.Fragment key={factura.id}>
                        <tr className="bg-gray-100 whitespace-nowrap">
                          <td className="border px-4 py-2 text-center">
                            {indexOfFirstItem+index + 1}
                          </td>
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
                                onClick={() => toggleDespliegue(factura)}
                                className="flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                              >
                                {facturasDesplegadas[claveFactura] ? (
                                  <MdOutlineGroup className="h-6 w-6" />
                                ) : (
                                  <MdOutlineGroupOff className="h-6 w-6" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>

                        {facturasDesplegadas[claveFactura] && (
                          <tr>
                            <td colSpan="6" className="p-0">
                              <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                  <thead>
                                    <tr>
                                      <th className="px-4 py-2 bg-secundary text-white">
                                        #
                                      </th>
                                      <th className="px-4 py-2 bg-secundary text-white">
                                        Fecha
                                      </th>
                                      <th className="px-4 py-2 bg-secundary text-white">
                                        Cufe
                                      </th>
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
                                    {facturasDesagrupadas
                                      .filter(
                                        (f) =>
                                          `${f.nitEmisor}-${f.fechaEmision}` ===
                                          claveFactura
                                      )
                                      .map((factura, idx) => (
                                        <tr
                                          key={idx}
                                          className="bg-white whitespace-nowrap"
                                        >
                                          <td className="border px-4 py-2 text-center">
                                            {idx + 1}
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
                                          <td className="border px-4">
                                            ${factura.subtotal}
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
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
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AgrupadasEmisor;
