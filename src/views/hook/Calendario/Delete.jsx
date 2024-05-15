import { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import useAuthToken from "../Token/useAuthToken";

const useDeleteRecordatorio = ({ id, onDelete }) => {
  useDeleteRecordatorio.propTypes = {
    id: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
  
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthToken();

  const handleClick = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este recordatorio?"
    );
    
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      if (!token) {
        throw new Error("No hay token de autenticación.");
      }

      const response = await fetch(
        `http://localhost:8080/api/V1/recordatorio/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el registro.");
      }

      onDelete(id);
      toast.success("Recordatorio eliminado correctamente",{ autoClose: 1200 });
    } catch (error) {
      console.error("Error al eliminar el recordatorio:", error);
      toast.error("Error al eliminar el recordatorio");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="bg-red-100 hover:bg-red-400 hover:text-white transition-colors text-red-400 font-bold py-1 px-2 rounded"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "Eliminando..." : <RiDeleteBin5Fill />}
    </button>
  );
};

export default useDeleteRecordatorio;
