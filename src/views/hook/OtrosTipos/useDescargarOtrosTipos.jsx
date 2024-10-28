import { toast } from "react-toastify";
import useAuthToken from "../Token/useAuthToken";
const useDescargarOtrosTipos = () => {
    const { token } = useAuthToken();

    const handleDownloadExcel = async (filtro,anio) => {
     
      let url = `http://localhost:8080/otrotipo/descargar-excel`;
      

     
      if (filtro) {
        url += `&filtro=${filtro}` ;
      }
      if (anio) {
        url += `?anio=${anio}`;
    }
    
    
        try {
          const response = await fetch(
            url,{
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(
              errorMessage || "No se pudo descargar el archivo Excel."
            );
          }
  
          const contentDisposition = response.headers.get("Content-Disposition");
          let fileName = "datos_otrotipo.xlsx";
  
          if (contentDisposition) {
            const matches = /filename="?([^"]+)"?/.exec(contentDisposition);
            if (matches && matches[1]) {
              fileName = matches[1];
            }
          }
  
          const blob = await response.blob();
          if (window.showSaveFilePicker) {
            const handle = await window.showSaveFilePicker({
              suggestedName: fileName,
              types: [
                {
                  description: "Excel files",
                  accept: {
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                      [".xlsx"],
                  },
                },
              ],
            });
            const writableStream = await handle.createWritable();
            await writableStream.write(blob);
            await writableStream.close();
            toast.success("El excel se ha descargado correctamente.");
          } else {
            const urlBlob = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = urlBlob;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(urlBlob);
            toast.success("El excel se ha descargado correctamente.");
          }
        } catch (error) {
          console.error("Error al descargar el archivo Excel:", error);
        }
      };
      
  return { handleDownloadExcel };
}

export default useDescargarOtrosTipos
