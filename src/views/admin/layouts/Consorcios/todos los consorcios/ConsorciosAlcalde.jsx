import { useState, useEffect } from "react";
import useListConsorcios from "../../../../hook/Consorcios/useListConsorcios";
import {
  RiSearchLine,
  RiDownloadLine,
  RiDeleteBin5Fill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import useDescargarConsorcios from "../../../../hook/Consorcios/useDescargarConsorcios";
import HighlightedText from "../../../../../utils/HighlightedText";
import Modal from "../../../../modal/Modal";
import useDeleteConsorcios from "../../../../hook/Consorcios/useDeleteConsorcios";
import useAuthToken from "../../../../hook/Token/useAuthToken";
import { useNavigate } from "react-router-dom";

const ConsorciosAlcalde = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  
 
  const [resetAnio, setResetAnio] = useState(false);
  const { handleDownloadExcel } = useDescargarConsorcios();
  const [setFacturasDisponibles] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnio, setSelectedAnio] = useState("");
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [facturaToDelete, setFacturaToDelete] = useState(null);
  const { deleteConsorcio } = useDeleteConsorcios();
  const { consorcios, listConsorcios } = useListConsorcios();
  const [userRoleId, setUserRoleId] = useState(null);
  const { token } = useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const roleId = decodedToken.role;

        setUserRoleId(roleId);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        window.localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, token]);

  


  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
    setSearchQuery("");
    listConsorcios("", "", anio)
      .then((facturas) => {
        setFacturasDisponibles(facturas.length > 0);
      })
      .catch(() => {
        setFacturasDisponibles(false);
      });
  };
  useEffect(() => {
    listConsorcios();
  }, [listConsorcios]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consorcios.slice(indexOfFirstItem, indexOfLastItem);

  const handleDownload = () => {
    handleDownloadExcel(searchQuery, selectedAnio);
  };
  const handleSearch = (query, anio) => {
    setSearchQuery("");
    setSearchQuery(query);
    listConsorcios("", query, anio);
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

  useEffect(() => {
    const total = consorcios.reduce((sum, consorcio) => {
      const subtotalStr = consorcio.subtotal.replace(/\./g, "");
      const subtotal = parseFloat(subtotalStr.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);
    setTotalSubtotal(total);
  }, [consorcios]);

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
  const handleDelete = () => {
    if (facturaToDelete) {
      deleteConsorcio(facturaToDelete.id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div>
      <div className="xl:flex xl:justify-around items-center">
      <h1 className="font-bold text-3xl text-secundary">
          Todas las facturas No Vinculantes
        </h1>
        <div className="xl:relative mr-4">
          <button
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>

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
                consorcios.length / itemsPerPage
              )}`}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(consorcios.length / itemsPerPage)
                }
                className="p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
              >
                <RiArrowRightSLine />
              </button>
            </div>
            <div className="mt-4 text-right font-bold">
              <p>Total facturas: ${totalSubtotal.toLocaleString("de-DE")}</p>
            </div>
          </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white">#</th>
              <th className="px-4 py-2 bg-secundary text-white">CUFE</th>
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
              <th className="px-4 py-2 bg-secundary text-white">Pais Vendedor</th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento Vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio Vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección Vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo Vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre Comercial Vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">NIT Vendedor</th>
              <th className="px-4 py-2 bg-secundary text-white">
                Tipo Contribuyente Vendedor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre Comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Numero Documento Comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Tipo Documento Comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Pais Comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Departamento Comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio Comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección Comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo Comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Telefono Comprador
              </th>
              <th className="px-4 py-2 bg-secundary text-white">Subtotal</th>
              {userRoleId === "Alcalde" && (
              <th
                
                className="px-4 py-2 bg-secundary text-white"
              >
                Eliminar
              </th>
            )}
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
                  <td className="border px-4 py-2 text-center">{indexOfFirstItem+index + 1}</td>

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
                    <HighlightedText
                      text={consorcio.nitEmisor}
                      highlight={searchQuery}
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {consorcio.tipoContribuyenteEmisor}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {consorcio.nombreAdquiriente}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <HighlightedText
                      text={consorcio.numeroDocumentoAdquiriente}
                      highlight={searchQuery}
                    />
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
                  {userRoleId === "Alcalde" && (
                  <td
                    
                    className="border px-4 py-2 text-center"
                  >
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => openDeleteModal(consorcio)}
                        className="flex justify-center items-center mr-2 gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                      >
                        <RiDeleteBin5Fill className="" />
                      </button>
                    </div>
                  </td>
                )}
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
          {consorcios.length > 0 && (
            <tfoot>
              <tr>
                <th className="px-4 py-2 bg-secundary text-white" colSpan={23}>
                  Total
                </th>
                <th className="border px-4 py-2">
                  ${totalSubtotal.toLocaleString("de-DE")}
                </th>
                {userRoleId === "Alcalde" && (
                <th
                  
                  className="px-4 py-2 bg-secundary text-white"
                ></th>
              )}
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
    </div>
  );
};

export default ConsorciosAlcalde;
