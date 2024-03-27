import {useState} from "react";
//icons
import { RiAppsFill,RiMenuFill,RiCloseFill } from "react-icons/ri";


const Header =() =>{
    const [showMenu, setShowMenu] = useState(false)
    return(
        <header className="flex items-center justify-between xl:justify-start w-full p-4 h-[10vh] z-50 bg-primary text-white fixed">
            <div className="xl:w-1/6 text-center ml-[6%]">
                <a href="" className="text-2xl font-bold relative ">
                    <RiAppsFill className="absolute -left-8 m-1" />SIM SAS</a>
            </div>

            <nav className={`fixed bg-primary  w-[80%] md:w-[50%] xl:w-full h-full ${showMenu ? "left-0" : "-left-full"} top-0 xl:static flex-1 flex flex-col xl:flex-row items-center justify-center gap-10 transition-all duration-700 z-50`}>
            
                <a href="#Inicio" className="relative inline-block hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0 ">Inicio</a>
                <a href="#Form" className="relative inline-block hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0 ">Contacto</a>
                <a href="#Plans" className="relative inline-block hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0 ">Planes</a>
                <a href="#Galeria" className="relative inline-block hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0">Galeria</a>
                <button className="bg-yellow-200 rounded-[6px] py-3 px-7 text-primary xl:ml-10  hover:bg-[#fbc343] ">Login</button>
            </nav>
            <button onClick={() => setShowMenu(!showMenu)} className="xl:hidden text-2xl p-2">
               {showMenu ? <RiCloseFill/> : <RiMenuFill />}
            </button>
        </header>
    )
}


export default Header;