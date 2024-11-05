import ComprasOtroTipo from "./ComprasOtroTipo";
import VentasOtroTipo from "./VentasOtroTipo";
import { useState } from "react";
const UnionesConsorcios = () => {
  
  const [selectedEmpresa, setSelectedEmpresa] = useState("comprasotrotipo");

  const handleEmpresaChange = (empresa) => {
    setSelectedEmpresa(empresa);

  };





  return (
    <div>
      <h1 className="font-bold text-3xl text-secundary">Compras y Ventas</h1>
      

      <div>
        <div className="mt-4" >
          <button
            onClick={() => handleEmpresaChange("comprasotrotipo")}
            className={`${
              selectedEmpresa === "comprasotrotipo"
                ? "bg-secundary text-white shadow-xl shadow-secundary"
                : "bg-white text-secundary"
            } px-4 py-2 rounded-l`}
          >
            Compras
          </button>
          <button
            onClick={() => handleEmpresaChange("ventasotrotipo")}
            className={`${
              selectedEmpresa === "ventasotrotipo"
                ? "bg-secundary text-white shadow-xl shadow-secundary"
                : "bg-white text-secundary"
            } px-4 py-2 rounded-r`}
          >
            Ventas
          </button>
        </div>
      </div>
      {selectedEmpresa === "comprasotrotipo" && <ComprasOtroTipo />}
      {selectedEmpresa === "ventasotrotipo" && <VentasOtroTipo />}
    </div>
  );
};

export default UnionesConsorcios;
