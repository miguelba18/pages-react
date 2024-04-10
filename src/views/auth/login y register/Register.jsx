import { useState } from 'react';
import { RiRedPacketLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine, RiUser3Line } from "react-icons/ri";
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
  

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 flex items-center justify-center">
        <div className="xl:flex p-6 xl:p-10 justify-center xl:fixed">
        <div className="xl:w-[40%] text-white  xl:mt-0 md:p-10 xl:p-0 relative">
          <h1 className="text-3xl md:text-5xl font-light-700 text-white text-center ">Bienvenido al Sistema de Impuestos Municipal</h1>
            <h1 className="text-3xl md:text-5xl font-semibold text-white xl:px-8 text-center mt-4 xl:mt-10">Registro</h1>
            <form className="xl:p-4">
            <div className="text-center">
                <div className="relative mt-6">
                  <input
                    type="text"
                    className="rounded-full h-[50px] w-[100%] p-4 pl-12 bg-gray-500 bg-opacity-40 text-white placeholder-white placeholder-opacity-70"
                    placeholder="NOMBRE"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <RiUser3Line className="text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="relative mt-6">
                  <input
                    type="text"
                    className="rounded-full h-[50px] w-[100%] p-4 pl-12 bg-gray-500 bg-opacity-40 text-white placeholder-white placeholder-opacity-70"
                    placeholder="APELLIDO"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <RiUser3Line className="text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="relative mt-6">
                  <input
                    type="text"
                    className="rounded-full h-[50px] w-[100%] p-4 pl-12 bg-gray-500 bg-opacity-40 text-white placeholder-white placeholder-opacity-70"
                    placeholder="CORREO"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <RiRedPacketLine className="text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center mt-6 ">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="rounded-full h-[50px] w-[100%] p-4 pl-12 pr-10 bg-gray-500 bg-opacity-40 text-white placeholder-white placeholder-opacity-70"
                    placeholder="CONTRASEÑA"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {showPassword ? (
                      <RiEyeOffLine className="text-white cursor-pointer" onClick={togglePasswordVisibility} />
                    ) : (
                      <RiEyeLine className="text-white cursor-pointer" onClick={togglePasswordVisibility} />
                    )}
                  </div>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <RiLockPasswordLine className="text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="w-[100%] px-6 py-3 rounded-full mt-8 bg-white text-[#716c66] hover:bg-green-500 hover:text-white transform transition-transform duration-500 hover:scale-110"
                >
                  Registrarse
                </button>
              </div>
            </form>
            <div className="justify-center xl:mt-0 mt-8 flex">
                <p className='text-white text-lg'>¿Ya tienes una cuenta?</p>
                <button className="text-white text-lg ml-8 md:ml-[55%] xl:ml-[2%] hover:text-[#307ef8] transform transition-transform duration-500 hover:scale-110 " >
                  <a href='/login'>
                      Inicia Sesión
                  </a>
                </button>
              </div>
          </div>
  
          
          
            <img src="../../../public/img/fondo-login.png" className="xl:w-[40%] xl:h-[30%] w-[70%] ml-[15%] xl:mt-10 "></img>
          
        </div>
      </div>
    )
}

export default Register