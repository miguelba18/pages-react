
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const usePasswordReset = () => {
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const { state } = useLocation();
  const correo = state ? state.correo : null;

  const handleChangeContraseña = (e) => {
    setContraseña(e.target.value);
  };

  const handleChangeConfirmarContraseña = (e) => {
    setConfirmarContraseña(e.target.value);
  };

  const handleSubmitContraseña = async (e) => {
    e.preventDefault();
    if (contraseña !== confirmarContraseña) {
        toast.error("Las contraseñas no coinciden", { position: "top-center" });
      return;
    }

    try {
      await axios.post(`http://localhost:8080/forgot-password/change-password/${correo}`, {
        password: contraseña,
        repeatPassword: confirmarContraseña
      });
      toast.success("Contraseña cambiada exitosamente", { position: "top-center" });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
        toast.error("Error al cambiar la contraseña: ", { position: "top-center" });
    }
  };

  return { contraseña, confirmarContraseña, handleChangeContraseña, handleChangeConfirmarContraseña, handleSubmitContraseña };
};

export default usePasswordReset;
