import { RiEdit2Line,RiShieldCheckLine } from "react-icons/ri";
const Perfil = () => {
  return (
    <>
      
      <div className="bg-tertiary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-black">Perfil</h1>
        <hr className="my-8 border-gray-500/30" />
        <form>
          <div className="flex items-center mb-8">
            <div className="w-1/4">
              <p>Avatar</p>
            </div>
            <div className="flex-1">
              <div className="relative mb-2">
                <img
                  src="https://img.freepik.com/foto-gratis/joven-barbudo-camisa-rayas_273609-5677.jpg?"
                  className="w-28 h-28 rounded-lg object-cover"
                ></img>
                <label
                  htmlFor="avatar"
                  className="rounded-full hover:cursor-pointer p-2 absolute -top-3 left-24 bg-tertiary-100 transform transition-transform duration-500 hover:scale-110"
                >
                  <RiEdit2Line />
                </label>
                <input type="file" id="avatar" className="hidden" />
              </div>
              <p className="text-sm text-gray-500">
                Solo imagenes de tipo: png, jpg, jpeg
              </p>
            </div>
          </div>

          <div className="flex items-center mb-8">
            <div className="w-1/4 text-sm">
              <p>
                Nombre Completo <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-full">
                <input
                  className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900"
                  placeholder="Nombre(s)"
                  type="text"
                />
              </div>
              <div className="w-full">
                <input
                  className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900"
                  placeholder="Apellido(s)"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center mb-8">
            <div className="w-1/4">
              <p>
                Ciudad <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input
                className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900"
                placeholder="Neiva"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center mb-8">
            <div className="w-1/4">
              <p>
                Celular <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input
                className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900"
                placeholder="3132140833"
                type="text"
              />
            </div>
          </div>  
            <div className="flex items-center mb-8">
            <div className="w-1/4">
              <p>
                Cedula <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input
                className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900"
                placeholder="143657"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center mb-8">
            <div className="w-1/4">
              <p>
                Rol <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input
                className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900"
                placeholder="Alcalde"
                type="text"
              />
            </div>
          </div>
        </form>
        <hr className="my-8 border-gray-500/30" />
        <div className="flex justify-end">
          <button className="bg-secundary/80 py-2 px-4 rounded-lg hover:bg-secundary transition-colors text-white">
            Guardar
          </button>
        </div>
      </div>

      <div className="bg-tertiary-100 p-8 rounded-xl">
        <h1 className="text-xl text-black mb-1">Correo y contraseña</h1>
        <hr className="my-8 border-gray-500/30" />
        <form className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-black md:text-xl">Correo Electronico</h5>
              <p className="text-gray-500 text-[10px] md:text-sm">miguel061010@hotmail.com</p>
            </div>
            <div>
              <button className="bg-tertiary-900/50 p-2 md:py-3 md:px-4 rounded-lg hover:text-secundary  hover:bg-secundary/5 transition-colors">
                Cambiar Email
              </button>
            </div>
          </div>
          <hr className="my-8 border-gray-500/30 border-dashed" />

          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-black md:text-xl mb-1">Contraseña</h5>
              <p className="text-gray-500 text-sm">****************</p>
            </div>
            <div>
              <button className="bg-tertiary-900/50 p-2 md:py-3 md:px-4 rounded-lg hover:text-secundary  hover:bg-secundary/5 transition-colors">
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </form>
        <div className="flex  rounded-lg p-2 md:p-4 items-center justify-between bg-blue-300/40 border-dashed border-2 border-secundary ">
            <div>
                <RiShieldCheckLine className="text-secundary text-xl md:text-4xl xl:ml-2 "/>
            </div>
            <div className="xl:-ml-32">
              <h5 className="text-black text-sm  md:text-xl mb-1">Secure Your Account</h5>
              <p className="text-gray-500 text-[8px] md:text-sm">two-factor authentication adds an extra layer of security to your account. To log in, in addition tou´ll need to provide a 6 digit code</p>
            </div> 
            <div>
              <button className="bg-secundary/80 rounded-md p-2 md:py-2 md:px-4 text-white hover:bg-secundary transition-colors">Activar</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
