import React, { useState, useEffect, useCallback } from "react";
import useSelectCityDepaUtils from "../../../../../utils/useSelectCityDepaUtils";
import {
  RiDownloadLine,
  RiSearchLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { MdOutlineGroup } from "react-icons/md";
import useDescargarFacturas from "../../../../hook/Facturas/Adquiriente y emisor/adquiriente/Agrupadas/useDescargarFacturas";
import useListFacturas from "../../../../hook/Facturas/Adquiriente y emisor/adquiriente/Agrupadas/useListFacturas";
import useAuthToken from "../../../../hook/Token/useAuthToken";
import { toast } from "react-toastify";
import HighlightedText from "../../../../../utils/HighlightedText";
import useListSelectsEmisor from "../../../../hook/Facturas/Adquiriente y emisor/adquiriente/Agrupadas/useListSelectsEmisor";
import Select from "react-select";

const AgrupadasAdquiriente = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const { token } = useAuthToken();
  const [formData, setFormData] = useState({});
  const { facturas, fetchFacturas, totalSuma, setFacturas } = useListFacturas();
  const [setFacturasDisponibles] = useState(true);
  const { handleDownloadExcel } = useDescargarFacturas();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnio, setSelectedAnio] = useState("");
  const [resetAnio, setResetAnio] = useState(false);
  const { emisores, nitEmisores } = useListSelectsEmisor();
  const [selectedNombresComerciales, setSelectedNombresComerciales] = useState(
    []
  );
  const [selectedNitsEmisores, setSelectedNitsEmisores] = useState([]);
  const {
    departamentos,
    filteredCiudades,
    selectedDepartamento,
    selectedCiudad,
    handleDepartamentoChange,
    handleCiudadChange,
  } = useSelectCityDepaUtils();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facturas.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleDownload = () => {
    handleDownloadExcel(selectedCiudad, searchQuery, selectedAnio);
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
  const handleDesagrupar = async (facturas, tipo = "adquirientes") => {
    try {
      const tipoString = typeof tipo === "string" ? tipo : "adquirientes";
      const url = new URL("http://localhost:8080/factura/persona-desagrupar");
      const params = new URLSearchParams();

      if (selectedCiudad) {
        params.append("ciudad", selectedCiudad);
      }

      facturas.forEach((factura) => {
        if (factura.numeroDocumentoAdquiriente) {
          params.append("filtros", factura.numeroDocumentoAdquiriente);
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
      return data.facturas;
    } catch (error) {
      console.error("Error en handleDesagrupar:", error);
    }
  };

  const handleDownloadExcelDesagrupadas = useCallback(
    async (selectedFacturas, tipo = "adquirientes") => {
      const tipoString = typeof tipo === "string" ? tipo : "adquirientes";

      try {
        const url = new URL(
          "http://localhost:8080/factura/descargar-excel-persona-desagrupar"
        );
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

        const contentDisposition = response.headers.get("Content-Disposition");
        let fileName = "archivo.xlsx";

        if (contentDisposition) {
          const matches = /filename="?([^"]+)"?/.exec(contentDisposition);
          if (matches && matches[1]) {
            fileName = matches[1];
          }
        }

        const blob = await response.blob();
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
          toast.success("El excel se ha descargado correctamente.");
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
        }
      } catch (error) {
        console.error("Error al descargar el archivo Excel:", error);
      }
    },
    [token, selectedCiudad]
  );

  const handleDesagruparYDescargar = async (factura, tipo = "adquirientes") => {
    try {
      const desagrupadas = await handleDesagrupar([factura], tipo);

      if (desagrupadas && desagrupadas.length > 0) {
        const facturasASeleccionar = desagrupadas.map((factura) => factura.id);

        await handleDownloadExcelDesagrupadas(facturasASeleccionar, tipo);
      } else {
        console.error("No hay facturas desagrupadas para descargar.");
        toast.error("No hay facturas disponibles para descargar.");
      }
    } catch (error) {
      console.error("Error al desagrupar y descargar:", error);
      toast.error("Hubo un problema al desagrupar o descargar las facturas.");
    }
  };

  const toggleDespliegue = async (factura) => {
    try {
      await handleDesagruparYDescargar(factura);
    } catch (error) {
      console.error("Error al desagrupar o descargar:", error);
      toast.error("Hubo un problema al desagrupar o descargar las facturas.");
    }
  };

  const handleDownloadExcelDesagrupadasRojo = useCallback(
    async (selectedFacturas, tipo = "adquirientes") => {
      const tipoString = typeof tipo === "string" ? tipo : "adquirientes";

      try {
        const url = new URL(
          "http://localhost:8080/factura/descargar-excel-persona-desagrupar-rojo"
        );
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

        const contentDisposition = response.headers.get("Content-Disposition");
        let fileName = "archivo.xlsx";

        if (contentDisposition) {
          const matches = /filename="?([^"]+)"?/.exec(contentDisposition);
          if (matches && matches[1]) {
            fileName = matches[1];
          }
        }

        const blob = await response.blob();
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
          toast.success("El excel se ha descargado correctamente.");
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
        }
      } catch (error) {
        console.error("Error al descargar el archivo Excel:", error);
      }
    },
    [token, selectedCiudad]
  );

  const handleDesagruparYDescargarRojo = async (factura) => {
    try {
      const facturasDesagrupadas = await handleDesagrupar([factura]);

      if (facturasDesagrupadas && facturasDesagrupadas.length > 0) {
        const facturasASeleccionar = facturasDesagrupadas.map(
          (factura) => factura.id
        );

        await handleDownloadExcelDesagrupadasRojo(facturasASeleccionar);
      } else {
        throw new Error("No se encontraron facturas desagrupadas.");
      }
    } catch (error) {
      console.error("Error en handleDesagruparYDescargarRojo:", error);
      toast.error("Hubo un problema al desagrupar o descargar las facturas.");
    }
  };

  const toggleDespliegueRojo = async (factura) => {
    try {
      await handleDesagruparYDescargarRojo(factura);
    } catch (error) {
      console.error("Error al desagrupar o descargar:", error);
      toast.error("Hubo un problema al desagrupar o descargar las facturas.");
    }
  };
  const resetAllSelectsExcept = (excludedSetter) => {
    const allSetters = [setSelectedNombresComerciales, setSelectedNitsEmisores];

    allSetters.forEach((setter) => {
      if (setter !== excludedSetter) {
        setter([]);
      }
    });
  };
  const opcionesEmisores = emisores.map((emisor) => ({
    value: emisor,
    label: emisor,
  }));
  const opcionesNitEmisores = nitEmisores.map((nitEmisor) => ({
    value: nitEmisor,
    label: nitEmisor,
  }));
  const handleSelectNombresComerciales = (selectedOptions) => {
    resetAllSelectsExcept(setSelectedNombresComerciales); 
  
    const selectedValues = Array.isArray(selectedOptions)
      ? selectedOptions.map((option) => option.value)
      : selectedOptions
      ? [selectedOptions.value]
      : [];
    
    setSelectedNombresComerciales(selectedValues);  
  
    const filtro = selectedValues.join(',');
  
    fetchFacturas(
      selectedCiudad,  
      filtro,          
      selectedAnio,    
      "adquirientes",      
      []  
    );
  };

  const handleSelectNitsEmisores = (selectedOptions) => {
    resetAllSelectsExcept(setSelectedNitsEmisores); 
  
    const selectedValues = Array.isArray(selectedOptions)
      ? selectedOptions.map((option) => option.value)
      : selectedOptions
      ? [selectedOptions.value]
      : [];
    
    setSelectedNitsEmisores(selectedValues);  
  
    const filtro = selectedValues.join(',');
  
    fetchFacturas(
      selectedCiudad,  
      filtro,            
      selectedAnio,    
      "adquirientes",      
      []  
    );
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: "38px",
      fontSize: "14px",
      minWidth: "200px",
      width: "100%",
      boxSizing: "border-box",
      border: "1px solid #ccc",
      borderRadius: "4px",
      "&:hover": {
        borderColor: "#888",
      },
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused ? "#f0f0f0" : isSelected ? "#eaeaea" : null,
      color: "#333",
      fontWeight: isSelected ? "bold" : "normal",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e0e0e0",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#000",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ff0000",
      ":hover": {
        backgroundColor: "#f00",
        color: "#fff",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999",
    }),
  };

  return (
    <div>
      <h1 className="font-bold text-3xl text-secundary mb-6 text-center xl:text-start">
        Facturas Comprador Municipio
      </h1>
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
            <span className="">Descargar Consolidados</span>
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

      {facturas.length === 0 && selectedCiudad && (
        <p className="text-red-500">
          No hay facturas disponibles para la ciudad seleccionada.
        </p>
      )}

      {facturas.length > 0 && (
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
          <div className="overflow-x-auto">
            <table className="table-auto w-full mt-6">
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
                    Nombre o Razón Social del Vendedor
                    <Select
                      options={opcionesEmisores}
                      placeholder="Selecciona un emisor"
                      styles={customStyles}
                      value={selectedNombresComerciales.map((value) => ({ value, label: value }))}

                      onChange={handleSelectNombresComerciales}
                      isMulti
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Nit del Vendedor
                    <Select
                      options={opcionesNitEmisores}
                      placeholder="Selecciona un emisor"
                      styles={customStyles}
                      value={selectedNitsEmisores.map((value) => ({ value, label: value }))}

                      onChange={handleSelectNitsEmisores}
                      isMulti
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>

                  <th className="px-4 py-2 bg-secundary text-white">
                    Total acumulado cliente municipio
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Discriminado cliente por municipio
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Discriminado cliente por factura municipio
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

                          <td className="border px-4 text-center">
                            ${factura.subtotal}
                          </td>

                          <td className="border px-4 py-2 text-center">
                            <div className="grid justify-center">
                              <div>
                                <button
                                  onClick={() => toggleDespliegue(factura)}
                                  className="flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#61e44a] via-[#04f518] to-[#0be816] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                                >
                                  <RiDownloadLine className="h-6 w-6" />
                                </button>
                              </div>
                            </div>
                          </td>

                          <td className="border px-4 py-2 text-center">
                            <div className="grid justify-center">
                              <div>
                                <button
                                  onClick={() => toggleDespliegueRojo(factura)}
                                  className="flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185] "
                                >
                                  <MdOutlineGroup className="h-6 w-6" />
                                </button>
                              </div>
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
          </div>
        </>
      )}
    </div>
  );
};

export default AgrupadasAdquiriente;
