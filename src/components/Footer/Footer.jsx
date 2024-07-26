import {

  RiAppsFill,
  RiArrowDownSLine,
  RiEarthFill,
  RiCopyrightLine,
  RiFacebookCircleFill,
  RiLinkedinBoxFill,
  RiTwitterXFill,
} from "react-icons/ri";

const Footer = () => {
  return (
    <div className="bg-cover bg-gradient-to-br from-blue-500/90 via-blue-500 to-blue-400   text-white">
      <div className=" text-center">
        <h1 id="Footer" className="text-6xl font-bold pt-32 leading-[72px]">
          Conoce a SIM SAS
           hoy
        </h1>
        <p className="text-xl p-5">
          Inicia de forma gratuita. <br /> Agregamos todo lo que necesitas.
        </p>
        <div className=" flex justify-center items-center mb-2">
                <button
                  className="overflow-hidden w-32 p-2 h-12 bg-white text-black/60 border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
                
                >
                  Empieza!
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
                  <span className="group-hover:opacity-100 group-hover:duration-1000 text-white duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                    Explora!
                  </span>
                </button>
                
              </div>
        <p className="text-xl pb-6">Contactanos</p>
        <div className="flex justify-center">
          <img src="/src/assets/img/appleblanco.png" className="h-16 m-2" />
          <img src="/src/assets/img/winblanco.png" className="h-16 m-2" />
          <img src="/src/assets/img/androidblanco.png" className="h-16 m-2" />
        </div>
      </div>

      <div className="pt-32 md:flex grid justify-center md:px-10 items-center">
        <div className="xl:w-1/6   mb-8">
          <a href="" className="text-2xl font-bold relative pl-6  ">
            <RiAppsFill className="absolute -left-2 m-1 " />
            SIM SAS
          </a>
          <p className="pt-4 mr-2">
            SIM SAS was created for
            <br /> the new ways we live and
            <br /> work. We make a better
            <br /> workspace around the world
          </p>
        </div>
        <div className=" xl:p-16 md:-mt-8">
          <h1 className="text-lg font-bold ">Product</h1>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            Overview
          </p>
          <p className="pt-2 text-[15px hover:text-yellow-300 cursor-pointer">
            Pricing
          </p>
          <p className="pt-2 text-[15px hover:text-yellow-300 cursor-pointer">
            Customer stories
          </p>
        </div>
        <div className=" xl:p-16 mt-4 md:-mt-8">
          <h1 className="text-lg font-bold">Resources</h1>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            Blog
          </p>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            Guides y tutorials
          </p>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            Help center
          </p>
        </div>
        <div className=" mt-4 md:-mt-8 md:mr-4">
          <h1 className="text-lg font-bold">Company</h1>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            About us
          </p>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            Careers
          </p>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            Media kit
          </p>
        </div>
        <div className="mt-2 xl:ml-10 ">
          <h1 className="text-xl font-bold pb-4">Try It Today</h1>
          <p className="text-[13px] mb-4">
            Get started for free. Add your
            <br /> whole teams as your needs grow.
          </p>
          <div className=" flex  items-center mb-2">
                <button
                  className="overflow-hidden w-32 p-2 h-12 bg-white text-black/60 border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
                
                >
                  Inicia!
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
                  <span className="group-hover:opacity-100 group-hover:duration-1000 text-white duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                    Pronto!
                  </span>
                </button>
                
              </div>
        </div>
      </div>

      <div className=" border-t-[1px] border-white my-2 "></div>

      <div className="xl:flex justify-center text-center">
        <div className="border-w-2 my-2"></div>
        <div className="inline-block">
          <div className="ml-2 p-10 xl:ml-32 xl:p-10 flex relative hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0 cursor-pointer hover:text-yellow-300 ">
            <RiEarthFill className="mt-1 mr-1" />
            <span>English</span>
            <RiArrowDownSLine className="mt-[6px] ml-1" />
          </div>
        </div>
        <p className="ml-2 p-10 inline-block relative hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0 cursor-pointer hover:text-yellow-300 ">
          Terms y privacy
        </p>
        <p className="ml-2 p-10 inline-block relative hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0 cursor-pointer hover:text-yellow-300 ">
          Security
        </p>
        <p className="ml-2 p-10 inline-block relative hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0 cursor-pointer hover:text-yellow-300 ">
          Status
        </p>
      </div>
      <div className="flex flex-col items-center justify-center p-10">
        <p className="flex">
          <RiCopyrightLine className="mt-1 mr-1" />
          2024 SIM SAS LLC.
        </p>
        <div className="flex mt-1">
          <p className="px-4 ">
            <RiFacebookCircleFill />
          </p>
          <p className="px-4">
            <RiLinkedinBoxFill />
          </p>
          <p className="px-4">
            <RiTwitterXFill />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
