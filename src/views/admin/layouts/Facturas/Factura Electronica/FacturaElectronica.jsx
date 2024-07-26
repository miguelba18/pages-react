import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  RiFilePdf2Line,
  RiFileExcel2Line,
  RiLoopRightLine,
  RiSave3Line,
} from "react-icons/ri";
import useAuthToken from "../../../../hook/Token/useAuthToken";

const FacturaElectronica = () => {
  const [pdfs, setPdfs] = useState([]);
  const { token } = useAuthToken();
  const [pdf, setPdf] = useState([]);

  const handleUploadPdfs = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type === "application/pdf");

    if (validFiles.length !== files.length) {
      toast.error("Por favor, selecciona solo archivos PDF.");
    }

    setPdfs(validFiles);
  };
  const handleUploadPdf = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type === "application/pdf");

    if (validFiles.length !== files.length) {
      toast.error("Por favor, selecciona solo archivos PDF.");
    }

    setPdf(validFiles);
  };

  const handleSavePdfs = async () => {
    if (pdfs.length === 0) {
      toast.error("Por favor, selecciona archivos PDF primero.");
      return;
    }

    if (!token) {
      toast.error(
        "No se encontró el token de autorización en el localStorage."
      );
      return;
    }

    const formData = new FormData();
    pdfs.forEach((pdf) => {
      formData.append(`archivosPdf`, pdf);
    });

    try {
      const response = await fetch(
        "http://localhost:8080/factura/extraer-y-guardar-pdf",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "No se pudo guardar los archivos PDF.");
      }
      setTimeout(() => {
              window.location.reload();
            }, 3000);
      toast.success(
        "Los archivos PDF se han guardado correctamente en la base de datos."
      );
      
    } catch (error) {
      console.error("Error al guardar los archivos PDF:", error);
      toast.error(error.message);
    }
  };

  const handleSubmitPdf = async (e) => {
    e.preventDefault();

    if (pdf.length === 0) {
      toast.error("Por favor, selecciona archivos PDF primero.");
      return;
    }

    if (!token) {
      toast.error(
        "No se encontró el token de autorización en el localStorage."
      );
      return;
    }

    const formData = new FormData();
    pdf.forEach((file) => {
      formData.append("archivoPdf", file);
    });

    try {
      const response = await fetch(
        "http://localhost:8080/factura/extraer-texto-pdf",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          errorMessage || "No se pudo procesar los archivos PDF."
        );
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      const fileNameMatch = contentDisposition && contentDisposition.match(/filename="?([^"]+)"?/);
      const fileName = fileNameMatch ? fileNameMatch[1] : "datos_factura.xlsx";

      
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
        toast.success("Los archivos PDF se han procesado correctamente y descargado.");
      } else {
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Los archivos PDF se han procesado correctamente y descargado.");
      }
    } catch (error) {
      console.error("Error al procesar los archivos PDF:", error);
      toast.error("Hubo un problema al procesar los archivos PDF.");
    }
  };

  const handleDownloadExcel = async () => {
    if (!token) {
      toast.error(
        "No se encontró el token de autorización en el localStorage."
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/factura/descargar-excel",
        {
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

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      const fileNameMatch = contentDisposition && contentDisposition.match(/filename="?([^"]+)"?/);
      const fileName = fileNameMatch ? fileNameMatch[1] : "datos_facturadb.xlsx";

      
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
        toast.success("Los archivos PDF se han procesado correctamente y descargado.");
      } else {
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Los archivos PDF se han procesado correctamente y descargado.");
      }
    } catch (error) {
      console.error("Error al descargar el archivo Excel:", error);
      toast.error("Hubo un problema al descargar el archivo Excel.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-secondary">
        Factura Electrónica
      </h1>

      <div className="xl:flex mt-8 xl:mt-0 xl:p-8">
        <div className="bg-tertiary-100 h-full xl:w-1/2 p-10 m-0 rounded-xl shadow-2xl">
          <h2 className="text-lg text-center font-semibold mb-2">
            Transforma tu factura electrónica (PDF) en un excel ordenado
          </h2>
          <div className="flex-col justify-center items-center">
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={handleUploadPdf}
              className="hidden"
            />
            <div className="flex justify-center items-center">
              <label
                htmlFor="pdf-upload"
                className="flex justify-center items-center gap-2 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
              >
                Seleccionar PDF{" "}
                <RiFilePdf2Line className=" text-white" />
              </label>
            </div>
            {pdf.length > 0 && (
              <div className="border mt-4 border-gray-30 p-4 md:p-2 text-[15px] rounded mb-4">
                <p className="text-center">Archivos PDF subidos:</p>
                <ul className="list-disc pl-5">
                  {pdf.map((pdf, index) => (
                    <li
                      key={index}
                      className="overflow-x-hidden text-center "
                      title={pdf.name}
                    >
                      <p className="break-words">{pdf.name}</p>
                    </li>
                  ))}
                </ul>
                <div className="md:flex justify-center mt-2">
                  <button
                    onClick={handleSubmitPdf}
                    className="bg-blue-500 my-2 md:my-0 w-[70%] justify-center hover:bg-blue-700 flex text-white font-bold py-1 px-4 rounded transition duration-300"
                  >
                    Procesar PDFs <RiLoopRightLine className="mt-1 ml-2" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-tertiary-100 h-full xl:w-1/2 p-10 m-6 rounded-xl shadow-2xl">
          <h2 className="text-lg text-center font-semibold mb-2">
            Guarda tu factura electrónica en la base de datos
          </h2>
          <div className="flex-col justify-center items-center">
            <input
              id="pdf-upload-save"
              type="file"
              accept=".pdf"
              multiple
              onChange={handleUploadPdfs}
              className="hidden"
            />
            <div className="flex justify-center items-center">
              <label
                htmlFor="pdf-upload-save"
                className="flex justify-center items-center gap-2 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
              >
                Seleccionar PDFs{" "}
                <RiFilePdf2Line className=" text-white" />
              </label>
            </div>
            {pdfs.length > 0 && (
              <div className="border mt-4 border-gray-300 p-4 md:p-2 text-[15px] rounded mb-4">
                <p className="text-center overflow-x-hidden">
                  Archivos PDF subidos:
                </p>
                <ul className="list-disc pl-5">
                  {pdfs.map((pdf, index) => (
                    <li
                      key={index}
                      className="overflow-x-hidden text-center"
                      title={pdf.name}
                    >
                      <p className="break-words">{pdf.name}</p>
                    </li>
                  ))}
                </ul>
                <div className="md:flex justify-center mt-2">
                  <button
                    onClick={handleSavePdfs}
                    className="bg-green-500 hover:bg-green-700 w-[70%] justify-center flex text-white font-bold py-1 px-4 rounded transition duration-300"
                  >
                    Guardar PDFs <RiSave3Line className="mt-1 ml-2" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        
      </div>
      <div className="bg-tertiary-100 h-full xl:w-1/2 p-10 m-6 rounded-xl shadow-2xl">
          <h2 className="text-lg text-center font-semibold mb-2">
            Descarga tus facturas electrónicas (Excel) que están guardadas
          </h2>
          <div className="md:flex justify-center mt-2">
            <button
              onClick={handleDownloadExcel}
              className="flex justify-center items-center gap-2 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
            >
              Descargar Excel <RiFileExcel2Line className="mt-1 ml-2" />
            </button>
          </div>
        </div>
        <ToastContainer />
    </div>
  );
};

export default FacturaElectronica;
