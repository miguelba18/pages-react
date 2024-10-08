

import { useState, useEffect } from "react";

import {
 
  RiDeleteBin5Fill,
  
 
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

import useListFacturasTodas from "../../../../hook/Facturas/Factura Completa/useListFacturasTodas";

import useDeleteFacturas from "../../../../hook/Facturas/Factura Completa/admin/useDeleteFacturas";
import Modal from "../../../../modal/Modal";


const FacturaCompletaTodas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
 



  const { deleteFactura } = useDeleteFacturas();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [facturaToDelete, setFacturaToDelete] = useState(null);

  const {
    totalSuma,
    facturas,
    fetchFacturas
  } = useListFacturasTodas();

  useEffect(() => {
    fetchFacturas();
  }, [fetchFacturas]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facturas.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = () => {
    if (facturaToDelete) {
      deleteFactura(facturaToDelete.id);
      setIsDeleteModalOpen(false);
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

  

  

  

  
  return (
    <div>
      <div className="xl:flex justify-around">
        
        

    
      </div>

      
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
          

          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-secundary text-white">#</th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Fecha
                    
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
                        {factura.nombreComercialEmisor}
                     
                      
                      </td>
                      <td className="border px-4 text-center">
                        {factura.nitEmisor}
                          
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
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={17} className="text-center py-4 text-red-500">
                      <p>No hay facturas para mostrar.</p> 
                        
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
    
    </div>
  );
};

export default FacturaCompletaTodas;

