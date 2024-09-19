
import { toast } from "react-toastify";
import useAuthToken from "../../../../../Token/useAuthToken";
const useDescargarFacturas = () => {
    const { token } = useAuthToken();

    const handleDownloadExcel = async (ciudad,filtro, anio,tipo="emisores") => {
      const tipoString = typeof tipo === "string" ? tipo : "emisores";

      let url = "http://localhost:8080/factura/descargar-excel-persona-agrupar";

      if (filtro) {
        url += ciudad ? `&filtro=${filtro}` : `?filtro=${filtro}`;
      }
        if (anio) {
            url += ciudad ? `&anio=${anio}` : `?anio=${anio}`;
        }
        if (tipoString) {
          url += ciudad ? `&tipo=${tipoString}` : `?tipo=${tipoString}`;
        }
  
      try {
        const response = await fetch(url, {
          method: "POST", 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(
              errorMessage || "No se pudo descargar el archivo Excel."
            );
          }
    
          const blob = await response.blob();
          const contentDisposition = response.headers.get("Content-Disposition");
          const fileNameMatch = contentDisposition && contentDisposition.match(/filename="?([^"]+)"?/);
          const fileName = fileNameMatch ? fileNameMatch[1] : "datos_factura_emisor_agrupar.xlsx";

    
          
          if (window.showSaveFilePicker) {
            const handle = await window.showSaveFilePicker({
              suggestedName: fileName,
              types: [
                {
                  description: 'Excel files',
                  accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
                },
              ],
            });
            const writableStream = await handle.createWritable();
            await writableStream.write(blob);
            await writableStream.close();
            toast.success("El excel se ha descargado correctamente  .");
          } else {
            
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            toast.success("El excel se ha descargado correctamente .");
          }
        } catch (error) {
          console.error("Error al descargar el archivo Excel:", error);
          toast.error("Hubo un problema al descargar el archivo Excel.");
        }
      };
  return { handleDownloadExcel };
}

export default useDescargarFacturas
