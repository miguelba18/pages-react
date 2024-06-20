import AdministrarAdquiriente from "./AdministrarAdquiriente"
import AdministrarEmisor from "./AdministrarEmisor"
import { useState } from "react"

const AdministrarFacturas = () => {
  const [selectedEmpresa, setSelectedEmpresa] = useState("adquiriente");
  const handleEmpresaChange = (empresa) => {
    setSelectedEmpresa(empresa);
  };
  return (
    
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-4 xl:mt-0">
        Administrar facturas
      </h1>

      <div>
          <div className="mt-4">
            <button
              onClick={() => handleEmpresaChange("adquiriente")}
              className={`${
                selectedEmpresa === "adquiriente"
                  ? "bg-secundary text-white shadow-xl shadow-secundary"
                  : "bg-white text-secundary"
              } px-4 py-2 rounded-l`}
            >
              Adquiriente
            </button>
            <button
              onClick={() => handleEmpresaChange("emisor")}
              className={`${
                selectedEmpresa === "emisor"
                  ? "bg-secundary text-white shadow-xl shadow-secundary"
                  : "bg-white text-secundary"
              } px-4 py-2 rounded-r`} 
            >
              Emisor
            </button>
          </div>
        
      </div>
      {selectedEmpresa === "adquiriente" && <AdministrarAdquiriente />}
      {selectedEmpresa === "emisor" && <AdministrarEmisor />}
      
      
    </div>
  )
}

export default AdministrarFacturas
