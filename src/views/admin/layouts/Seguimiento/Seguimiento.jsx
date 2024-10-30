import { RiSearchLine, RiDownloadLine, RiAddFill } from "react-icons/ri";
import useListSeguimiento from "../../../hook/Seguimiento/useListSeguimiento";
import useAddSeguimiento from "../../../hook/Seguimiento/useAddSeguimiento";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Seguimiento = () => {
  const { consorcios, listConsorcios } = useListSeguimiento();

  const { addSeguimiento, loading, error } = useAddSeguimiento();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    contribuyente: "",
    nit: "",
    fecha: "",
    oficioPersuasivoParaDeclarar: "",
    emplazamientoParaDeclarar: "",
    resolucionSancionPorNoDeclarar: "",
    liquidacionDeAforo: "",
    medidasCautelares: "",
    cobranzas: "",
    pazYSalvo: "",
  });

  useEffect(() => {
    listConsorcios();
  }, [listConsorcios]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    event.preventDefault(); 

  
  for (let field in formData) {
    if (formData[field] === "" || formData[field] === null) {
      toast.info(`Por favor completa el campo: ${field}`);
      return;
    }
  }
    try {
      await addSeguimiento(formData);
      setShowModal(false);
      toast.success("Seguimiento agregado correctamente", {autoClose:1200});
      setTimeout(() => {
        window.location.reload();
      }, 1700);
      setFormData({
        contribuyente: "",
        nit: "",
        fecha: "",
        oficioPersuasivoParaDeclarar: "",
        emplazamientoParaDeclarar: "",
        resolucionSancionPorNoDeclarar: "",
        liquidacionDeAforo: "",
        medidasCautelares: "",
        cobranzas: "",
        pazYSalvo: "",
      });
    } catch (error) {
      toast.error("Hubo un error al agregar el seguimiento");
    }
  };

  const cancelModal =() => {
    setShowModal(false);
    setFormData({
      contribuyente: "",
      nit: "",
      fecha: "",
      oficioPersuasivoParaDeclarar: "",
      emplazamientoParaDeclarar: "",
      resolucionSancionPorNoDeclarar: "",
      liquidacionDeAforo: "",
      medidasCautelares: "",
      cobranzas: "",
      pazYSalvo: "",
    });
  };

  useEffect(() => {
    listConsorcios();
  }, [listConsorcios]);

  return (
    <div>
      <h1 className="font-bold text-3xl text-secundary">
        Control y Seguimiento Contribuyente
      </h1>

      <div className="flex justify-end">
        <div className="xl:relative mr-4">
          <button className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]">
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>

        <div className="relative ">
          <input
            type="text"
            className="rounded-[10px] shadow-xl  w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-secundary font-semibold " />
          </div>
        </div>
      </div>
      <div className="xl:relative mr-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
        >
          <span className="hidden md:inline">Agregar Seguimiento</span>
          <RiAddFill className="mr-0 xl:mr-2" />
        </button>
      </div>

      <>
        <div className="flex  justify-between"></div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full mt-2">  
            <thead>
              <tr>
                <th className="px-4 py-2 bg-secundary text-white">#</th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Contribuyente
                </th>
                <th className="px-4 py-2 bg-secundary text-white">NIT</th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Año
                  <br />
                  <input type="date" className="text-secundary" />
                </th>

                <th className="px-4 py-2 bg-secundary text-white">
                  Oficio persuasivo para declarar
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Emplazamiento para declarar
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Resolucion sancion por no declarar
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Liquidacion de aforo
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Medidas Cautelares
                </th>
                
                <th className="px-4 py-2 bg-secundary text-white">Cobranzas</th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Paz y salvo
                </th>
              </tr>
            </thead>
            <tbody>
              {consorcios.map((consorcio, index) => (
                <tr
                key={consorcio.id}
                className={
                  index % 2 === 0
                    ? "bg-gray-100 whitespace-nowrap"
                    : "bg-white whitespace-nowrap"
                }
              >
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border text-center">{consorcio.contribuyente}</td>
                  <td className="px-4 py-2 border text-center">{consorcio.nit}</td>
                  <td className="px-4 py-2 border text-center">{consorcio.fecha}</td>
                  <td className="px-4 py-2 border text-center">{consorcio.oficioPersuasivoParaDeclarar}</td>
                  <td className="px-4 py-2 border text-center">{consorcio.emplazamientoParaDeclarar}</td>
                  <td className="px-4 py-2 border text-center">{consorcio.resolucionSancionPorNoDeclarar}</td>
                  <td className="px-4 py-2 border text-center">{consorcio.liquidacionDeAforo}</td>
                  <td className="px-4 py-2 border text-center">{consorcio.medidasCautelares}</td>
                  <td className="px-4 py-2 border text-center">{consorcio.cobranzas}</td>
                  <td className="px-4 py-2 border text-center">{consorcio.pazYSalvo}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full h-[80vh] flex flex-col">
      <h2 className="text-xl font-bold mb-4 p-6 border-b">Agregar Seguimiento</h2>


      <div className="p-6 overflow-y-auto flex-grow">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Contribuyente</label>
              <input
                type="text"
                name="contribuyente"
                value={formData.contribuyente}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md w-full px-4 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">NIT</label>
              <input
                type="number"
                name="nit"
                value={formData.nit}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md w-full px-4 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md w-full px-4 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Oficio Persuasivo para Declarar</label>
              <select
                name="oficioPersuasivoParaDeclarar"
                value={formData.oficioPersuasivoParaDeclarar}
                required
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md w-full px-4 py-2"
              >
                <option value="">Seleccionar</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Emplazamiento para Declarar</label>
              <select
                name="emplazamientoParaDeclarar"
                value={formData.emplazamientoParaDeclarar}
                required
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md w-full px-4 py-2"
              >
                <option value="">Seleccionar</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Resolución Sanción por No Declarar</label>
              <input
                type="text"
                name="resolucionSancionPorNoDeclarar"
                value={formData.resolucionSancionPorNoDeclarar}
                required
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md w-full px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Liquidación de Aforo</label>
              <input
                type="text"
                name="liquidacionDeAforo"
                value={formData.liquidacionDeAforo}
                required
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md w-full px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Medidas Cautelares</label>
              <input
                type="text"
                name="medidasCautelares"
                value={formData.medidasCautelares}
                required
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md w-full px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Cobranzas</label>
              <select
                name="cobranzas"
                value={formData.cobranzas}
                required
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md w-full px-4 py-2"
              >
                <option value="">Seleccionar</option>
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Paz y Salvo</label>
              <select
                name="pazYSalvo"
                value={formData.pazYSalvo}
                required
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md w-full px-4 py-2"
              >
                <option value="">Seleccionar</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {error && <p className="text-red-500 mb-4 px-6">{error}</p>}


      <div className="flex justify-end p-6 border-t">
        <button
          onClick={cancelModal}
          className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          {loading ? "Guardando..." : "Agregar"}
        </button>
      </div>
    </div>
  </div>
)}



        </div>
      </>
    </div>
  );
};

export default Seguimiento;
