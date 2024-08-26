import { useEffect, useState } from "react";

import useSelectCityDepaUtils from "../../../../../utils/useSelectCityDepaUtils";
import useListConsorcios from "../../../../hook/Consorcios/useListConsorcios";
const ConsorcioClienteMunicipio = () => {
  const { consorcios, listConsorcios, setConsorcios } = useListConsorcios();
  const [formData, setFormData] = useState({});
  const {
    departamentos,
    filteredCiudades,
    selectedDepartamento,
    selectedCiudad,
    handleDepartamentoChange,
    handleCiudadChange,
  } = useSelectCityDepaUtils();
  useEffect(() => {
    if (selectedCiudad) {
      listConsorcios(selectedCiudad);
    } else {
      setConsorcios([]);
    }
  }, [listConsorcios, selectedCiudad, setConsorcios]);

  useEffect(() => {
    setConsorcios([]);
  }, [selectedDepartamento, setConsorcios]);

  return (
    <div>
      <div className="flex justify-around  ">
        <div className="ml-4 mt-3">
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
        <div className="ml-10 mt-3">
          <select
            value={selectedCiudad}
            onChange={(e) => {
              handleCiudadChange(e);
              setFormData({
                ...formData,
                ciudadId: e.target.value,
              });
              listConsorcios(e.target.value);
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
      {selectedCiudad && (
      <table className="table-auto w-full mt-6">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-secundary text-white">#</th>
            <th className="px-4 py-2 bg-secundary text-white">
              Fecha <br />
            </th>
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

            <th className="px-4 py-2 bg-secundary text-white">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {consorcios.length === 0 ? (
            <tr>
              <td colSpan="17" className="px-4 py-2 text-red-500 text-center">
                No hay facturas para esta ciudad
              </td>
            </tr>
          ) : (
            consorcios.map((consorcio, index) => (
              <tr
                key={consorcio.id}
                className={
                  index % 2 === 0
                    ? "bg-gray-100 whitespace-nowrap"
                    : "bg-white whitespace-nowrap"
                }
              >
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 text-center">
                  {consorcio.fechaEmision}
                </td>
                <td className="border px-4 text-center">
                  {consorcio.nombreAdquiriente}
                </td>

                <td className="border px-4 py-2 text-center">
                  {consorcio.numeroDocumentoAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.departamentoAdquiriente}
                </td>
                <td className="border px-4 py-2 text-center">
                  {consorcio.municipioAdquiriente}
                </td>

                <td className="border px-4 py-2 text-center">
                  <div className="flex justify-between">
                    ${consorcio.subtotal}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default ConsorcioClienteMunicipio;
