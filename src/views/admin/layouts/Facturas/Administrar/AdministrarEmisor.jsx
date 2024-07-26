import { useState, useEffect, useCallback } from "react";
import useSelectCityDepaUtils from "../../../../../utils/useSelectCityDepaUtils";
import useAuthToken from "../../../../hook/Token/useAuthToken";
import { RiEditBoxFill } from "react-icons/ri";
import Modal from "../../../../modal/Modal";
import { toast } from "react-toastify";

const AdministrarEmisor = () => {
  const [formData, setFormData] = useState({});
  const [facturas, setFacturas] = useState([]);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const { token } = useAuthToken();
  const {
    departamentos,
    filteredCiudades,
    selectedDepartamento,
    selectedCiudad,
    handleDepartamentoChange,
    handleCiudadChange,
  } = useSelectCityDepaUtils();

  const fetchFacturas = useCallback(
    async (ciudad) => {
      try {
        let url = "http://localhost:8080/factura/emisor-admin";
        if (ciudad) {
          url += `?ciudad=${ciudad}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las facturas");
        }

        const data = await response.json();
        setFacturas(data);
      } catch (error) {
        console.error(error);
        setFacturas([]);
      }
    },
    [token]
  );

  useEffect(() => {
    if (selectedCiudad) {
      fetchFacturas(selectedCiudad);
    } else {
      setFacturas([]);
    }
  }, [fetchFacturas, selectedCiudad]);

  useEffect(() => {
    setFacturas([]);
  }, [selectedDepartamento]);

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
  }, [selectedDepartamento]);
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Departamento
          </label>
          <select
            value={selectedDepartamento}
            onChange={(e) => {
              handleDepartamentoChange(e);
              setFormData({
                ...formData,
                departamentoId: e.target.value,
              });
              setFacturas([]);
            }}
            className="mb-4 text-secundary border-b px-2 border-black py-1 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
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
          <label
            htmlFor="ciudad"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Ciudad:
          </label>
          <select
            value={selectedCiudad}
            onChange={(e) => {
              handleCiudadChange(e);
              setFormData({
                ...formData,
                ciudadId: e.target.value,
              });
              setFacturas([]);
            }}
            disabled={!selectedDepartamento}
            className="border-b mb-4 px-2 text-secundary border-black py-1 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
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

      {facturas.length > 0 && selectedCiudad && (
        <>
          <div className="mt-4 text-right font-bold">
            <p>Total facturas: ${totalSubtotal.toLocaleString("de-DE")}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Facturas Emisor</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full mt-6">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-secundary text-white">#</th>
                    <th className="px-4 py-2 bg-secundary text-white">
                      Nombre o Razón Social del Emisor
                    </th>
                    <th className="px-4 py-2 bg-secundary text-white">
                      Número Documento del Emisor
                    </th>
                    <th className="px-4 py-2 bg-secundary text-white">
                      País del Emisor
                    </th>
                    <th className="px-4 py-2 bg-secundary text-white">
                      Departamento del Emisor
                    </th>
                    <th className="px-4 py-2 bg-secundary text-white">
                      Municipio del Emisor
                    </th>
                    <th className="px-4 py-2 bg-secundary text-white">
                      Dirección del Emisor
                    </th>
                    <th className="px-4 py-2 bg-secundary text-white">
                      Correo del Emisor
                    </th>
                    <th className="px-4 py-2 bg-secundary text-white">
                      Subtotal
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {facturas.map((factura, index) => (
                    <tr key={factura.id} className={
                      index % 2 === 0
                        ? "bg-gray-100 whitespace-nowrap"
                        : "bg-white whitespace-nowrap"
                    }>
                      <td className="border px-4 py-2x text-center">{index + 1}</td>
                      <td className="border px-4 text-center">
                        {factura.nombreComercialEmisor}
                      </td>
                      <td className="border px-4 py-2 text-center">{factura.nitEmisor}</td>
                      <td className="border px-4 py-2 text-center">{factura.paisEmisor}</td>
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
                      <td className="border px-4 py-2 flex justify-between text-center">${factura.subtotal}
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
              <th className="px-4 py-2 bg-secundary text-white" colSpan={8}>Total</th>
              <th className="border px-4 py-2" >${totalSubtotal.toLocaleString("de-DE")}</th>
            </tr>
          </table>
            </div>

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
        </>
      )}
      {facturas.length === 0 && selectedCiudad && (
        <p className="text-red-500">
          No hay facturas disponibles para la ciudad seleccionada.
        </p>
      )}
    </div>
  );
};

export default AdministrarEmisor;
