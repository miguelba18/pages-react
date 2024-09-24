import { useState, useEffect } from "react";
import HighlightedText from "../../../../../utils/HighlightedText";
import {
  RiSearchLine,
  RiDownloadLine,
  RiDeleteBin5Fill,
  RiAddCircleFill,
  RiCheckboxCircleFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import useListFacturaCompleta from "../../../../hook/Facturas/Factura Completa/admin/useListFacturaCompleta";
import useDescargarFacturas from "../../../../hook/Facturas/Factura Completa/admin/useDescargarFacturas";
import { toast } from "react-toastify";
import useDeleteFacturas from "../../../../hook/Facturas/Factura Completa/admin/useDeleteFacturas";
import Modal from "../../../../modal/Modal";
import useAddConsorcio from "../../../../hook/Facturas/Factura Completa/admin/useAddConsorcio";

const FacturaCompleta = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [formData, setFormData] = useState({});
  const [facturasDisponibles, setFacturasDisponibles] = useState(true);
  const { handleDownloadExcel } = useDescargarFacturas();
  const [resetAnio, setResetAnio] = useState(false);
  const { deleteFactura } = useDeleteFacturas();
  const { addConsorcio } = useAddConsorcio();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [facturaToDelete, setFacturaToDelete] = useState(null);
  const [processedFacturas, setProcessedFacturas] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const {
    totalSuma,
    facturas,
    departamentos,
    filteredCiudades,
    handleCiudadChange,
    handleDepartamentoChange,
    selectedCiudad,
    selectedDepartamento,
    setFacturas,
    fetchFacturas,
    selectedAnio,
    setSelectedAnio,
  } = useListFacturaCompleta();

  useEffect(() => {
    if (selectedCiudad) {
      fetchFacturas(selectedCiudad, searchQuery, selectedAnio).then();
    } else {
      setFacturas([]);
    }
  }, [
    fetchFacturas,
    selectedCiudad,
    searchQuery,
    selectedAnio,
    processedFacturas,
    setFacturas,
  ]);

  useEffect(() => {
    setFacturas([]);
  }, [selectedDepartamento, setFacturas]);

  const handleSearch = (query, anio) => {
    setSearchQuery(query);
    fetchFacturas(selectedCiudad, query, anio);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facturas.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = () => {
    if (facturaToDelete) {
      deleteFactura(facturaToDelete.id);
      setIsDeleteModalOpen(false);
    }
  };

  const handleAddConsorcio = async (ids) => {
    const idsArray = ids.split(",");
    const results = await Promise.all(idsArray.map((id) => addConsorcio(id)));
    const successfulIds = results.filter((result) => result);

    if (successfulIds.length > 0) {
      successfulIds.forEach((resultId) => {
        setProcessedFacturas((prev) => new Set(prev).add(resultId));
      });

      fetchFacturas(selectedCiudad, searchQuery, selectedAnio).then();
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => {
      const newSelectedIds = new Set(prev);
      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }
      return newSelectedIds;
    });
  };

  const handleAddSelectedConsorcios = () => {
    const idsArray = Array.from(selectedIds);
    if (idsArray.length > 0) {
      handleAddConsorcio(idsArray.join(","));
      setSelectedIds(new Set());
      setIsSelecting(false);
    } else {
      toast.info("No se han seleccionado facturas.");
    }
  };
  const handleSelectAllConsorcios = () => {
    if (selectedIds.size === facturas.length) {
      setSelectedIds(new Set());
    } else {
      const allIds = facturas.map((factura) => factura.id);
      setSelectedIds(new Set(allIds));
    }
  };

  const openDeleteModal = (factura) => {
    setFacturaToDelete(factura);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    handleDelete();
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setFacturaToDelete(null);
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
    fetchFacturas(selectedCiudad, searchQuery, anio)
      .then((facturas) => {
        setFacturasDisponibles(facturas.length > 0);
        setFacturas(facturas);
      })
      .catch(() => {
        setFacturasDisponibles(false);
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
              fetchFacturas(e.target.value, searchQuery, selectedAnio)
                .then((facturas) => {
                  setFacturasDisponibles(facturas.length > 0);
                })
                .catch(() => {
                  setFacturasDisponibles(false);
                });
            }}
            disabled={!selectedDepartamento}
            className="mb-4 rounded-xl  text-secundary shadow-md shadow-blue-500 px-2  py-3 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
          >
            <option value="">Selecciona una ciudad</option>
            {filteredCiudades.map((ciudad) => (
              <option key={ciudad.id} value={ciudad.id}>
                {ciudad.ciudad}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-around">
          <div className="xl:relative mr-4 xl:mt-0">
            <button
              onClick={handleDownload}
              className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
            >
              <span className="hidden md:inline">Descargar facturas</span>
              <RiDownloadLine className="mr-0 xl:mr-2" />
            </button>
          </div>

          <div className="relative xl:right-0 xl:mt-0">
            <input
              disabled={!selectedCiudad}
              type="text"
              value={searchQuery}
              onChange={(e) =>
                handleSearchWithResetAnio(e.target.value, facturasDisponibles)
              }
              className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
              placeholder="Search"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
              <RiSearchLine className="h-8 w-8 p-1 xl:mb-2 mb-1 rounded-md shadow-2xl text-secundary font-semibold " />
            </div>
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
            <div className="items-center  flex justify-end font-bold">
              <p>Total facturas: ${totalSuma}</p>
            </div>
          </div>
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsSelecting((prev) => !prev)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isSelecting ? "Cancelar selección" : "Seleccionar consorcios"}
            </button>
            {isSelecting && (
              <>
                <button
                  onClick={handleSelectAllConsorcios}
                  className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  {selectedIds.size === facturas.length
                    ? "Deseleccionar Todos"
                    : "Seleccionar Todos"}
                </button>

                <button
                  onClick={handleAddSelectedConsorcios}
                  className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
                >
                  Agregar Consorcios
                </button>
              </>
            )}
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-secundary text-white">#</th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Fecha
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
                  <th className="px-4 py-2 bg-secundary text-white">CUFE</th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Nombre Comercial vendedor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    NIT vendedor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Departamento vendedor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Municipio vendedor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Dirección vendedor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Correo vendedor
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Telefono
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Nombre comprador
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    NIT comprador
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Departamento comprador
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Municipio comprador
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Dirección comprador
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Correo comprador
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Teléfono
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Total acumulado
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Eliminar Factura
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Agregar No vinculante
                  </th>
                </tr>
              </thead>
              <tbody>
                {facturas.length > 0 ? (
                  currentItems.map((factura, index) => (
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
                      <td className="border px-4 text-center">
                        {factura.fechaEmision}
                      </td>
                      <td className="border px-4 text-center">
                        {factura.codigoUnico}
                      </td>
                      <td className="border px-4 text-center">
                        <HighlightedText
                          text={factura.nombreComercialEmisor}
                          highlight={searchQuery}
                        />
                      </td>
                      <td className="border px-4 text-center">
                        <HighlightedText
                          text={factura.nitEmisor}
                          highlight={searchQuery}
                        />
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
                        {factura.nombreAdquiriente}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {factura.numeroDocumentoAdquiriente}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {factura.departamentoAdquiriente}
                      </td>
                      <td className="border px-4 text-center">
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
                      <td className="border px-4">${factura.subtotal}</td>
                      <td className="border px-4 py-2 text-center">
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => openDeleteModal(factura)}
                            className="flex justify-center items-center mr-2 gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                          >
                            <RiDeleteBin5Fill className="" />
                          </button>
                        </div>
                      </td>
                      <td className="border px-4 text-center">
                        <div className="flex justify-center">
                          <button
                            onClick={() => {
                              if (isSelecting) {
                                handleToggleSelect(factura.id);
                              } else {
                                handleAddConsorcio(factura.id);
                              }
                            }}
                            disabled={factura.estado === 1 || !isSelecting}
                            className={`flex justify-center items-center gap-2 w-8 h-8 rounded-md shadow-2xl text-white font-semibold ${
                              factura.estado === 1
                                ? "bg-gradient-to-r from-[#81fb71] via-[#2de11d] to-[#2cbe12] cursor-not-allowed"
                                : isSelecting
                                ? selectedIds.has(factura.id)
                                  ? "bg-gradient-to-r from-[#ffcc00] to-[#ff9900]"
                                  : "bg-gradient-to-r from-[#718afb] to-[#1215be] hover:scale-105"
                                : "bg-gradient-to-r from-[#718afb] via-[#1d27e1] to-[#1215be] hover:shadow-xl"
                            }`}
                            aria-label={
                              factura.estado === 1
                                ? "Factura procesada"
                                : isSelecting
                                ? "Seleccionar factura"
                                : "Agregar factura"
                            }
                          >
                            {factura.estado === 1 ? (
                              <RiCheckboxCircleFill />
                            ) : isSelecting ? (
                              selectedIds.has(factura.id) ? (
                                <RiCheckboxCircleFill />
                              ) : (
                                <RiAddCircleFill />
                              )
                            ) : (
                              <RiAddCircleFill />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={17} className="text-center py-4 text-red-500">
                      {selectedAnio
                        ? "No hay facturas para el año seleccionado."
                        : "Esta ciudad no tiene facturas."}
                    </td>
                  </tr>
                )}
              </tbody>
              {facturas.length > 0 && (
                <tfoot>
                  <tr>
                    <th
                      className="px-4 py-2 bg-secundary text-white"
                      colSpan={17}
                    >
                      Total
                    </th>
                    <th className="border px-4 py-2">${totalSuma}</th>
                    <th className="px-4 py-2 bg-secundary text-white"></th>
                    <th className="px-4 py-2 bg-secundary text-white"></th>
                  </tr>
                </tfoot>
              )}
            </table>
            <Modal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              title="Eliminar Factura"
              confirmText="Confirmar"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            >
              <p>¿Estás seguro de eliminar esta factura?</p>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default FacturaCompleta;
