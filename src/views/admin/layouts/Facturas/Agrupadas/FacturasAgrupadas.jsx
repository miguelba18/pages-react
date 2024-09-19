import { useState } from "react";
import AgrupadasAdquiriente from "./AgrupadasAdquiriente";
import AgrupadasEmisor from "./AgrupadasEmisor";
const FacturasAgrupadas = () => {
    const [selectedEmpresa, setSelectedEmpresa] = useState("adquiriente");
  const handleEmpresaChange = (empresa) => {
    setSelectedEmpresa(empresa);
  };
  return (
    <div>
    <h1 className="text-2xl font-bold mb-4 mt-4 xl:mt-0">
      Facturas Agrupadas
    </h1>

    <div>
        <div className="mt-4 mb-8">
          <button
            onClick={() => handleEmpresaChange("adquiriente")}
            className={`${
              selectedEmpresa === "adquiriente"
                ? "bg-secundary text-white shadow-xl shadow-secundary"
                  : "bg-white text-secundary"
            } px-4 py-2 rounded-l`}
          >
            Comprador
          </button>
          <button
            onClick={() => handleEmpresaChange("emisor")}
            className={`${
              selectedEmpresa === "emisor"
                ? "bg-secundary text-white shadow-xl shadow-secundary"
                  : "bg-white text-secundary"
            } px-4 py-2 rounded-r`} 
          >
            Vendedor
          </button>
        </div>
      
    </div>
    {selectedEmpresa === "adquiriente" && <AgrupadasAdquiriente />}
    {selectedEmpresa === "emisor" && <AgrupadasEmisor />}
    
    
  </div>
  )
}

export default FacturasAgrupadas
