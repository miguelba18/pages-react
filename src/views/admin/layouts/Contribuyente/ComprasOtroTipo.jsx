import useAuthToken from "../../../hook/Token/useAuthToken";
import { useState, useEffect, useCallback } from "react";
import useListContribuyentesCompras from "../../../hook/Contribuyente/useListContribuyentesCompras";
import useListSelectConsorcios from "../../../hook/Consorcios/useListSelectConsorcios";
import {
  RiDownloadLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { toast } from "react-toastify";
import Select from "react-select";

const ComprasOtroTipo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { compras, selectCompras } = useListSelectConsorcios();
  const [selectedNit, setSelectedNit] = useState(null);

  const itemsPerPage = 100;
  const { token } = useAuthToken();

  const { consorcios, listConsorcios } = useListContribuyentesCompras();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consorcios.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (selectedNit) {
      listConsorcios(selectedNit);
    }
  }, [selectedNit, listConsorcios]);
  useEffect(() => {
    selectCompras();
  }, [selectCompras]);

  const getNombresComercialesOptions = (compras) => {
    return compras.map((contribuyente) => ({
      value: contribuyente.nitContribuyente,
      label: contribuyente.nombreContribuyente,
    }));
  };
  const handleNombreChange = (selectedOption) => {
    setSelectedNit(selectedOption ? selectedOption.value : null);
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

  const downloadDisCom = useCallback(
    async (fechaEmision, nombreComercialEmisor, nitEmisor) => {
      try {
        const url = new URL(
          `http://localhost:8080/factura/descargar-excel-persona-desagrupar-Otrotipounocompra?fechaEmision=${fechaEmision}&nombreComercialEmisor=${encodeURIComponent(
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
          `http://localhost:8080/factura/descargar-excel-persona-desagrupar-Otrotipocompra?fechaEmision=${fechaEmision}&nombreComercialEmisor=${encodeURIComponent(
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

  return (
    <div>
      <div className="mt-4">
        <Select
          options={getNombresComercialesOptions(compras)}
          value={getNombresComercialesOptions(compras).find(
            (option) => option.value === selectedNit
          )}
          onChange={handleNombreChange}
          placeholder="Seleccione un Contribuyente"
          menuPlacement="auto"
          styles={customStyles}
          menuPosition="fixed"
        />
      </div>
      <div className="flex justify-end mt-4">
        {consorcios.length > 0 && (
          <div className="xl:relative mr-4">
            <button className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]">
              <span className="hidden md:inline">Descargar facturas</span>
              <RiDownloadLine className="mr-0 xl:mr-2" />
            </button>
          </div>
        )}
      </div>

      {selectedNit &&
        (consorcios.length > 0 ? (
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
                    </th>

                    <th className="px-4 py-2 bg-secundary text-white">
                      Nombre Contribuyente
                    </th>
                    <th className="px-4 py-2 bg-secundary text-white">
                      NIT Contribuyente
                    </th>

                    <th className="px-4 py-2 bg-secundary text-white">
                      Total Compras
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
                        key={index}
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
                          {consorcio.nombreAdquiriente}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {consorcio.numeroDocumentoAdquiriente}
                        </td>

                        <td className="border px-4 py-2 text-center">
                          {consorcio.sumaTotal}
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
                      <td
                        colSpan={20}
                        className="text-center py-4 text-red-500"
                      >
                        <p>Esta ciudad no tiene facturas.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-red-500">
            No hay resultados para el contribuyente seleccionado
          </div>
        ))}
    </div>
  );
};

export default ComprasOtroTipo;
