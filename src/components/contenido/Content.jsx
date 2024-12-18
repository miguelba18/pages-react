import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { RxSwitch } from "react-icons/rx";
import { useRef } from "react";
import "../../styles/style.css";
import Carrusel from "../Carousel/Carrusel";
const Content = () => {
  const scrollRef = useRef(null);

  const handleButtonClick = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <div className="relative min-h-[90vh] ">
        <div className="absolute inset-x-0 xl:bottom-4 -bottom-6 grid justify-center  z-1 ">
          <div className="flex justify-center ">
            <RxSwitch className="h-8 w-8 rounded-md  text-white rotate-90  " />
          </div>

          <div className=" justify-center items-center mb-16">
            <span className="text-white">Scroll Down</span>
          </div>
        </div>

        <section className="min-h-[90vh] w-full grid grid-cols-1 xl:grid-cols-8 gap-4 wave-bg relative">
          <div className="xl:col-span-4 flex items-center justify-center xl:p-20 p-4">
            <div className="flex flex-col gap-6">
              <div className="flex">
                <h1
                  id="Inicio"
                  className="text-4xl md:text-6xl font-bold leading-[5rem] md:leading-[6.5rem] text-black"
                >
                  Disfruta de la mejor experiencia con nuestro software
                  <div>
                    <span className="text-primary py-2 xl:px-6 border-8 border-primary relative ml-4">
                      SIM SAS
                      <div className="hidden md:inline">
                        <RiCheckboxBlankCircleFill className="text-base absolute -left-5 -top-5 rounded-full text-white p-2 box-content bg-primary" />
                        <RiCheckboxBlankCircleFill className="text-base absolute -right-5 -top-5 rounded-full text-white p-2 box-content bg-primary" />
                        <RiCheckboxBlankCircleFill className="text-base absolute -left-5 -bottom-5 rounded-full text-white p-2 box-content bg-primary" />
                        <RiCheckboxBlankCircleFill className="text-base absolute -right-5 -bottom-5 rounded-full text-white p-2 box-content bg-primary" />
                      </div>
                    </span>
                  </div>
                </h1>
              </div>
              <p className="text-black text-lg leading-8">
                Un proyecto creado para que puedas administrar y gestionar los
                impuestos de todas las empresas de tu ciudad.
              </p>
              <div className="pt-5 flex">
                <button
                  className="overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative group"
                  onClick={handleButtonClick}
                >
                  Empieza!
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-secundary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-cuartary-100 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
                  <span className="group-hover:opacity-100 group-hover:duration-1000 text-white duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                    Explora!
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="xl:col-span-4 w-full flex items-center justify-center p-4">
            <div className="w-[80vw] h-auto overflow-hidden rounded-lg">
              <Carrusel />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Content;
