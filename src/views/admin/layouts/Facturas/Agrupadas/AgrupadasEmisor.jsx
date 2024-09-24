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
import { MdOutlineGroup } from "react-icons/md";
import useListFacturas from "../../../../hook/Facturas/Adquiriente y emisor/Emisor/Agrupadas/useListFacturas";
import Modal from "../../../../modal/Modal";

const AgrupadasEmisor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [formData, setFormData] = useState({});
  const { facturas, fetchFacturas, totalSuma, setFacturas } = useListFacturas();
  const [setFacturasDisponibles] = useState(true);
  const [selectedAnio, setSelectedAnio] = useState("");
  const { handleDownloadExcel } = useDescargarFacturas();
  const { token } = useAuthToken();
  const [totalSumaDesagrupadas, setTotalSumaDesagrupadas] = useState(0);
  const [resetAnio, setResetAnio] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [facturasDesagrupadas, setFacturasDesagrupadas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [facturasSeleccionadas, setFacturasSeleccionadas] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const isDownloadButtonVisible = facturasSeleccionadas.length > 0;


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
    handleDownloadExcel(selectedCiudad, searchQuery, selectedAnio);
    
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
    } catch (error) {
      console.error("Error en handleDesagrupar:", error);
    }
  };

  const handleDownloadExcelDesagrupadas = async (selectedFacturas, tipo = "emisores") => {
    const tipoString = typeof tipo === "string" ? tipo : "emisores";

    try {
        const url = new URL("http://localhost:8080/factura/descargar-excel-persona-desagrupar");
        const params = new URLSearchParams();

        if (selectedCiudad) {
            params.append("ciudad", selectedCiudad);
        }
        selectedFacturas.forEach((id) => {
            params.append("id", id);
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
            throw new Error(errorMessage || "No se pudo descargar el archivo Excel.");
        }

        const contentDisposition = response.headers.get("content-disposition");
      let fileName = '2022_PERPOL_DISTRIBUCIONES_SAS_901346585.xlsx'; 

      console.log("Content-Disposition", contentDisposition);

      
      


 
        const blob = await response.blob();

     
        if (window.showSaveFilePicker) {
            const handle = await window.showSaveFilePicker({
                suggestedName: fileName,
                types: [
                    {
                        description: "Excel files",
                        accept: {
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                        },
                    },
                ],
            });
            const writableStream = await handle.createWritable();
            await writableStream.write(blob); 
            await writableStream.close();
            toast.success("El excel se ha descargado correctamente.");
            setFacturasSeleccionadas([]);
            setShowCheckboxes(false);
        } else {
            const urlBlob = window.URL.createObjectURL(blob); 
            const a = document.createElement("a");
            a.href = urlBlob;
            a.download = fileName; 
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(urlBlob); 
            toast.success("El excel se ha descargado correctamente.");
            setShowCheckboxes(false);
        }
    } catch (error) {
        console.error("Error al descargar el archivo Excel:", error);
        toast.error("Hubo un problema al descargar el archivo Excel.");
    }
};

  
  

  const toggleDespliegue = async (factura) => {
    await handleDesagrupar([factura]);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowCheckboxes(false);
    setFacturasSeleccionadas([]);
  };

  const handleCheckboxChange = (id) => {
    setFacturasSeleccionadas((prev) => {
      if (prev.includes(id)) {
        return prev.filter((facturaId) => facturaId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDownloadExcelDesagrupadasAfuera = async (
    filtros,
    tipo = "Emisores"
  ) => {
    const tipoString = typeof tipo === "string" ? tipo : "Emisores";

    try {
      const url = new URL(
        "http://localhost:8080/factura/descargar-excel-persona-desagrupar/"
      );
      const params = new URLSearchParams();

      if (selectedCiudad) {
        params.append("ciudad", selectedCiudad);
      }
      if (filtros.nitEmisor) {
        params.append("filtros", filtros.nitEmisor);
      }
      if (filtros.fechaEmision) {
        params.append("anios", filtros.fechaEmision);
      }

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
        : "datos_factura_emisores_desagrupar.xlsx";

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

  const handleDownloadExcelDesagrupadasOut = async (factura) => {
    const filtros = {
      nitEmisor: factura.nitEmisor,
      fechaEmision: factura.fechaEmision,
    };

    await handleDownloadExcelDesagrupadasAfuera(filtros);
  };

  const cancelSelector = () => {
    setFacturasSeleccionadas([]);
    setShowCheckboxes(false);
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
        <div hidden={!selectedCiudad} className="xl:relative mr-2 ">
          <button
            onClick={handleDownload}
            
            className="flex justify-center items-center gap-2 xl:gap-2 px-3 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>
        <div hidden={!selectedCiudad} className="relative xl:right-0 xl:mt-0">
          <input
         
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
              <p>Total facturas: ${totalSuma}</p>
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
                  Total acumulado cliente municipio
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                  Discriminado cliente por municipio
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                  Descargar Consolidado
                  </th>
                </tr>
              </thead>
              <tbody>
                {facturas.length > 0 ? (
                  currentItems.map((factura, index) => {
                    return (
                      <React.Fragment key={factura.id}>
                        <tr className="bg-gray-100 whitespace-nowrap">
                          <td className="border px-4 py-2 text-center">
                            {indexOfFirstItem + index + 1}
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
                                onClick={() =>
                                  handleDownloadExcelDesagrupadasOut(factura)
                                }
                                className="flex justify-center items-center gap-2 xl:gap-2 px-3 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
                              >
                                <RiDownloadLine className="" />
                              </button>
                            </div>
                          </td>
                          
                          <td className="border px-4 py-2 text-center">

                            <div className="grid justify-center">
                              <button
                                onClick={() => toggleDespliegue(factura)}
                                className="flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                              >
                                <MdOutlineGroup className="h-6 w-6" />
                              </button>
                            </div>
                          </td>
                        </tr>
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
            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              title="Facturas Desagrupadas"
              showConfirmButton={false}
            >
              {facturasDesagrupadas && (
                <>
                  <div className="flex justify-between py-4">
                    {isDownloadButtonVisible && (
                      <button
                        onClick={() =>
                          handleDownloadExcelDesagrupadas(facturasSeleccionadas)
                        }
                        className="flex justify-center items-center gap-2 xl:gap-2 px-3 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
                      >
                        Descargar facturas
                      </button>
                    )}
                    <div className="text-center font-bold">
                      <p>
                        Total facturas Desagrupadas:
                        <br /> ${totalSumaDesagrupadas}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    {!showCheckboxes ? (
                      <button
                        onClick={() => setShowCheckboxes(true)}
                        className="bg-secundary text-white px-4 py-2 rounded-xl shadow-md hover:bg-secundary-dark focus:outline-none focus:ring-2 focus:ring-secundary focus:ring-opacity-50"
                      >
                        Seleccionar Facturas
                      </button>
                    ) : (
                      <button
                        onClick={cancelSelector}
                        className="bg-secundary text-white px-4 py-2 rounded-xl shadow-md hover:bg-secundary-dark focus:outline-none focus:ring-2 focus:ring-secundary focus:ring-opacity-50"
                      >
                        Salir del seleccionar
                      </button>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                      <thead>
                        <tr>
                          {showCheckboxes && (
                            <th className="px-4 py-2 bg-secundary text-white">
                              Seleccionar
                            </th>
                          )}
                          
                          <th className="px-4 py-2 bg-secundary text-white">
                            Fecha
                          </th>
                         
                         
                          
                          

                          <th className="px-4 py-2 bg-secundary text-white">
                            Nombre o Razón Social del Comprador
                          </th>
                          <th className="px-4 py-2 bg-secundary text-white">
                            NIT Comprador
                          </th>
                          <th className="px-4 py-2 bg-secundary text-white">
                            Nombre o Razón Social del Vendedor
                          </th>
                          <th className="px-4 py-2 bg-secundary text-white">
                            NIT Vendedor
                          </th>

                          <th className="px-4 py-2 bg-secundary text-white">
                            Subtotal
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {facturasDesagrupadas.map((factura, idx) => (
                          <tr key={idx} className="bg-white whitespace-nowrap">
                            {showCheckboxes && (
                              <td className="border px-4 py-2 text-center">
                                <input
                                  className="h-6 w-6"
                                  type="checkbox"
                                  value={factura.id}
                                  checked={facturasSeleccionadas.includes(
                                    factura.id
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(factura.id)
                                  }
                                />
                              </td>
                            )}
                           
                            <td className="border px-4 text-center">
                              {factura.fechaEmision}
                            </td>
                            
                            
                            
                            <td className="border px-4 text-center">
                              {factura.nombreAdquiriente}
                            </td>
                            <td className="border px-4 text-center">
                              {factura.numeroDocumentoAdquiriente}
                            </td>
                            <td className="border px-4 text-center">
                              {factura.nombreComercialEmisor}
                            </td>
                            <td className="border px-4 text-center">
                              {factura.nitEmisor}
                            </td>

                            <td className="border px-4">${factura.subtotal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default AgrupadasEmisor;
