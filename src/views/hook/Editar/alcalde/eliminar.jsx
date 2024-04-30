import { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

const EliminarAlcalde = ({ id, onDelete }) => {

  EliminarAlcalde.propTypes = {
    id: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
  }
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este alcalde?"
    );
    
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token de autenticación.");
      }

      const response = await fetch(
        `http://localhost:8080/api/V1/usuario/admin/${id}`,
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
      toast.success("Alcalde eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      toast.error("Error al eliminar el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "Eliminando..." : <RiDeleteBin5Fill />}
    </button>
  );
};

export default EliminarAlcalde;
