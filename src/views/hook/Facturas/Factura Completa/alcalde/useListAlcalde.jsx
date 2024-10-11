import useAuthToken from "../../../Token/useAuthToken";
import {  useState, useCallback } from "react";

const useListAlcalde = () => {
  const { token } = useAuthToken();
  const [facturas, setFacturas] = useState([]);
  const [totalSuma, setTotalSuma] = useState(0);

  const fetchFacturas = useCallback(
    async (query, anio, codigoUnico,nombreComercialEmisor, nitEmisor, departamentoEmisor,municipioEmisor,direccionEmisor,correoEmisor,telefonoEmisor,nombreAdquiriente,numeroDocumentoAdquiriente,departamentoAdquiriente,municipioAdquiriente,direccionAdquiriente,correoAdquiriente,telefonoAdquiriente ) => { 
      try {
        let url = `http://localhost:8080/factura/listar`;
        const params = new URLSearchParams();

        if (query) {
          params.append("filtro", query);
        }
        if (anio) {
          params.append("anio", anio);
        }
        if (codigoUnico) {  
          params.append("codigoUnico", codigoUnico);
        } 
        if (nombreComercialEmisor) {  
          params.append("nombreComercialEmisor", nombreComercialEmisor); 
        }
        if (nitEmisor) {
          params.append("nitEmisor", nitEmisor);
        }
        if(departamentoEmisor){
          params.append("departamentoEmisor", departamentoEmisor);
        }
        if(municipioEmisor){
          params.append("municipioEmisor", municipioEmisor);
        }
        if(direccionEmisor){
          params.append("direccionEmisor", direccionEmisor);
        }
        if(correoEmisor){
          params.append("correoEmisor", correoEmisor);
        }
        if(telefonoEmisor){
          params.append("telefonoEmisor", telefonoEmisor);
        }
        if(nombreAdquiriente){
          params.append("nombreAdquiriente", nombreAdquiriente);
        }
        if(numeroDocumentoAdquiriente){
          params.append("numeroDocumentoAdquiriente", numeroDocumentoAdquiriente);
        }
        if(departamentoAdquiriente){
          params.append("departamentoAdquiriente", departamentoAdquiriente);
        }
        if(municipioAdquiriente){
          params.append("municipioAdquiriente", municipioAdquiriente);
        }
        if(direccionAdquiriente){
          params.append("direccionAdquiriente", direccionAdquiriente);
        }
        if(correoAdquiriente){
          params.append("correoAdquiriente", correoAdquiriente);
        }
        if(telefonoAdquiriente){
          params.append("telefonoAdquiriente", telefonoAdquiriente);
        }



        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las facturas");
        }

        const data = await response.json();
        setFacturas(data.facturas);
        setTotalSuma(data.totalSuma);
      } catch (error) {
        console.error(error);
        setFacturas([]);
      }
    },
    [token]
  );

  return { facturas, fetchFacturas, totalSuma, setFacturas };
};

export default useListAlcalde;
