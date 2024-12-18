import {
  RiKey2Line,
  RiMailLine,
  RiLoader4Line,
  RiShieldUserLine,
} from "react-icons/ri";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import useForgotPassword from "../../hook/Contraseña/useForgotPassword";

const OlvidarContraseña = () => {
  const { correo, isLoading, handleChangeCorreo, handleSubmitCorreo } =
    useForgotPassword();

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
      <h1 className="text-3xl md:text-5xl font-bold text-gray-500 text-center mb-8">
        Bienvenido a <span className="text-gray-500 font-bold">SIM SAS</span>
      </h1>

      <div className="xl:flex items-center justify-center w-full">
      <div className="xl:w-[40%] flex justify-center items-center py-4 xl:py-0">
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
        <div className="grid justify-center items-center py-16 xl:py-0 w-1/2 bg-opacity-70">
          <div className="rounded-md ml-2 border-t-4 border-t-[#66d2bb] border-transparent w-full p-10 bg-white/80">
            <section>
              <h1
                id="Form"
                className="text-3xl md:text-3xl font-semibold text-gray-500 xl:px-8 text-center mt-10"
              >
                Restablece la Contraseña
              </h1>
              <h2 className="text-sm md:text-xl font-semibold text-black xl:px-8 text-center mt-10">
                Ingresa tu correo para restablecer la contraseña, solo se admite{" "}
                <span className="text-gray-500">(@gmail.com)</span>
              </h2>

              {isLoading ? (
                <div className="flex justify-center">
                  <RiLoader4Line className="text-black animate-spin text-4xl mt-6" />
                  <p className="text-black mt-8">Enviando código...</p>
                </div>
              ) : (
                <form
                  className="xl:p-8 mt-8 xl:mt-0"
                  onSubmit={handleSubmitCorreo}
                >
                  <div className="text-center">
                    <div className="relative">
                      <input
                        type="email"
                        className="border border-gray-300 w-full px-4 py-2 pl-12 focus:outline-none focus:ring-1 focus:shadow-md focus:shadow-blue-400 text-black placeholder-black placeholder-opacity-70 transition-shadow duration-200 ease-in-out"
                        placeholder="Correo"
                        value={correo}
                        onChange={handleChangeCorreo}
                        required
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <RiMailLine className="text-gray-500" />
                      </div>
                    </div>
                  </div>

                  <div className="px-8 flex justify-center space-x-4">
                    <button
                      type="submit"
                      className="w-1/2 py-3 rounded-full mt-8 bg-primary text-xl text-white hover:shadow-xl hover:shadow-primary transition duration-300 ease-in-out cursor-pointer flex justify-center"
                    >
                      <RiKey2Line className="mr-2 mt-1" />
                      Enviar Código
                    </button>
                    <Link
                      to="/login"
                      className="w-1/2 px-2 py-3 rounded-full mt-8 bg-gray-500 text-xl hover:shadow-xl hover:shadow-gray-500 text-white transition duration-300 ease-in-out cursor-pointer flex justify-center"
                    >
                      <RiShieldUserLine className="mr-2 mt-1" />
                      Iniciar Sesión
                    </Link>
                  </div>
                </form>
              )}
            </section>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default OlvidarContraseña;
