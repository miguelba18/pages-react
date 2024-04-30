import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiFilePdf2Line,RiFileCodeLine, RiLoopRightLine, RiSave3Line } from "react-icons/ri";

const FacturaElectronica = () => {
  const [pdf, setPdf] = useState(null);

  const handleUploadPdf = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      toast.error("Por favor, selecciona un archivo PDF.");
      return;
    }
    setPdf(file);
  };
  const handleSavePdf = async () => {
    if (!pdf) {
      toast.error("Por favor, selecciona un archivo PDF primero.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No se encontró el token de autorización en el localStorage.");
      return;
    }

    const formData = new FormData();
    formData.append("archivoPdf", pdf);

    try {
      const response = await fetch("http://localhost:8080/extraer-y-guardar-pdf", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("No se pudo guardar el archivo PDF.");
      }

      toast.success("El archivo PDF se ha guardado correctamente en la base de datos.");
    } catch (error) {
      console.error("Error al guardar el archivo PDF:", error);
      toast.error("Hubo un problema al guardar el archivo PDF.");
    }
  };

  const handleSubmitPdf = async () => {
    if (!pdf) {
      toast.error("Por favor, selecciona un archivo PDF primero.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No se encontró el token de autorización en el localStorage.");
      return;
    }

    const formData = new FormData();
    formData.append("archivoPdf", pdf);

    try {
      const response = await fetch("http://localhost:8080/extraer-texto-pdf", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("No se pudo procesar el archivo PDF.");
      }

      toast.success("El archivo PDF se ha procesado correctamente.");
    } catch (error) {
      console.error("Error al procesar el archivo PDF:", error);
      toast.error("Hubo un problema al procesar el archivo PDF.");
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-medium text-secondary">Factura Electrónica</h1>

      <div className="flex p-8">
        <div className="bg-tertiary-100 h-full w-1/2 p-10 m-6 rounded-xl shadow-2xl">
          <h2 className="text-lg text-center font-semibold mb-2">
            Transofrma tu factura electronica (PDF) en un excel ordenado
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
                Seleccionar PDF{" "}
                <RiFilePdf2Line className="mt-1.5 ml-2 text-red-600" />
              </label>
            </div>
            {pdf && (
              <div className="border mt-4 border-gray-300 p-2 text-[15px] rounded mb-4">
                <p className="text-center">Archivo PDF subido: {pdf.name}</p>
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmitPdf}
                    className="bg-blue-500 hover:bg-blue-700 mr-6 flex text-white font-bold py-1 px-4 rounded transition duration-300"
                  >
                    Procesar PDF <RiLoopRightLine className="mt-1 ml-2" />
                  </button>
                  <button
                    onClick={handleSavePdf}
                    className="bg-green-500 hover:bg-green-700  flex text-white font-bold py-1 px-4 rounded transition duration-300"
                  >
                    Guardar PDF <RiSave3Line className="mt-1 ml-2" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      
      <div className="bg-tertiary-100 h-full w-1/2 p-10 m-6 rounded-xl shadow-2xl ">
          <h2 className="text-xl text-center font-semibold mb-8">Transforma tu archivo xml en un excel ordenado</h2>
          <div className="flex-col justify-center items-center">
        <div className="flex justify-center items-center">
      <label
        htmlFor="xml-upload"
        className="bg-tertiary-900 flex px-4 py-2 rounded-md cursor-pointer border-orange-500/50 border hover:bg-orange-500/50 transition-colors hover:text-white"
      >
        Seleccionar archivo XML <RiFileCodeLine className="mt-1 ml-2 text-orange-600" />
      </label></div>
      <input
        id="xml-upload"
        type="file"
        accept=".xml"
        
        className="hidden"
      />
      
        <div className="border border-gray-300 mt-4 p-2 text-[15px] rounded mb-4">
          <p>Archivo XML subido: </p>
        </div>
      
      </div>
      </div>
      <ToastContainer />
      </div>
    </div>
  );
};

export default FacturaElectronica;
