
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useOtpVerification = () => {
  const [codigo, setCodigo] = useState("");
  const { state } = useLocation();
  const correo = state ? state.correo : null;

  const handleChangeCodigo = (e) => {
    setCodigo(e.target.value.replace(/\D/g, ""));
  };

  const handleSubmitCodigo = async (e, navigate) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/forgot-password/verificar-otp/${codigo}/${correo}`);
      toast.success("Codigo verificado exitosamente", { position: "top-center" });
      navigate("/nuevacontraseña", { state: { codigo, correo } });
    } catch (error) {
      toast.error("Error al verificar el código OTP: Codigo incorrecto o expirado", { position: "top-center" });
    }
  };

  return { codigo, handleChangeCodigo, handleSubmitCodigo };
};

export default useOtpVerification;
