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
        throw new Error("Error al eliminar el Alcalde.");
      }

      onDelete(id);
      toast.success("Alcalde eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el Alcalde:", error);
      toast.error("Error al eliminar el Alcalde");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
    className="flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "Eliminando..." : <RiDeleteBin5Fill className="" />}
    </button>
  );
};

export default EliminarAlcalde;
