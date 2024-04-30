import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useForgotPassword = () => {
  const [correo, setCorreo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeCorreo = (e) => {
    setCorreo(e.target.value);
  };

  const handleSubmitCorreo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/password-olvidada/verificar-mail/${correo}`
      );
      toast.success("Codigo enviado a tu correo exitosamente", {
        position: "top-center",
      });
      navigate("/codigo", { state: { correo: correo } });
    } catch (error) {
      toast.error("Error al enviar el codigo: Correo no encontrado ", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { correo, isLoading, handleChangeCorreo, handleSubmitCorreo };
};

export default useForgotPassword;
