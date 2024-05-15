import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RiFilePdf2Line,
  RiFileExcel2Line,
  RiLoopRightLine,
  RiSave3Line,
} from "react-icons/ri";
import useAuthToken from "../../../hook/Token/useAuthToken";

const FacturaElectronica = () => {
  const [pdfs, setPdfs] = useState([]);
  const { token } = useAuthToken();
  const [pdf, setPdf] = useState([]);

  const handleUploadPdfs = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type === "application/pdf");

    if (validFiles.length !== files.length) {
      toast.error("Por favor, selecciona solo archivos PDF.");
    }

    setPdfs(validFiles);
  };
  const handleUploadPdf = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type === "application/pdf");

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
      toast.error("No se encontró el token de autorización en el localStorage.");
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

      toast.success("Los archivos PDF se han guardado correctamente en la base de datos.");
    } catch (error) {
      console.error("Error al guardar los archivos PDF:", error);
      toast.error(error.message);
    }
  };

  const handleSubmitPdf = async () => {
    if (pdf.length === 0) {
      toast.error("Por favor, selecciona archivos PDF primero.");
      return;
    }

    if (!token) {
      toast.error("No se encontró el token de autorización en el localStorage.");
      return;
    }

    const formData = new FormData();
    pdf.forEach((pdf) => {
      formData.append(`archivoPdf`, pdf);
    });

    try {
      const response = await fetch("http://localhost:8080/factura/extraer-texto-pdf", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "No se pudo procesar los archivos PDF.");
      }

      toast.success("Los archivos PDF se han procesado correctamentey descargado.");
    } catch (error) {
      console.error("Error al procesar los archivos PDF:", error);
      toast.error("Hubo un problema al procesar los archivos PDF.");
    }
  };

  const handleDownloadExcel = async () => {
    if (!token) {
      toast.error("No se encontró el token de autorización en el localStorage.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/factura/descargar-excel", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "No se pudo descargar el archivo Excel.");
      }

      toast.success("El archivo Excel se ha descargado correctamente.");
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

      <div className="xl:flex xl:p-8">
        <div className="bg-tertiary-100 h-full xl:w-1/2 p-10 m-6 rounded-xl shadow-2xl">
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
                className="bg-tertiary-900 px-4 flex py-2 rounded-md cursor-pointer border-red-400/70 border hover:bg-red-400/70 transition-colors hover:text-white"
              >
                Seleccionar PDFs <RiFilePdf2Line className="mt-1.5 ml-2 text-red-600" />
              </label>
            </div>
            {pdf.length > 0 && (
              <div className="border mt-4 border-gray-30 p-4 md:p-2 text-[15px] rounded mb-4">
                <p className="text-center">Archivos PDF subidos:</p>
                <ul className="list-disc pl-5">
                  {pdf.map((pdf, index) => (
                    <li key={index} className="overflow-x-hidden text-center" title={pdf.name}>
                      {pdf.name}
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
                className="bg-tertiary-900 px-4 flex py-2 rounded-md cursor-pointer border-red-400/70 border hover:bg-red-400/70 transition-colors hover:text-white"
              >
                Seleccionar PDFs <RiFilePdf2Line className="mt-1.5 ml-2 text-red-600" />
              </label>
            </div>
            {pdfs.length > 0 && (
              <div className="border mt-4 border-gray-300 p-4 md:p-2 text-[15px] rounded mb-4">
                <p className="text-center overflow-x-hidden">Archivos PDF subidos:</p>
                <ul className="list-disc pl-5">
                  {pdfs.map((pdf, index) => (
                    <li key={index} className="overflow-x-hidden text-center" title={pdf.name}>
                      {pdf.name}
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
        <div className="bg-tertiary-100 h-full xl:w-1/2 p-10 m-6 rounded-xl shadow-2xl">
          <h2 className="text-lg text-center font-semibold mb-2">
            Descarga tus facturas electrónicas (Excel) que están guardadas
          </h2>
          <div className="md:flex justify-center mt-2">
                  <button
                    onClick={handleDownloadExcel}
                    className="bg-yellow-500 hover:bg-yellow-700 w-[80%] justify-center flex text-white font-bold py-1 px-4 rounded transition duration-300"
                  >
                    Descargar Excel <RiFileExcel2Line className="mt-1 ml-2" />
                  </button>
                </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default FacturaElectronica;
