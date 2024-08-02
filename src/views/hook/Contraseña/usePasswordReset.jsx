
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const usePasswordReset = () => {
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const { state } = useLocation();
  const correo = state ? state.correo : null;

  const [validations, setValidations] = useState({
    length: false,
    number: false,
    uppercase: false,
    symbol: false,
  });

  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const numberValid = /[0-9]/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    const symbolValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setValidations({
      length: lengthValid,
      number: numberValid,
      uppercase: uppercaseValid,
      symbol: symbolValid,
    });
  };

  const handleChangeContraseña = (e) => {
    const newPassword = e.target.value;
    setContraseña(newPassword);
    validatePassword(newPassword);
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

    if (!validations.length ||!validations.number ||!validations.uppercase ||!validations.symbol) {
      toast.error("La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un símbolo", { position: "top-center" });
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

  return {contraseña, confirmarContraseña, handleChangeContraseña, handleChangeConfirmarContraseña, handleSubmitContraseña, validations };
};

export default usePasswordReset;
