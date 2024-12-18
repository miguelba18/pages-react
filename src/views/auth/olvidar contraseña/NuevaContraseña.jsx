import {
  RiLockPasswordLine,
  RiKey2Line,
  RiCheckFill,
  RiCloseFill,
} from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import usePasswordReset from "../../hook/Contraseña/usePasswordReset";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NuevaContraseña = () => {
  const {
    contraseña,
    confirmarContraseña,
    handleChangeContraseña,
    handleChangeConfirmarContraseña,
    handleSubmitContraseña,
    validations,
  } = usePasswordReset();

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
                className="text-3xl md:text-5xl font-semibold text-black xl:px-8 text-center mt-10"
              >
                Ingresa tu nueva{" "}
                <span className="text-primary">contraseña</span>
              </h1>
              <h2 className="text-sm md:text-xl font-semibold text-black xl:px-8 text-center mt-10">
                Ingresa una nueva contraseña para tu cuenta
              </h2>
              <form
                className="xl:p-8 mt-8 xl:mt-0"
                onSubmit={handleSubmitContraseña}
              >
                <div className="text-center mb-4">
                  <div className="relative">
                    <input
                      type="password"
                      className="border border-gray-300 w-full px-4 py-2 pl-12 focus:outline-none focus:ring-1 focus:shadow-md focus:shadow-blue-400 text-black placeholder-black placeholder-opacity-70 transition-shadow duration-200 ease-in-out"
                      placeholder="Nueva contraseña"
                      value={contraseña}
                      onChange={handleChangeContraseña}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <RiLockPasswordLine className="text-gray-500" />
                    </div>
                  </div>
                  <div className="text-left mt-2">
                    <p className="flex items-center">
                      {validations.length ? (
                        <RiCheckFill className="mr-2 text-green-600" />
                      ) : (
                        <RiCloseFill className="mr-2 text-orange-500" />
                      )}
                      <p
                        style={{
                          color: validations.length ? "green" : "red",
                        }}
                      >
                        {validations.length
                          ? "Caracteres completados"
                          : "Debe contener al menos 8 caracteres"}
                      </p>
                    </p>
                    <p className="flex items-center">
                      {validations.number ? (
                        <RiCheckFill className="mr-2 text-green-600" />
                      ) : (
                        <RiCloseFill className="mr-2 text-orange-500" />
                      )}
                      <p
                        style={{
                          color: validations.number ? "green" : "red",
                        }}
                      >
                        {validations.number
                          ? "Contiene un número"
                          : "Debe contener al menos un número"}
                      </p>
                    </p>
                    <p className="flex items-center">
                      {validations.uppercase ? (
                        <RiCheckFill className="mr-2 text-green-600" />
                      ) : (
                        <RiCloseFill className="mr-2 text-orange-500" />
                      )}
                      <p
                        style={{
                          color: validations.uppercase ? "green" : "red",
                        }}
                      >
                        {validations.uppercase
                          ? "Contiene una mayúscula"
                          : "Debe contener al menos una letra mayúscula"}
                      </p>
                    </p>
                    <p className="flex items-center">
                      {validations.symbol ? (
                        <RiCheckFill className="mr-2 text-green-600" />
                      ) : (
                        <RiCloseFill className="mr-2 text-orange-500" />
                      )}
                      <p
                        style={{
                          color: validations.symbol ? "green" : "red",
                        }}
                      >
                        {validations.symbol
                          ? "Contiene un símbolo"
                          : "Debe contener al menos un símbolo"}
                      </p>
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="relative">
                    <input
                      type="password"
                      className="border border-gray-300 w-full px-4 py-2 pl-12 focus:outline-none focus:ring-1 focus:shadow-md focus:shadow-blue-400 text-black placeholder-black placeholder-opacity-70 transition-shadow duration-200 ease-in-out"
                      placeholder="Confirmar contraseña"
                      value={confirmarContraseña}
                      onChange={handleChangeConfirmarContraseña}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <RiLockPasswordLine className="text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="md:flex justify-center items-center">
                  <button
                    type="submit"
                    className="md:w-[60%] w-full mr-8 px-2 py-3 rounded-full mt-8 bg-primary text-white hover:shadow-xl hover:shadow-primary transition duration-300 ease-in-out cursor-pointer flex justify-center"
                  >
                    <RiKey2Line className="mr-2 mt-1" />
                    Restablecer contraseña
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>

      
        
      </div>
    </div>
  );
};

export default NuevaContraseña;
