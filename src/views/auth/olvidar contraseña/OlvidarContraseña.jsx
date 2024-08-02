import {
  RiKey2Line,
  RiMailLine,
  RiLoader4Line,
  RiShieldUserLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import useForgotPassword from "../../hook/Contraseña/useForgotPassword";

const OlvidarContraseña = () => {
  const { correo, isLoading, handleChangeCorreo, handleSubmitCorreo } =
    useForgotPassword();

  return (
    <div className="   xl:flex items-center justify-center  ">

<div className=" xl:min-h-screen xl:w-[70%] relative flex justify-center py-4 xl:py-0 ">
  <img
    src="../../../src/assets/img/fondologin.png"
    className="xl:absolute inset-0 w-[50%] h-[50%] xl:w-full xl:h-full rounded-xl xl:rounded-r-3xl"
    alt="background"
  />
</div>


      <div className="  grid justify-center items-center   xl:min-h-screen">
        <div className="   rounded-3xl py-[10px] ml-2 px-10 ">
         
          <section>
            <h1
              id="Form"
              className="text-3xl md:text-5xl font-semibold text-blue-500 xl:px-8 text-center mt-10 xl:mt-15"
            >
              Restablece la contraseña
            </h1>
            <h2 className="text-sm md:text-xl font-semibold text-black xl:px-8 text-center mt-10 xl:mt-10">
              Ingresa tu correo para restablecer la contraseña, solo se admite
              <span className="text-[#FF432A]">(@gmail.com)</span>
            </h2>
            {isLoading ? (
              <div className="flex justify-center">
                <RiLoader4Line className="text-black animate-spin text-4xl mt-6" />
                <p className="text-black mt-8 ">Enviando código...</p>
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
                      className="  border-b-2 border-black w-full  p-4 pl-12 focus:outline-none focus:border-blue-500 text-black placeholder-black placeholder-opacity-70"
                      placeholder="Ingresa tu Correo"
                      value={correo}
                      onChange={handleChangeCorreo}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <RiMailLine className="text-black ml-2 " />
                    </div>
                  </div>
                </div>

                <div className="px-8">
                  <button
                    type="submit"
                    className=" w-full py-3 rounded-full mt-8 bg-[#FF432A] text-xl text-white hover:shadow-xl hover:shadow-[#FF432A] transition duration-300 ease-in-out cursor-pointer flex justify-center"
                  >
                    <RiKey2Line className="mr-2 mt-1" />
                    Enviar Codigo
                  </button>
                  <Link
                    to="/login"
                    className=" w-full mr-8 px-2 py-3 rounded-full mt-8 bg-blue-500 text-xl hover:shadow-xl hover:shadow-blue-500 text-white transition duration-300 ease-in-out cursor-pointer flex justify-center"
                  >
                    <RiShieldUserLine className="mr-2 mt-1" />
                    Inciar Sesíon
                  </Link>
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
      
    </div>
  );
};

export default OlvidarContraseña;
