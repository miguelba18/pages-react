import { useState, useEffect } from "react";
import HighlightedText from "../../../../../utils/HighlightedText";
import {
  RiSearchLine,
  RiDownloadLine,
  RiDeleteBin5Fill,
  RiAddCircleFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import useListFacturaCompleta from "../../../../hook/Facturas/Factura Completa/admin/useListFacturaCompleta";
import useDescargarFacturas from "../../../../hook/Facturas/Factura Completa/admin/useDescargarFacturas";
import { toast } from "react-toastify";
import useDeleteFacturas from "../../../../hook/Facturas/Factura Completa/admin/useDeleteFacturas";
import Modal from "../../../../modal/Modal";
import useAddConsorcio from "../../../../hook/Facturas/Factura Completa/admin/useAddConsorcio";

const FacturaCompleta = () => {
  const [formData, setFormData] = useState({});
  const [setFacturasDisponibles] = useState(true);
  const { handleDownloadExcel } = useDescargarFacturas();
  const [resetAnio, setResetAnio] = useState(false);

  const { deleteFactura } = useDeleteFacturas();
  const { addConsorcio } = useAddConsorcio();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [facturaToDelete, setFacturaToDelete] = useState(null);

  const [processedFacturas, setProcessedFacturas] = useState(new Set());
  const {
    handleSearch,
    totalSuma,
    facturas,
    departamentos,
    filteredCiudades,
    handleCiudadChange,
    handleDepartamentoChange,
    selectedCiudad,
    selectedDepartamento,
    searchQuery,
    fetchFacturas,
    selectedAnio,
    setSelectedAnio,
  } = useListFacturaCompleta();

  const handleDelete = () => {
    if (facturaToDelete) {
      deleteFactura(facturaToDelete.id);
      setIsDeleteModalOpen(false);
    }
  };
  const handleAddConsorcio = async (id) => {
    const resultId = await addConsorcio(id);
    if (resultId) {
      setProcessedFacturas((prev) => new Set(prev).add(resultId));
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
              onChange={(e) => handleSearchWithResetAnio(e.target.value)}
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
          <div className="mt-4 text-right font-bold">
            <p>Total facturas: ${totalSuma}</p>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-secundary text-white">#</th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Fecha
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
                    Telefono
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
                    Teléfono
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Subtotal
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Eliminar
                  </th>
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

                          <button
                            onClick={() => handleAddConsorcio(factura.id)}
                            disabled={processedFacturas.has(factura.id)}
                            className={`  ${
                              processedFacturas.has(factura.id)
                                ? "flex justify-center items-center gap-2 w-8 h-8 rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#81fb71] via-[#2de11d] to-[#2cbe12] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#71fb86] cursor-not-allowed"
                                : "flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#718afb] via-[#1d27e1] to-[#1215be] hover:shadow-xl hover:shadow-blue-500 hover:scale-105 duration-300 hover:from-[#1512be] hover:to-[#717cfb]"
                            }`}
                          >
                            {processedFacturas.has(factura.id) ? (
                              <RiCheckboxCircleFill />
                            ) : (
                              <RiAddCircleFill className=" " />
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
