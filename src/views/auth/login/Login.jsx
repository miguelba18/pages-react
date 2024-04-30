import { useState, useEffect } from "react";
import {
  RiAdminLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiErrorWarningFill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      navigate("/"); 
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/V1/auth/login",
        {
          email: email,
          password: password,
        }
      );
      window.localStorage.setItem("token", response.data.message);
      window.localStorage.setItem("role", response.data.role); 
      setEmail("");
      setPassword("");
      setError("");
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="padre">
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 flex items-center justify-center">
        <div className="xl:flex p-6 xl:p-10 relative justify-center">
          <div className="w-[90%] xl:w-[40%] xl:h-[60%] py-[10px] ml-2 xl:px-[10px] ">
            <h1 className="text-3xl md:text-5xl font-light-700 text-white text-center mb-8 ">
              Bienvenido al Sistema de Impuestos Municipal
            </h1>
            <section>
              {error && (
                <Alert
                  className=""
                  icon={<RiErrorWarningFill className="mt-3" fontSize="inherit" />}
                  severity="error"
                  variant="filled"
                >
                  <AlertTitle>Error</AlertTitle>
                  Usuario y Contraseña incorrectos
                </Alert>
              )}
              <h1
                id="Form"
                className="text-3xl md:text-5xl font-semibold text-white xl:px-8 text-center mt-10 xl:mt-20"
              >
                Iniciar Sesión
              </h1>
              <form onSubmit={handleLogin} className="xl:p-8 mt-8 xl:mt-0">
                <div className="text-center">
                  <div className="relative">
                    <input
                      type="email"
                      className="rounded-full h-[50px] w-[100%] p-4 pl-12 bg-gray-500 bg-opacity-40 text-white placeholder-white placeholder-opacity-70"
                      placeholder="CORREO"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <RiAdminLine className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-6 ">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="rounded-full h-[50px] w-[100%] p-4 pl-12 pr-10 bg-gray-500 bg-opacity-40 text-white placeholder-white placeholder-opacity-70"
                      placeholder="CONTRASEÑA"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {showPassword ? (
                        <RiEyeOffLine
                          className="text-white cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <RiEyeLine
                          className="text-white cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <RiLockPasswordLine className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  
                  <Link 
                    to="/olvidarcontraseña"
                    className="text-sm xl:text-md text-white ml-8 md:ml-[55%] xl:ml-[40%] hover:text-[#344e788f] "
                  >
                    ¿Olvidaste la contraseña?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="text-center w-[100%] px-6 py-3 rounded-full mt-8 bg-white text-[#716c66] hover:bg-[#307ef8] hover:text-white transition duration-300 ease-in-out cursor-pointer"
                >
                  Acceder
                </button>
              </form>
            </section>
          </div>
          <img
            src="../../../src/assets/img/fondo-login.png"
            className="xl:w-[40%] xl:h-[30%] w-[70%] ml-[15%] "
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Login;
