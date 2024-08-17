import EnviarCorreoAdquiriente from "./EnviarCorreoAdquiriente";
import EnviarCorreoEmisor from "./EnviarCorreoEmisor";
import { useState } from "react"
import EnviarCorreoSecrePer from "./EnviarCorreoSecrePer";

const EnviarCorreoAlcalde = () => {
  const [selectedEmpresa, setSelectedEmpresa] = useState("secretper");
  const handleEmpresaChange = (empresa) => {
    setSelectedEmpresa(empresa);
  };
  return (
    
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-4 xl:mt-0">
        Enviar Correos
      </h1>

      <div>
          <div className="mt-4">
          <button
              onClick={() => handleEmpresaChange("secretper")}
              className={`${
                selectedEmpresa === "secretper"
                  ? "bg-secundary text-white shadow-xl shadow-secundary"
                  : "bg-white text-secundary"
              } px-4 py-2 rounded-l`}
            >
              Secretario y personal
            </button>
            <button
              onClick={() => handleEmpresaChange("adquiriente")}
              className={`${
                selectedEmpresa === "adquiriente"
                  ? "bg-secundary text-white shadow-xl shadow-secundary"
                  : "bg-white text-secundary"
              } px-4 py-2 `}
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
      {selectedEmpresa === "secretper" && <EnviarCorreoSecrePer />}
      {selectedEmpresa === "adquiriente" && <EnviarCorreoAdquiriente />}
      {selectedEmpresa === "emisor" && <EnviarCorreoEmisor />}
      
      
    </div>
  )
}

export default EnviarCorreoAlcalde
