import { RiMailFill,RiMapPin2Line,RiPhoneFill} from "react-icons/ri";


const Contacto = () => {
  return (
    <div className="xl:flex p-6 xl:p-10 bg-gray-50 ">
      <div className=" border-2 w-[90%] xl:w-[60%] xl:h-[60%] rounded-[8px] bg-white ml-[7%] py-[60px] px-8 xl:px-[100px] shadow-2xl ">
        <h1 id="Form" className="text-xl xl:text-3xl font-bold xl:px-8  text-center mt-4">
          Formulario
        </h1>
        <form className="xl:p-8">
          <div className="xl:flex">
            <div className="xl:mt-0 mt-4">
              <label className="text-lg">Nombre*<br/></label>
              <input
                type="text"
                className="border-2 rounded-[4px] h-[30px] "
                placeholder=""
                required
              />
            </div>
            <div className="xl:px-20 my-8 xl:my-0">
              <label className="text-lg ">Apellido*<br/></label>
              <input
                type="text"
                className="border-2 rounded-[4px] h-[30px] "
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="xl:flex">
            <div className="my-8">
              <label className="text-lg">
                Correo*
                <br />
              </label>
              <input
                type="email"
                className="border-2 rounded-[4px] h-[30px] "
                placeholder="Ejemplo@gmail.com"
                required
              />
            </div>
            <div className="xl:px-20  my-8">
              <label className="text-lg">Celular*<br/></label>
              <input
                type="number"
                className="border-2 rounded-[4px] h-[30px]"
                placeholder=""
                required
              />
            </div>
          </div> 
          <div className="mt-6">
            <label className="text-sm xl:text-lg">Compartenos tus Inquietudes y Estaremos <br/>!Encantados¡ de Ayudarte<br/></label>
            <textarea
              type="text"
              className="border-2 rounded-[4px] w-[80%] mt-4"
              placeholder=""
              required
            />
          </div>
          <button
            type="submit"
            className="w-[80%] px-8 py-4 rounded-xl mt-8 bg-[#4f9cf9] text-black hover:bg-primary hover:text-white transform transition-transform duration-500 hover:scale-110  "
          >
            Enviar
          </button>
        </form>
      </div>


      <div className="bg-[#4f9cf9] rounded-[8px] xl:w-[30%] text-white  xl:-ml-[5%] shadow-2xl mt-8 xl:mt-0 p-10 xl:p-0 ">
        <h1 className="text-4xl font-bold py-5 xl:py-20 text-center">Contacto</h1>

        <p className="flex justify-center mr-[15%] text-xl ">
          <RiMailFill className="mt-1 mr-8 "/>simsas@gmail.com
        </p>
        <p className="flex justify-center my-8 mr-[19%] text-xl">
        <RiPhoneFill className="mt-1  mr-8" />+569 876 543 210
        </p>
        <p className="flex  justify-center text-xl ">
        <RiMapPin2Line className="mt-1 mr-8"  />SIMSAS TECNOLOGY INC.<br/>2024 Colombia/Huila/Neiva <br/> 410001
        </p>
        
        
        
      </div>
    </div>
  );
};

export default Contacto;
