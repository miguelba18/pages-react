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
    <div className="  xl:flex items-center justify-center  ">
      <div className="grid justify-center items-center xl:min-h-screen py-16 xl:py-0 ">
        <div className="rounded-3xl  ml-2 px-10 ">
          <h1 className="text-3xl md:text-5xl font-light-700 text-black text-center mb-8 ">
            Bienvenido a{" "}
            <span className="text-[#FF432A] font-semibold">SIM SAS</span>
          </h1>
          <section>
            {error && (
              <Alert
                className=""
                icon={
                  <RiErrorWarningFill className="mt-3" fontSize="inherit" />
                }
                severity="error"
                variant="filled"
              >
                <AlertTitle>Error</AlertTitle>
                Usuario y Contraseña incorrectos
              </Alert>
            )}
            <h1
              id="Form"
              className="text-3xl md:text-5xl font-semibold text-blue-500 xl:px-8 text-center mt-10 xl:mt-20"
            >
              Iniciar Sesión
            </h1>
            <form onSubmit={handleLogin} className="xl:p-8 mt-8 xl:mt-0">
              <div className="text-center">
                <div className="relative">
                  <input
                    type="email"
                    className="border-b-2 border-black w-full  p-4 pl-12 focus:outline-none focus:border-[#FF432A] text-black placeholder-black placeholder-opacity-70"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <RiAdminLine className="text-[#FF432A]" />
                  </div>
                </div>
              </div>
              <div className="text-center mt-6 ">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border-b-2 border-black w-full  p-4 pl-12 focus:outline-none focus:border-blue-500 text-black placeholder-black placeholder-opacity-70"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {showPassword ? (
                      <RiEyeOffLine
                        className="text-blue-500 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <RiEyeLine
                        className="text-blue-500 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <RiLockPasswordLine className="text-blue-500" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <Link to="/home" className="relative inline-flex items-center justify-center gap-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white hover:bg-[#F5F5F5] h-9 rounded-md px-3 group">
                  <svg
                    className="lucide lucide-arrow-left"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="22"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                  </svg>
                  <span className="origin-left scale-0 transition-transform group-hover:scale-100">
                    Back{" "}
                  </span>
                </Link>
                <Link
                  to="/olvidarcontraseña"
                  className="text-sm xl:text-md text-black ml-8 md:ml-[55%]  hover:text-[#FF432A] "
                >
                  ¿Olvidaste la contraseña?
                </Link>
              </div>
              <button
                type="submit"
                className="text-center w-[100%] px-6 py-3 rounded-full mt-8 bg-black/80 text-white hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500 hover:text-white transition duration-300 ease-in-out cursor-pointer"
              >
                Acceder
              </button>
            </form>
          </section>
        </div>
      </div>
      <div className=" xl:min-h-screen  xl:w-[65%] relative flex justify-center py-4 xl:py-0 ">
        <img
          src="../../../src/assets/img/fondologin.png"
          className="xl:absolute inset-0 w-[50%] h-[50%] xl:w-full xl:h-full rounded-xl xl:rounded-l-3xl"
          alt="background"
        />
      </div>
    </div>
  );
};

export default Login;
