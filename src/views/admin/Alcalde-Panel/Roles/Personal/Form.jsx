import { useState } from "react";
import axios from "axios";
import { Alert, AlertTitle } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { RiErrorWarningFill,RiEyeFill,RiEyeOffFill } from 'react-icons/ri';

const Form = () => {
    const initialState = {
        nombre: '',
        apellido: '',
        cedula: '',
        telefono: '',
        email: '',
        password: ''
        
      };

  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
        "http://localhost:8080/api/V1/auth/personal",
        formData,
        config
      );
      setFormData(initialState);
      setAlertSeverity('success');
      setAlertMessage(response.data.message);
      setOpen(true);
    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage(error.response.data.message);
      setOpen(true);
      console.error("Error al crear alcalde:", error.response.data.message)
    }
  };

  return (
    <div className="flex justify-center items-center  ">
      <div className=" md:p-10 xl:w-[50%] w-[100%]">
        <form onSubmit={handleSubmit} className=" shadow-xl py-10 bg-tertiary-100 px-[20%]">
        <img src="../../../../../../src/assets/img/img1.png" alt="" className="mb-0" />
          <h4 className="text-center text-2xl font-bold py-8">Registro de Personal Nuevo</h4>
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="apellido"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Apellido:
            </label>

            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cedula"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Cédula:
            </label>
            <input
              type="number"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="telefono"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Teléfono:
            </label>
            <input
              type="number"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Correo electrónico:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña:
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border-b px-2 border-black pr-8 text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
              required
            />
            <div className="absolute inset-y-0 mt-7 right-0 flex items-center pr-2">
                        {showPassword ? (
                          <RiEyeOffFill
                            className=" cursor-pointer"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <RiEyeFill
                            className=" cursor-pointer"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
          </div>

          <>
          <button
            type="submit"
            className="bg-green-500/80 hover:bg-green-500 transition-colors rounded-lg p-3 text-white"
          >
            Guardar Personal
          </button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{alertSeverity === 'success' ? 'Éxito' : 'Error'}</DialogTitle>
            <DialogContent>
              <Alert severity={alertSeverity}   icon={<RiErrorWarningFill />}>
                <AlertTitle>{alertSeverity === 'success' ? 'Éxito' : 'Error'}</AlertTitle>
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
