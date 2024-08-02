

import { RiKey2Line, RiShieldKeyholeLine } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import useOtpVerification from "../../hook/Contraseña/useOtpVerification";

const CodigOtp = () => {
  const { codigo, handleChangeCodigo, handleSubmitCodigo } = useOtpVerification();
  const navigate = useNavigate();

  return (
    <div className="  xl:flex items-center justify-center  ">
      <div className="grid justify-center items-center xl:min-h-screen py-16 xl:py-0 ">
        <div className="rounded-3xl  ml-2 px-10 ">
        <h1 className="text-3xl md:text-5xl font-light-700 text-black text-center mb-8 ">
            Bienvenido a{" "}
            <span className="text-[#FF432A] font-semibold">SIM SAS</span>
          </h1>
          <section>
            <h1
              id="Form"
              className="text-3xl md:text-5xl font-semibold text-black xl:px-8 text-center mt-10 xl:mt-15"
            >
              Codigo de verificacion <span className="text-blue-500 font-semibold">(OTP)</span>
            </h1>
            <h2 className="text-sm md:text-xl font-semibold text-black xl:px-8 text-center mt-10 xl:mt-10">
              Ingresa el código de verificación que te hemos enviado a tu correo
            </h2>
            <form className="xl:p-8 mt-8 xl:mt-0" onSubmit={(e) => handleSubmitCodigo(e, navigate)}>
              <div className="text-center">
                <div className="relative">
                  <input
                    type="text"
                    className="border-b-2 border-black w-full  p-4 pl-12 focus:outline-none focus:border-[#FF432A] text-black placeholder-black placeholder-opacity-70"
                    placeholder="CODIGO"
                    value={codigo}
                    onChange={handleChangeCodigo}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <RiShieldKeyholeLine className="text-[#FF432A] mt-1 ml-2" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Link to="/olvidarcontraseña" className="text-black hover:text-[#FF432A] hover:">Enviar codigo nuevamente</Link>
              </div>

              <div className="md:flex justify-center items-center">
                <button
                  type="submit"
                  className="md:w-[60%] w-full mr-8 px-2 py-3 rounded-full mt-8 bg-black text-white hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500 hover:text-white transition duration-300 ease-in-out cursor-pointer flex justify-center"
                >
                  <RiKey2Line className="mr-2 mt-1" />
                  Verificar Codigo
                </button>
              </div>
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

export default CodigOtp;
