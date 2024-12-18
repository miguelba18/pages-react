import Compras from "./Compras";
import Ventas from "./Ventas";
import { useState } from "react";
const UnionesConsorcios = () => {
  
  const [selectedEmpresa, setSelectedEmpresa] = useState("compras");

  const handleEmpresaChange = (empresa) => {
    setSelectedEmpresa(empresa);

  };





  return (
    <div>
      <h1 className="font-bold text-3xl text-secundary">Compras y Ventas</h1>
      

      <div>
        <div className="mt-4" >
          <button
            onClick={() => handleEmpresaChange("compras")}
            className={`${
              selectedEmpresa === "compras"
                ? "bg-secundary text-white shadow-xl shadow-secundary"
                : "bg-white text-secundary"
            } px-4 py-2 rounded-l`}
          >
            Compras
          </button>
          <button
            onClick={() => handleEmpresaChange("ventas")}
            className={`${
              selectedEmpresa === "ventas"
                ? "bg-secundary text-white shadow-xl shadow-secundary"
                : "bg-white text-secundary"
            } px-4 py-2 rounded-r`}
          >
            Ventas
          </button>
        </div>
      </div>
      {selectedEmpresa === "compras" && <Compras />}
      {selectedEmpresa === "ventas" && <Ventas />}
    </div>
  );
};

export default UnionesConsorcios;
