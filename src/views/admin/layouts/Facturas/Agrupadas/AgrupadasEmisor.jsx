import { useState, useEffect, useCallback } from "react";
import useSelectCityDepaUtils from "../../../../../utils/useSelectCityDepaUtils";
import useAuthToken from "../../../../hook/Token/useAuthToken";
import { RiDownloadLine } from "react-icons/ri";
import useDescargarFacturas from "../../../../hook/Facturas/Adquiriente y emisor/Emisor/Agrupadas/useDescargarFacturas";

const AgrupadasEmisor = () => {
  const [formData, setFormData] = useState({});
  const [facturas, setFacturas] = useState([]);
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const { handleDownloadExcel } = useDescargarFacturas();

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
        let url = "http://localhost:8080/factura/emisor-agrupar";
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
  useEffect(() => {
    const total = facturas.reduce((sum, adquiriente) => {
      let subtotalStr = adquiriente.subtotal.toString();
      const subtotals = subtotalStr.replace(/\./g, "");
      const subtotal = parseFloat(subtotals.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);

    setTotalSubtotal(total);
  }, [facturas]);

  const handleDownload = () => {
    handleDownloadExcel(selectedCiudad);
  };

  return (
    <div>
      <div className=" flex justify-around">
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
        <div className="xl:relative mt-4">
          
          <button onClick={handleDownload} disabled={!selectedCiudad} className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]">
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>
      </div>

      {facturas.length === 0 && selectedCiudad && (
        <p className="text-red-500">
          No hay facturas disponibles para la ciudad seleccionada.
        </p>
      )}

      {facturas.length > 0 && (
        <>
          <div className="mt-4 text-right font-bold">
            <p>Total facturas: ${totalSubtotal.toLocaleString("de-DE")}</p>
          </div>
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

                  <th className="px-4 py-2 bg-secundary text-white">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {facturas.map((factura, index) => (
                  <tr key={factura.id} className="whitespace-nowrap">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4">
                      {factura.nombreComercialEmisor}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {factura.nitEmisor}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      ${factura.subtotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AgrupadasEmisor;
