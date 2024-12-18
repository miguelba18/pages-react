import { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import useAuthToken from "../Token/useAuthToken";

const useDeleteInquietudes = ({ id }) => {
  useDeleteInquietudes.propTypes = {
    id: PropTypes.number.isRequired
    
  };
  
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthToken();

  const handleClick = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta inquietud?"
    );
    
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      if (!token) {
        throw new Error("No hay token de autenticación.");
      }

      const response = await fetch(
        `http://localhost:8080/inquietud/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la inquietud.");
      }
      const data = await response.text();
      toast.success(data,{ autoClose: 1200 });
      setTimeout(() => {
        window.location.reload();
      }, 1700);
    } catch (error) {
      console.error("Error al eliminar el recordatorio:", error);
      toast.error("Error al eliminar la inquietud");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="flex mt-4 justify-center items-center gap-2 w-12 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "Eliminando..." : <RiDeleteBin6Fill />}
    </button>
  );
};

export default useDeleteInquietudes;
