
import { RiLockPasswordLine, RiKey2Line, RiCheckFill, RiCloseFill } from "react-icons/ri";


import 'react-toastify/dist/ReactToastify.css';
import usePasswordReset from "../../hook/Contraseña/usePasswordReset";

const NuevaContraseña = () => {
  const { contraseña, confirmarContraseña, handleChangeContraseña, handleChangeConfirmarContraseña, handleSubmitContraseña, validations } = usePasswordReset();
  
  

  return (
    <div className="xl:flex items-center justify-center">
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
              className="text-3xl md:text-5xl font-semibold text-black xl:px-8 text-center mt-10 xl:mt-15"
            >
              Ingresa tu nueva <span className="text-blue-500">contraseña</span>
            </h1>
            <h2 className="text-sm md:text-xl font-semibold text-black xl:px-8 text-center mt-10 xl:mt-10">
              Ingresa una nueva contraseña para tu cuenta
            </h2>
            <form className="xl:p-8 mt-8 xl:mt-0" onSubmit={handleSubmitContraseña}>
              <div className="text-center mb-4">
                <div className="relative">
                  <input
                    type="password"
                    className="border-b-2 border-black w-full  p-4 pl-12 focus:outline-none focus:border-blue-500 text-black placeholder-black placeholder-opacity-70"
                    placeholder="Nueva contraseña"
                    value={contraseña}
                    onChange={handleChangeContraseña}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <RiLockPasswordLine className="text-blue-500" />
                  </div>
                </div>
                <div className="text-left mt-2">
                <p className="flex items-center">
                    {validations.length ? (
                      <RiCheckFill className="mr-2 text-green-600" />
                    ) : (
                      <RiCloseFill className="mr-2 text-orange-500" />
                    )}
                    <p style={{ color: validations.length ? 'green' : 'red' }}>
                    {validations.length ? 'Caracteres completados' : 'Debe contener al menos 8 caracteres'}
                  </p>
                  </p>
                  <p className="flex items-center">
                  {validations.number ? (
                      <RiCheckFill className="mr-2 text-green-600" />
                    ) : (
                      <RiCloseFill className="mr-2 text-orange-500" />
                    )}
                  <p style={{ color: validations.number ? 'green' : 'red' }}>
                    {validations.number ? 'Contiene un número' : 'Debe contener al menos un número'}
                  </p>
                  </p>
                  <p className="flex items-center">
                  {validations.uppercase ? (
                      <RiCheckFill className="mr-2 text-green-600" />
                    ) : (
                      <RiCloseFill className="mr-2 text-orange-500" />
                    )}

                  <p style={{ color: validations.uppercase ? 'green' : 'red' }}>
                    {validations.uppercase ? 'Contiene una mayúscula' : 'Debe contener al menos una letra mayúscula'}
                  </p>
                  </p>
                  <p className="flex items-center">
                  {validations.symbol ? (
                      <RiCheckFill className="mr-2 text-green-600" />
                    ) : (
                      <RiCloseFill className="mr-2 text-orange-500" />
                    )}
                  <p style={{ color: validations.symbol ? 'green' : 'red' }}>
                    {validations.symbol ? 'Contiene un símbolo' : 'Debe contener al menos un símbolo'}
                  </p>
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="relative">
                  <input
                    type="password"
                    className="border-b-2 border-black w-full  p-4 pl-12 focus:outline-none focus:border-blue-500 text-black placeholder-black placeholder-opacity-70"
                    placeholder="Confirmar contraseña"
                    value={confirmarContraseña}
                    onChange={handleChangeConfirmarContraseña}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <RiLockPasswordLine className="text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="md:flex justify-center items-center">
                <button
                  type="submit"
                
                
                  className="md:w-[60%] w-full mr-8 px-2 py-3 rounded-full mt-8 bg-[#FF432A] text-white hover:shadow-xl hover:shadow-[#FF432A] transition duration-300 ease-in-out cursor-pointer flex justify-center"
                >
                  <RiKey2Line className="mr-2 mt-1" />
                  Reestablecer contraseña
                </button>
              </div>
            </form>
          </section>
        </div>
       
      </div>
    </div>
  );
};

export default NuevaContraseña;
