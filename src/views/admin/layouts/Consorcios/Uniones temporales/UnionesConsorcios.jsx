  import { useState, useEffect, useCallback } from "react";
  import Select from "react-select";
  import useListUnionesConsorcios from "../../../../hook/Consorcios/useListUnionesConsorcios";
  import {
    RiSearchLine,
    RiDownloadLine,
    RiArrowLeftSLine,
    RiArrowRightSLine,
  } from "react-icons/ri";
  import useAuthToken from "../../../../hook/Token/useAuthToken";
  import HighlightedText from "../../../../../utils/HighlightedText";
  import { toast } from "react-toastify";
  const UnionesConsorcios = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;
    const [resetAnio, setResetAnio] = useState(false);
    const [facturasDisponibles, setFacturasDisponibles] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const { token } = useAuthToken();
    const [selectedAnio, setSelectedAnio] = useState("");

    const { consorcios, listConsorcios } = useListUnionesConsorcios();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = consorcios.slice(indexOfFirstItem, indexOfLastItem);
    const handleAnioChange = (anio) => {
      setSelectedAnio(anio);
      listConsorcios("", anio)
        .then((facturas) => {
          setFacturasDisponibles(facturas.length > 0);
        })
        .catch(() => {
          setFacturasDisponibles(false);
        });
    };
    useEffect(() => {
      listConsorcios(searchQuery, selectedAnio);
    }, [listConsorcios,searchQuery,selectedAnio]);

    const handleSearch = (query) => {
      setSearchQuery(query);
      listConsorcios(query, selectedAnio);
    };
  
    const handleSearchWithResetAnio = (query) => {
      setSelectedAnio("");
      setResetAnio(true);
      handleSearch(query);
    };
  
    useEffect(() => {
      if (resetAnio) {
        setResetAnio(false);
      }
    }, [resetAnio]);

  const downloadDisVen = useCallback(
    async (fechaEmision, nombreComercialEmisor, nitEmisor) => {
      try {
        const url = new URL(
          `http://localhost:8080/factura/descargar-excel-persona-desagrupar-consorcio?fechaEmision=${fechaEmision}&nombreComercialEmisor=${encodeURIComponent(
            nombreComercialEmisor
          )}&nitEmisor=${nitEmisor}`
        );

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
    [token]
  );
  const downloadDisFacVen = useCallback(
    async (fechaEmision, nombreComercialEmisor, nitEmisor) => {
      try {
        const url = new URL(
          `http://localhost:8080/factura/descargar-excel-persona-desagrupar-consorciouno?fechaEmision=${fechaEmision}&nombreComercialEmisor=${encodeURIComponent(
            nombreComercialEmisor
          )}&nitEmisor=${nitEmisor}`
        );

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
    [token]
  );
  const downloadDisCom = useCallback(
    async (fechaEmision, nombreComercialEmisor, nitEmisor) => {
      try {
        const url = new URL(
          `http://localhost:8080/factura/descargar-excel-persona-desagrupar-consorciounocompra?fechaEmision=${fechaEmision}&nombreComercialEmisor=${encodeURIComponent(
            nombreComercialEmisor
          )}&nitEmisor=${nitEmisor}`
        );

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
    [token]
  );
  const downloadDisFacCom = useCallback(
    async (fechaEmision, nombreComercialEmisor, nitEmisor) => {
      try {
        const url = new URL(
          `http://localhost:8080/factura/descargar-excel-persona-desagrupar-consorciocompra?fechaEmision=${fechaEmision}&nombreComercialEmisor=${encodeURIComponent(
            nombreComercialEmisor
          )}&nitEmisor=${nitEmisor}`
        );

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
    [token]
  );
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
      <h1 className="font-bold text-3xl text-secundary">
        Consorcios y Uniones Temporales
      </h1>

      <div className="flex justify-end">
        {consorcios.length > 0 && (
          <div className="xl:relative mr-4">
            <button className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]">
              <span className="hidden md:inline">Descargar facturas</span>
              <RiDownloadLine className="mr-0 xl:mr-2" />
            </button>
          </div>
        )}
        <div className="relative ">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchWithResetAnio(e.target.value)}
            className="rounded-[10px] shadow-xl  w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-secundary font-semibold " />
          </div>
        </div>
      </div>

      {consorcios.length > 0 && (
        <>
          <div className="flex  justify-between">
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="  p-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowLeftSLine />
              </button>
              <span className="mt-2 mx-2 text-sm">{`Página ${currentPage} de ${Math.ceil(
                consorcios.length / itemsPerPage
              )}`}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(consorcios.length / itemsPerPage)
                }
                className="p-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowRightSLine />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full mt-2">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-secundary text-white">#</th>

                  <th className="px-4 py-2 bg-secundary text-white">
                    Fecha Emision
                    <br />
                    <select
                      onChange={(e) =>
                        handleAnioChange(e.target.value, facturasDisponibles)
                      }
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
                    Nombre Contribuyente
                    <Select
                      
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    NIT Contribuyente
                    <Select
                      
                      placeholder="Selecciona nombre comercial"
                      isMulti
                      styles={customStyles}
                      
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </th>

                  <th className="px-4 py-2 bg-secundary text-white">
                    Total Ventas
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Total Compras
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Discriminado Por Ventas
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Discriminado Factura por Ventas
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Discriminado por Compras
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Discriminado Factura por Compras
                  </th>
                </tr>
              </thead>
              <tbody>
                {consorcios.length > 0 ? (
                  currentItems.map((consorcio, index) => (
                    <tr
                      key={consorcio.id}
                      className={
                        index % 2 === 0
                          ? "bg-gray-100 whitespace-nowrap"
                          : "bg-white whitespace-nowrap"
                      }
                    >
                      <td className="border px-4 py-2 text-center">
                        {indexOfFirstItem + index + 1}
                      </td>

                      <td className="border px-4 py-2 text-center">
                        {consorcio.fechaEmision}
                      </td>

                      <td className="border px-4 py-2 text-center">
                        {consorcio.nombreComercialEmisor}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <HighlightedText
                          text={consorcio.nitEmisor}
                          highlight={searchQuery}
                        />
                      </td>

                      <td className="border px-4 py-2 text-center">
                        ${consorcio.subtotalAdquiriente}
                      </td>

                      <td className="border px-4 py-2 text-center">
                        ${consorcio.subtotalEmisor}
                      </td>

                      <td className="border px-4 py-2 text-center">
                        <div className="grid justify-center">
                          <button
                            onClick={() =>
                              downloadDisVen(
                                consorcio.fechaEmision,
                                consorcio.nombreComercialEmisor,
                                consorcio.nitEmisor
                              )
                            }
                            className="flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#61e44a] via-[#04f518] to-[#0be816] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                          >
                            <RiDownloadLine className="h-6 w-6" />
                          </button>
                        </div>
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div className="grid justify-center">
                          <button
                            onClick={() =>
                              downloadDisFacVen(
                                consorcio.fechaEmision,
                                consorcio.nombreComercialEmisor,
                                consorcio.nitEmisor
                              )
                            }
                            className="flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#61e44a] via-[#04f518] to-[#0be816] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                          >
                            <RiDownloadLine className="h-6 w-6" />
                          </button>
                        </div>
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div className="grid justify-center">
                          <button
                            onClick={() =>
                              downloadDisCom(
                                consorcio.fechaEmision,
                                consorcio.nombreComercialEmisor,
                                consorcio.nitEmisor
                              )
                            }
                            className="flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#61e44a] via-[#04f518] to-[#0be816] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                          >
                            <RiDownloadLine className="h-6 w-6" />
                          </button>
                        </div>
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div className="grid justify-center">
                          <button
                            onClick={() =>
                              downloadDisFacCom(
                                consorcio.fechaEmision,
                                consorcio.nombreComercialEmisor,
                                consorcio.nitEmisor
                              )
                            }
                            className="flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#61e44a] via-[#04f518] to-[#0be816] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                          >
                            <RiDownloadLine className="h-6 w-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={20} className="text-center py-4 text-red-500">
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

export default UnionesConsorcios;
