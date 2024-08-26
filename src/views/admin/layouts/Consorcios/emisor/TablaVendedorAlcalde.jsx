import { useEffect, useState } from "react";
import useDescargarConsorciosPersona from "../../../../hook/Consorcios/use DescargarConsorciosPersona";
import { RiSearchLine, RiDownloadLine } from "react-icons/ri";
import useListConsorciosPersona from "../../../../../views/hook/Consorcios/useListConsorciosPersona";
import HighlightedText from "../../../../../utils/HighlightedText";
const TablaVendedorAlcalde = () => {
  const { consorcios, listConsorcios } =
    useListConsorciosPersona();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnio, setSelectedAnio] = useState("");
  const [resetAnio, setResetAnio] = useState(false);
  const [facturasDisponibles, setFacturasDisponibles] = useState(false);
  const {handleDownloadExcel} = useDescargarConsorciosPersona();



  const handleAnioChange = (anio) => {
    setSelectedAnio(anio);
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

  const handleSearchWithResetAnio = (query) => {
    const filteredQuery = query.replace(/[0-9]/g, "");
    setSelectedAnio("");
    handleSearch(filteredQuery, "");
    setResetAnio(true);
  };

  useEffect(() => {
    if (resetAnio) {
      setResetAnio(false);
    }
  }, [resetAnio]);

  const handleSearch = (query, anio) => {
    setSearchQuery("");
    setSearchQuery(query);
    listConsorcios("", query, anio);
  };
  const handleDownload = () => {
    handleDownloadExcel(searchQuery, selectedAnio);
  };
  return (
    <div>
      <div className="xl:flex xl:justify-between items-center">
        <div className="flex justify-end">
          <div className="relative " >
          <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                handleSearchWithResetAnio(e.target.value, facturasDisponibles)
              }
              className="rounded-[10px] shadow-xl  w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
              placeholder="Search"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
              <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-secundary font-semibold " />
            </div>
          </div>
        </div>
        <div  className="xl:relative mr-4">
          <button disabled={consorcios.length < 1}
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>
        
      </div>
      
        <>
          <table className="table-auto w-full mt-8">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-secundary text-white">#</th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Fecha <br />
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
                <th className="px-4 py-2 bg-secundary text-white">
                  Nombre o Razón Social del Emisor
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Nombre Comprador
                </th>
                <th className="px-4 py-2 bg-secundary text-white">
                  Subtotal Factura
                </th>
              </tr>
            </thead>
            <tbody>
              {consorcios.length > 0 ? (
                consorcios.map((consorcio, index) => (
                  <tr
                    key={consorcio.id}
                    className={
                      index % 2 === 0
                        ? "bg-gray-100 whitespace-nowrap"
                        : "bg-white whitespace-nowrap"
                    }
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 text-center">
                      {consorcio.fechaEmision}
                    </td>
                    <td className="border px-4 text-center">
                      <HighlightedText
                        text={consorcio.nombreComercialEmisor}
                        highlight={searchQuery}
                      />
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <HighlightedText
                        text={consorcio.nombreAdquiriente}
                        highlight={searchQuery}
                      />
                    </td>
                    <td className="border px-4 py-2 text-center">
                      ${consorcio.subtotal}
                    </td>
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
          </table>
        </>
     
    </div>
  );
};

export default TablaVendedorAlcalde;
