import {
  RiKey2Line,
  RiShieldKeyholeLine,
} from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import useOtpVerification from "../../hook/Contraseña/useOtpVerification";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CodigOtp = () => {
  const { codigo, handleChangeCodigo, handleSubmitCodigo } =
    useOtpVerification();
  const navigate = useNavigate();

  // Configuración del Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Imágenes para el Slider
  const images = [
    "../../../../src/assets/imgcarousel/login1.jpg",
    "../../../../src/assets/imgcarousel/login2.jpg",
    "../../../../src/assets/imgcarousel/login3.jpg",
    "../../../../src/assets/imgcarousel/login4.jpg",
  ];

  return (
    <div
      className="flex flex-col items-center justify-center xl:min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("../../../../src/assets/img/fondologin.avif")',
      }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-gray-500 text-center mb-8">
        Bienvenido a <span className="text-gray-500 font-bold">SIM SAS</span>
      </h1>

      <div className="xl:flex items-center justify-center w-full">
  
        <div className="grid justify-center items-center py-16 xl:py-0 w-1/2 bg-opacity-70">
          <div className="rounded-md ml-2 border-t-4 border-t-[#66d2bb] border-transparent w-full p-10 bg-white/80">
            <section>
              <h1
                id="Form"
                className="text-3xl md:text-5xl font-semibold text-black xl:px-8 text-center mt-10"
              >
                Código de verificación{" "}
                <span className="text-primary font-semibold">(OTP)</span>
              </h1>
              <h2 className="text-sm md:text-xl font-semibold text-black xl:px-8 text-center mt-10 xl:mt-10">
                Ingresa el código de verificación que te hemos enviado a tu correo
              </h2>
              <form
                className="xl:p-8 mt-8 xl:mt-0"
                onSubmit={(e) => handleSubmitCodigo(e, navigate)}
              >
                <div className="text-center">
                  <div className="relative">
                    <input
                      type="text"
                      className="border border-gray-300 w-full px-4 py-2 pl-12 focus:outline-none focus:ring-1 focus:shadow-md focus:shadow-blue-400 text-black placeholder-black placeholder-opacity-70 transition-shadow duration-200 ease-in-out"
                      placeholder="Código"
                      value={codigo}
                      onChange={handleChangeCodigo}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <RiShieldKeyholeLine className="text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <Link
                    to="/olvidarcontraseña"
                    className="text-black hover:text-primary"
                  >
                    Enviar código nuevamente
                  </Link>
                </div>

                <div className="md:flex justify-center items-center">
                  <button
                    type="submit"
                    className="md:w-[60%] w-full mr-8 px-2 py-3 rounded-full mt-8 bg-black text-white hover:bg-gray-500 hover:shadow-xl hover:shadow-gray-500 hover:text-white transition duration-300 ease-in-out cursor-pointer flex justify-center"
                  >
                    <RiKey2Line className="mr-2 mt-1" />
                    Verificar Código
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>

      
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
      </div>
    </div>
  );
};

export default CodigOtp;
