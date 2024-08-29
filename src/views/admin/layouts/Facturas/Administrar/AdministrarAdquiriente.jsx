import { useState, useEffect } from "react";
import useSelectCityDepaUtils from "../../../../../utils/useSelectCityDepaUtils";
import useAuthToken from "../../../../hook/Token/useAuthToken";
import {
  RiEditBoxFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import Modal from "../../../../modal/Modal";
import { toast } from "react-toastify";
import useListAdministrar from "../../../../hook/Facturas/Adquiriente y emisor/adquiriente/Administrar/useListAdministrar";

const AdministrarAdquiriente = () => {
  const [formData, setFormData] = useState({});
  const itemsPerPage = 100;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const { token } = useAuthToken();
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { facturas, fetchFacturas, setFacturas } = useListAdministrar();

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

  const handleEdit = (factura) => {
    setSelectedFactura({
      ...factura,
      subtotal: factura.subtotal.replace(/\./g, ""),
      totalFactura: factura.totalFactura.replace(/\./g, ""),
    });
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const editedFactura = {
        ...selectedFactura,
        subtotal: selectedFactura.subtotal.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          "."
        ),
      };

      const response = await fetch(
        `http://localhost:8080/factura/${selectedFactura.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedFactura),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la factura");
      }

      const result = await response.text();
      toast.success(result, { autoClose: 1700 });

      fetchFacturas(selectedCiudad);
      setSelectedFactura(null);
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la factura");
    }
  };
  useEffect(() => {
    setFacturas([]);
  }, [selectedDepartamento, setFacturas]);
  useEffect(() => {
    const total = facturas.reduce((sum, adquiriente) => {
      const subtotalStr = adquiriente.subtotal.replace(/\./g, "");
      const subtotal = parseFloat(subtotalStr.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);

    setTotalSubtotal(total);
  }, [facturas]);

  return (
    <div>
      <div className="mb-4 mt-4 xl:flex justify-around">
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
            <div className="items-center  flex justify-end font-bold">
              <p>Total facturas: ${totalSubtotal.toLocaleString("de-DE")}</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full mt-6">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-secundary text-white">#</th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Nombre o Razón Social del Adquiriente
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Número Documento del Adquiriente
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Departamento del Adquiriente
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Municipio del Adquiriente
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Dirección del Adquiriente
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Correo del Adquiriente
                  </th>
                  <th className="px-4 py-2 bg-secundary text-white">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((factura, index) => (
                  <tr
                    key={factura.id}
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
                      {factura.nombreAdquiriente}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {factura.numeroDocumentoAdquiriente}
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
                    <td className="border px-4 py-2 flex justify-between text-center">
                      ${factura.subtotal}
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleEdit(factura)}
                          className="text-blue-500"
                        >
                          <RiEditBoxFill className="h-6 w-6" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tr>
                <th className="px-4 py-2 bg-secundary text-white" colSpan={7}>
                  Total
                </th>
                <th className="border px-4 py-2">
                  ${totalSubtotal.toLocaleString("de-DE")}
                </th>
              </tr>
            </table>
          </div>
        </>
      )}

      {selectedFactura && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          confirmText="Guardar Cambios"
          cancelText="Cancelar"
          onConfirm={handleSaveEdit}
        >
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Editar Factura</h2>
            <label
              htmlFor="newSubtotal"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nuevo Subtotal:
            </label>
            <input
              type="number"
              id="newSubtotal"
              value={selectedFactura.subtotal}
              onChange={(e) =>
                setSelectedFactura({
                  ...selectedFactura,
                  subtotal: e.target.value,
                })
              }
              className="border-2 border-gray-300 rounded-xl px-2 py-2"
              required
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdministrarAdquiriente;
