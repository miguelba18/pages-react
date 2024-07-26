import { useState } from "react";
import AgrupadasAdquirienteAlcalde from "./AgrupadasAdquirienteAlcalde";
import AgrupadasEmisorAlcalde from "./AgrupadasEmisorAlcalde";

const AgrupadasAlcalde = () => {
    const [selectedEmpresa, setSelectedEmpresa] = useState("adquiriente");
  const handleEmpresaChange = (empresa) => {
    setSelectedEmpresa(empresa);
};
  return (
    <div>
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
    {selectedEmpresa === "adquiriente" && <AgrupadasAdquirienteAlcalde />}
    {selectedEmpresa === "emisor" && <AgrupadasEmisorAlcalde />}
    
      
    </div>
  )
}

export default AgrupadasAlcalde
