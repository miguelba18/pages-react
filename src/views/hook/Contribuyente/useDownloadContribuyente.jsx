import useAuthToken from "../Token/useAuthToken";
import { toast } from "react-toastify";

const useDownloadContribuyente = () => {
  const { token } = useAuthToken();

  const handleDownloadExcel = async (filters) => {
    if (!token) {
      toast.error("No se encontró el token de autorización en el localStorage.");
      return;
    }

    try {
     
      const queryString = Object.keys(filters)
        .filter((key) => filters[key] && filters[key].length > 0) 
        .map((key) => {
          const value = Array.isArray(filters[key])
            ? filters[key].map((item) => encodeURIComponent(item)).join("&" + key + "=") 
            : encodeURIComponent(filters[key]); 
          return `${encodeURIComponent(key)}=${value}`;
        })
        .join("&");

      const response = await fetch(
        `http://localhost:8080/contribuyente/descargar-excel?${queryString}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "No se pudo descargar el archivo Excel.");
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      const fileNameMatch =
        contentDisposition && contentDisposition.match(/filename="?([^"]+)"?/);
      const fileName = fileNameMatch ? fileNameMatch[1] : "datos_contribuyentes.xlsx";

      if (window.showSaveFilePicker) {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "Excel files",
              accept: {
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
              },
            },
          ],
        });
        const writableStream = await handle.createWritable();
        await writableStream.write(blob);
        await writableStream.close();
        toast.success("El excel se ha descargado correctamente.");
      } else {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success("El excel se ha descargado correctamente.");
      }
    } catch (error) {
      console.error("Error al descargar el archivo Excel:", error);
      toast.error("Hubo un problema al descargar el archivo Excel.");
    }
  };

  return { handleDownloadExcel };
};

export default useDownloadContribuyente;
