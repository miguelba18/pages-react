

import { RiKey2Line, RiShieldKeyholeLine } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import useOtpVerification from "../../hook/Contraseña/useOtpVerification";

const CodigOtp = () => {
  const { codigo, handleChangeCodigo, handleSubmitCodigo } = useOtpVerification();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 flex items-center justify-center">
      <div className="xl:flex p-6 xl:p-10 relative justify-center">
        <div className="w-[90%] xl:w-[40%] xl:h-[60%] py-[10px] ml-2 xl:px-[10px] ">
          <h1 className="text-3xl md:text-5xl font-light-700 text-white text-center mb-8 ">
            Bienvenido al Sistema de Impuestos Municipal
          </h1>
          <section>
            <h1
              id="Form"
              className="text-3xl md:text-5xl font-semibold text-white xl:px-8 text-center mt-10 xl:mt-15"
            >
              Codigo de verificacion (OTP)
            </h1>
            <h2 className="text-sm md:text-xl font-semibold text-white xl:px-8 text-center mt-10 xl:mt-10">
              Ingresa el código de verificación que te hemos enviado a tu correo
            </h2>
            <form className="xl:p-8 mt-8 xl:mt-0" onSubmit={(e) => handleSubmitCodigo(e, navigate)}>
              <div className="text-center">
                <div className="relative">
                  <input
                    type="text"
                    className="rounded-full h-[50px] w-[100%] p-4 pl-12 bg-gray-500 bg-opacity-40 text-white placeholder-white placeholder-opacity-70"
                    placeholder="CODIGO"
                    value={codigo}
                    onChange={handleChangeCodigo}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <RiShieldKeyholeLine className="text-white mt-1 ml-2" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Link to="/olvidarcontraseña" className="text-white hover:">Enviar codigo nuevamente</Link>
              </div>

              <div className="md:flex justify-center items-center">
                <button
                  type="submit"
                  className="md:w-[60%] w-full mr-8 px-2 py-3 rounded-full mt-8 bg-white text-[#716c66] hover:bg-green-400 hover:text-white transition duration-300 ease-in-out cursor-pointer flex justify-center"
                >
                  <RiKey2Line className="mr-2 mt-1" />
                  Verificar Codigo
                </button>
              </div>
            </form>
          </section>
        </div>
        <img
          src="../../../src/assets/img/fondo-login.png"
          className="xl:w-[40%] xl:h-[30%] w-[70%] ml-[15%] "
          alt="background"
        ></img>
      </div>
    </div>
  );
};

export default CodigOtp;
