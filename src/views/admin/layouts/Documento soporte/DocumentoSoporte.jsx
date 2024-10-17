import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiFilePdf2Line, RiSave3Line } from "react-icons/ri";
import useAuthToken from "../../../hook/Token/useAuthToken";
const DocumentoSoporte = () => {
  
  const [pdfs, setPdfs] = useState([]);
  const { token } = useAuthToken();

  const handleUploadPdfs = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type === "application/pdf");

    if (validFiles.length !== files.length) {
      toast.error("Por favor, selecciona solo archivos PDF.");
    }

    setPdfs(validFiles);
  };

  const handleSavePdfs = async (tipo="soporte") => {
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
      const tipoString = typeof tipo === 'string' ? tipo : "soporte";
      let url = `http://localhost:8080/pdf/extraer-y-guardar`;
        const params = new URLSearchParams();
        if (tipo) {
          params.append("tipo", tipoString);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }
      const response = await fetch(url,{
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

    if (!response.ok) {

      if (result.errorTipo && result.errorTipo.length > 0) {
        throw new Error(result.errorTipo.join(", "));
      } else {
        throw new Error("Error al guardar los archivos PDF.");
      }
    }


    if (result.errorTipo && result.errorTipo.length > 0) {
      toast.error(result.errorTipo.join(", "));
      return;
    }
      
      toast.success(
        "Los archivos PDF se han guardado correctamente en la base de datos."
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error al guardar los archivos PDF:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <div className=" mb-10">
        
      <h1 className="font-bold text-3xl text-secundary">
          Agregar Documentos soporte
        </h1>
          
        
        <div className="xl:w-1/2 xl:flex mt-8 xl:mt-0 xl:p-4 justify-center">
          <div className="bg-tertiary-100 h-full xl:w-full p-10  rounded-xl shadow-2xl shadow-secundary">
            <h2 className="text-lg text-center font-semibold mb-2">
              Guarda tu documento soporte en la base de datos
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
                  Seleccionar PDFs <RiFilePdf2Line className=" text-white" />
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
                      className="flex justify-center items-center gap-2 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
                    >
                      Guardar PDFs <RiSave3Line className="mt-1 ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default DocumentoSoporte;
