import { useState, useEffect } from "react";
import {
  RiAdminLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiErrorWarningFill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";
import axios from "../Interceptores/Interceptor";

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
      const expirationTime = 3000000;
      const expirationDate = new Date().getTime() + expirationTime;

      window.localStorage.setItem("token", response.data.message);
      window.localStorage.setItem("role", response.data.role);
      localStorage.setItem("tokenExpiration", expirationDate);
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    "/assets/img/imgcarousel/carousel_login/login1.jpg",
    "/assets/img/imgcarousel/carousel_login/login2.jpg",
    "/assets/img/imgcarousel/carousel_login/login3.jpg",
    "/assets/img/imgcarousel/carousel_login/login4.jpg",
  ];

  return (
    <div
      className="flex flex-col items-center justify-center xl:min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("/assets/img/login/fondologin.avif")',
      }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-gray-500 text-center mt-10 xl:mt-0 xl:mb-10">
        Bienvenido a <span className="text-gray-500 font-bold">SIM SAS</span>
      </h1>

      <div className="xl:flex items-center justify-center w-full ">
        <div className="grid justify-center items-center  py-16 xl:py-0 xl:w-1/2 bg-opacity-70 ">
          <div className="rounded-md ml-2 border-t-4 border-t-[#66d2bb] border-transparent  w-full p-10 bg-white/80">
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
                className="text-3xl md:text-3xl font-semibold text-gray-500 xl:px-8 text-center mt-10 "
              >
                Iniciar Sesión
              </h1>
              <form onSubmit={handleLogin} className="xl:p-8 mt-8 xl:mt-0">
                <div className="text-center">
                  <div className="relative">
                    <input
                      type="email"
                      className="border border-gray-300 w-full px-4 py-2 pl-12 focus:outline-none focus:ring-1 focus:shadow-md focus:shadow-blue-400 text-black placeholder-black placeholder-opacity-70 transition-shadow duration-200 ease-in-out"
                      placeholder="Correo"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <RiAdminLine className="text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="border border-gray-300 w-full px-4 py-2 pl-12 focus:outline-none focus:ring-1 focus:shadow-md focus:shadow-blue-400 text-black placeholder-black placeholder-opacity-70 transition-shadow duration-200 ease-in-out"
                      placeholder="Contraseña"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {showPassword ? (
                        <RiEyeOffLine
                          className="text-gray-500 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <RiEyeLine
                          className="text-gray-500 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <RiLockPasswordLine className="text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className=" flex justify-between items-center pt-6">
                  <Link
                    to="/home"
                    className="relative inline-flex items-center justify-center gap-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white hover:bg-[#F5F5F5] h-9 rounded-md px-3 group"
                  >
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
                    className="text-sm xl:text-md text-black ml-8  hover:text-[#66d2bb]"
                  >
                    ¿Olvidaste la contraseña?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="text-center w-[100%] px-6 py-3 rounded-full mt-8 bg-black/80 text-white hover:bg-[#66d2bb] hover:shadow-xl hover:shadow-[#66d2bb] hover:text-white transition duration-300 ease-in-out cursor-pointer"
                >
                  Acceder
                </button>
              </form>
            </section>
          </div>
        </div>

        <div className="xl:w-[40%]  flex justify-center items-center py-4 xl:py-0">
          <Slider
            {...settings}
            className="w-[80%] h-[50%] rounded-xl xl:rounded-l-3xl"
          >
            {images.map((img, idx) => (
              <div key={idx}>
                <img
                  src={img}
                  alt={`slide-${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Login;
