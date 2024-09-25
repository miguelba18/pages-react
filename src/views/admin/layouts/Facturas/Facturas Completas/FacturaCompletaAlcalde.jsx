import { useState, useEffect } from "react";
import HighlightedText from "../../../../../utils/HighlightedText";
import {
  RiSearchLine,
  RiDownloadLine,
  RiAddCircleFill,
  RiCheckboxCircleFill,
  RiArrowLeftSLine,
  RiArrowRightSLine
} from "react-icons/ri";
import useListAlcalde from "../../../../hook/Facturas/Factura Completa/alcalde/useListAlcalde";
import useDescargarFacturas from "../../../../hook/Facturas/Factura Completa/admin/useDescargarFacturas";

import useAddConsorcio from "../../../../hook/Facturas/Factura Completa/admin/useAddConsorcio";
import { toast } from "react-toastify";
const FacturaCompleta = () => {
  const { facturas, fetchFacturas, totalSuma } = useListAlcalde();
  const [searchQuery, setSearchQuery] = useState("");
  const { addConsorcio } = useAddConsorcio();
  const [selectedAnio, setSelectedAnio] = useState("");
  const { handleDownloadExcel } = useDescargarFacturas();
  const [processedFacturas, setProcessedFacturas] = useState(new Set());
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 100;
  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    fetchFacturas(searchQuery, anio);
  };
  const handleSearch = (query, anio) => {
    fetchFacturas( query, anio);
  };
  useEffect(() => {

    fetchFacturas( selectedAnio);

  }, [ selectedAnio, fetchFacturas,processedFacturas]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facturas.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddConsorcio = async (ids) => {
    const idsArray = ids.split(',');
    const results = await Promise.all(idsArray.map((id) => addConsorcio(id)));
    const successfulIds = results.filter((result) => result);

    if (successfulIds.length > 0) {
      successfulIds.forEach((resultId) => {
        setProcessedFacturas((prev) => new Set(prev).add(resultId));
      });

      fetchFacturas("", searchQuery, selectedAnio).then(
        
      );
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
      handleAddConsorcio(idsArray.join(',')); 
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
      
      const allIds = facturas.map(factura => factura.id);
      setSelectedIds(new Set(allIds));
    }
  };

  const handleDownload = () => {
    handleDownloadExcel("",searchQuery, selectedAnio);
    
  };

  return (
    <div>
      
      <div className="xl:flex justify-end">
        <div className="xl:relative mr-4">
          <button
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>

        <div className="relative xl:right-0   ">
            <input
           
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchQuery, selectedAnio); 
                }
              }}
              placeholder="Buscar facturas..."
              className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1 xl:mb-0 mb-1 rounded-md shadow-2xl text-secundary font-semibold " />
          </div>
          </div>
      </div>

      <div className="flex  justify-between">
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
          >
            <RiArrowLeftSLine />
          </button>
          <span className="mt-2">{`Página ${currentPage} de ${Math.ceil(
            facturas.length / itemsPerPage
          )}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(facturas.length / itemsPerPage)}
            className="p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
          >
            <RiArrowRightSLine />
          </button>
        </div>
        <div className="items-center  mt-2  flex justify-end font-bold">
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
              {selectedIds.size === facturas.length ? "Deseleccionar Todos" : "Seleccionar Todos"}
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
                Nombre Comercial  vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                NIT vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento  vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio  vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección  vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo  vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre adquiriente 
                </th>
              <th className="px-4 py-2 bg-secundary text-white">
                NIT comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento  comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio  comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">Total acumulado</th>
              <th className="px-4 py-2 bg-secundary text-white">Agregar No vinculante</th>
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
              currentItems.map((factura, index) => (
                <tr
                  key={factura.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 whitespace-nowrap"
                      : "bg-white whitespace-nowrap"
                  }
                >
                  <td className="border px-4 py-2 text-center">{indexOfFirstItem +index + 1}</td>
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
            )}
          </tbody>
          <tfoot>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white" colSpan="17">
                Total
              </th>
              <th className="border px-4 py-2">${totalSuma}</th>
              <th className="px-4 py-2 bg-secundary text-white"></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FacturaCompleta;
