import { useState } from "react";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { RiErrorWarningFill, RiEyeOffFill, RiEyeFill } from "react-icons/ri";

const Form = () => {
  const initialState = {
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    email: "",
    password: "",
  };

  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [celular, setCelular] = useState("");
  const [cedula, setCedula] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "telefono") {
      const phoneNumber = value.replace(/\D/g, "");
      if (phoneNumber.length <= 10) {
        setFormData({
          ...formData,
          [name]: phoneNumber,
        });
        setCelular(phoneNumber);
      }
    } else if (name === "cedula") {
      const cleanedValue = value.replace(/\D/g, "");
      if (cleanedValue.length <= 10) { 
      setFormData({
        ...formData,
        [name]: cleanedValue,
      });
      setCedula(cleanedValue);
    }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/V1/auth/secretario",
        formData,
        config
      );
      setFormData(initialState);
      setAlertSeverity("success");
      setAlertMessage(response.data.message);
      setOpen(true);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage(error.response.data.message);
      setOpen(true);
      console.error("Error al crear alcalde:", error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center  ">
      <div className=" md:p-10 xl:w-[50%] w-[100%]">
        <form
          onSubmit={handleSubmit}
          className=" shadow-2xl shadow-secundary rounded-2xl py-10 bg-tertiary-100 px-[20%]"
        >
          <div className="flex justify-center">
            <img
              src="/assets/img/dashboard/fondo-login.png"
              alt=""
              className="mb-0 rounded-2xl w-[60%] h-1/2"
            />
          </div>
          <h4 className="text-center text-primary text-2xl font-bold py-8">
            Registro de Secretario Nuevo
          </h4>
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-secundary text-sm font-bold mb-2"
            >
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-secundary  placeholder-black placeholder-opacity-70"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="apellido"
              className="block text-secundary text-sm font-bold mb-2"
            >
              Apellido:
            </label>

            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-secundary  placeholder-black placeholder-opacity-70"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cedula"
              className="block text-secundary text-sm font-bold mb-2"
            >
              Cédula:
            </label>
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-secundary  placeholder-black placeholder-opacity-70"
              required
            />
            <div className="grid justify-end text-secundary">{cedula.length}/10</div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="telefono"
              className="block text-secundary text-sm font-bold mb-2"
            >
              Teléfono:
            </label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-secundary  placeholder-black placeholder-opacity-70"
              required
            />
            <div className="grid justify-end text-secundary">{celular.length}/10</div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-secundary text-sm font-bold mb-2"
            >
              Correo electrónico:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-secundary  placeholder-black placeholder-opacity-70"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-secundary text-sm font-bold mb-2"
            >
              Contraseña:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-secundary  placeholder-black placeholder-opacity-70"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                {showPassword ? (
                  <RiEyeOffFill
                    className=" cursor-pointer text-secundary"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <RiEyeFill
                    className=" cursor-pointer text-secundary"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
          </div>
          <>
            <button
              type="submit"
              className="flex justify-center items-center gap-2 px-3 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#71fbed] via-[#1de1d4] to-[#12bebe] hover:shadow-xl hover:shadow-primary hover:scale-105 duration-300 hover:from-[#12bebe] hover:to-[#71f9fb]"
            >
              Guardar Secretario
            </button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {alertSeverity === "success" ? "Éxito" : "Error"}
              </DialogTitle>
              <DialogContent>
                <Alert severity={alertSeverity} icon={<RiErrorWarningFill />}>
                  <AlertTitle>
                    {alertSeverity === "success" ? "Éxito" : "Error"}
                  </AlertTitle>
                  {alertMessage}
                </Alert>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
              </DialogActions>
            </Dialog>
          </>
        </form>
      </div>
    </div>
  );
};

export default Form;
