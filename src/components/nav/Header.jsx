import { useState } from "react";

import {
  RiAppsFill,
  RiMenuFill,
  RiCloseFill,
  RiLogoutBoxLine,
} from "react-icons/ri";

import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  const LimpiarToken = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };
  const handleMenuClick = (e) => {
    e.preventDefault();

    const href = e.target.getAttribute("href");

    const targetElement = document.querySelector(href);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    setShowMenu(false);
  };

  return (
    <header className="flex items-center justify-between xl:justify-start w-full p-4 h-[10vh] fixed xl:absolute  z-50 text-white bg-secundary/90">
      <div className="xl:w-1/6 text-center ml-[6%]">
        <a href="" className="text-3xl font-bold relative ">
          <RiAppsFill className="absolute -left-8 m-1" />
          SIM SAS
        </a>
      </div>

      <nav
        className={`fixed  w-[80%] md:w-[50%] xl:w-full h-full bg-blue-700/80 xl:bg-transparent ${
          showMenu ? "left-0" : "-left-full"
        } top-0 xl:static flex-1 flex flex-col xl:flex-row items-center justify-center gap-10 transition-all duration-700 z-50`}
      >
        <a
          href="#Inicio"
          onClick={handleMenuClick}
          className="relative text-xl inline-block hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0"
        >
          Inicio
        </a>
        <a
          href="#Form"
          onClick={handleMenuClick}
          className="relative text-xl inline-block hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0"
        >
          Contacto
        </a>
        <a
          href="#Plans"
          onClick={handleMenuClick}
          className="relative text-xl inline-block hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0"
        >
          Planes
        </a>
        <a
          href="#Galeria"
          onClick={handleMenuClick}
          className="relative text-xl inline-block hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0"
        >
          Galeria
        </a>
        {token ? (
          <>
            <Link to={"/"}>
              <button className="bg-secundary/80 rounded-[6px] py-3 px-7 text-primary xl:ml-10  hover:bg-secundary transition-colors ">
                Volver al panel
              </button>
            </Link>
            <button
              onClick={LimpiarToken}
              className="bg-yellow-200 rounded-[6px] py-3 px-7 text-primary xl:ml-10  hover:bg-[#fbc343] flex items-center "
            >
              <RiLogoutBoxLine className="text-primary mr-2" />
              Cerrar Sesion
            </button>
          </>
        ) : (
          <Link to={"/login"}>
            <div className=" flex">
              <button className="overflow-hidden w-42 p-2 h-12 bg-white text-black/60 border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group">
                Inicia Sesion
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-yellow-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-yellow-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-yellow-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
                <span className="group-hover:opacity-100 text-center group-hover:duration-1000 text-white duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                  Ingresa!
                </span>
              </button>
            </div>
          </Link>
        )}
      </nav>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden text-2xl p-2"
      >
        {showMenu ? <RiCloseFill /> : <RiMenuFill />}
      </button>
    </header>
  );
};

export default Header;
