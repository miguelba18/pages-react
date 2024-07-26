import useListEmisor from "../../../../../hook/Facturas/Adquiriente y emisor/Emisor/admin/useListEmisor";
import useDescargarFacturas from "../../../../../hook/Facturas/Adquiriente y emisor/Emisor/useDescargarFacturas";
import { RiSearchLine, RiDownloadLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import HighlightedText from "../../../../../../utils/HighlightedText";


const EmisorAdmin = () => {
  const [formData, setFormData] = useState({});
  
  const { handleDownloadExcel } = useDescargarFacturas();
  const [totalSubtotal, setTotalSubtotal] = useState(0);

  


  const {
    handleSearch,
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
  } = useListEmisor();


  useEffect(() => {
    const total = facturas.reduce((sum, emisor) => {
      const subtotalStr = emisor.totalFactura.replace(/\./g, "");
      const subtotal = parseFloat(subtotalStr.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);

    setTotalSubtotal(total);
  }, [facturas]);

  

  const handleDownload = () => {
    handleDownloadExcel(searchQuery);
  };



  return (
    <div className="overflow-auto">
      <div className="flex xl:justify-between items-center ">
        <div className="flex justify-around  ">
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
        <div  className="ml-20">
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
              fetchFacturas(e.target.value, searchQuery, selectedAnio);
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
            <div className="flex  ">
        <div className="xl:relative mr-4">
          <button
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>

        <div className="relative xl:right-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-secundary font-semibold " />
          </div>
        </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 mt-4 xl:mt-0">
        Facturas de Emisores
      </h1>
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
        <table className="table-auto w-full mt-8">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white">#</th>
              <th className="px-4 py-2 bg-secundary text-white">
                Fecha <br/>
                <select
                      onChange={(e) => {
                        setSelectedAnio(e.target.value);
                        fetchFacturas(
                          selectedCiudad,
                          searchQuery,
                          e.target.value
                        );
                      }}
                      className="text-black"
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
              <th className="px-4 py-2 bg-secundary text-white">
                Nombre o Razón Social del Emisor
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Número Documento del Emisor
              </th>
        
              <th className="px-4 py-2 bg-secundary text-white">Total Factura</th>
            </tr>
          </thead>
          <tbody>
            {searchQuery === ""
              ? facturas.map((emisor, index) => (
                  <tr key={emisor.id} className="whitespace-nowrap">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4">
                      {emisor.fechaEmision.substring(0, 4)}
                    </td>
                    <td className="border px-4">
                      {emisor.nombreComercialEmisor}
                    </td>
                    <td className="border px-4 py-2">{emisor.nitEmisor}</td>
        
                    
                    <td className="border px-4 py-2">
          
                        ${emisor.subtotal}
                     

                    </td>
                  </tr>
                ))
              : facturas.map((emisor, index) => (
                  <tr key={emisor.id} className="whitespace-nowrap">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4">
                      {emisor.fechaCreacion.substring(0, 4)}
                    </td>
                    <td className="border px-4">
                      <HighlightedText
                        text={emisor.nombreComercialEmisor}
                        highlight={searchQuery}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <HighlightedText
                        text={emisor.nitEmisor}
                        highlight={searchQuery}
                      />
                    </td>
                    
                    
                    <td className="border px-4 py-2">
                        ${emisor.totalFactura}
                      
                    </td>
                  </tr>
                ))}
          </tbody>
          <tr>
              <th className="px-4 py-2 bg-secundary text-white" colSpan={4}>Total</th>
              <th className="border px-4 py-2">${totalSubtotal.toLocaleString("de-DE")}</th>
            </tr>
        </table>
        
      </div>
      </>
      )}
    </div>
  );
};

export default EmisorAdmin;
