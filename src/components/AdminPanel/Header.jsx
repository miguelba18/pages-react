import {
  RiSearchLine,
  RiNotification3Line,
  RiArrowDownSLine,
  RiSettings4Line,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useNavigate } from "react-router-dom";



const Header = () => {
  const navigate = useNavigate();
  const LimpiarToken = () => {
    window.localStorage.removeItem("token");

    navigate("/home");
  };
  return (
    <header className="  xl:h-[10vh] border-b border-tertiary-100 md:p-3 px-2   ">
      <div className="flex justify-between items-center">
        <h1 className=" font-normal md:text-4xl ">Dashboard Overview</h1>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
              placeholder="Search"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
              <RiSearchLine className="h-6 w-6" />
            </div>
          </div>
        </div>
        <nav className="flex items-center xl:gap-x-2 ">
          <button className="relative hover:bg-tertiary-100 p-2 rounded-lg transition-colors">
            <RiNotification3Line className=" h-6 w-6" />
            <span className="absolute top-0 right-0.5 bg-secundary py-0.5 px-[5px] text-black rounded-full text-[8px] font-bold">
              2
            </span>
          </button>

          <Menu
            menuButton={
              <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                <img
                  src="https://img.freepik.com/foto-gratis/joven-barbudo-camisa-rayas_273609-5677.jpg?"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm font-semibold hidden xl:inline ">Miguel Angel Bahamon</span>
                <RiArrowDownSLine className="h-6 w-6" />
              </MenuButton>
            }
            transition
            menuClassName="bg-tertiary-100 text-black p-4"
          >
            <MenuItem className="p-0 hover:bg-transparent">
              <Link 
              to="/perfil"
              className="flex items-center gap-x-4 rounded-lg transition-colors py-2 px-6 hover:bg-secundary/70 hover:text-white">
              <img
                  src="https://img.freepik.com/foto-gratis/joven-barbudo-camisa-rayas_273609-5677.jpg?"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col gap-1"> 
                  <span className="text-sm">Miguel Angel Bahamon</span>
                  <span className="text-[12px] text-gray-600">Miguel@gmail.com</span>
                </div>
              </Link>
            </MenuItem>
            <hr className="border-gray-300 my-4"/>
            <MenuItem className="p-0 hover:bg-transparent">
              <Link 
              to="/configuracion"
              className="flex items-center gap-x-4 rounded-lg transition-colors py-2 px-10 hover:bg-secundary/70 hover:text-white flex-1">
              <RiSettings4Line className="h-4 w-4 mt-1" /><span className="text-sm">Configuracion</span>
              </Link>
            </MenuItem>
            
              <button 
                onClick={LimpiarToken}
                className="flex items-center gap-x-4 rounded-lg transition-colors py-2 px-10 hover:bg-secundary/70 hover:text-white w-full">
              <RiLogoutCircleLine className="h-4 w-4 mt-1" /><span className="text-sm">Cerrar Sesión</span>
              </button>
              
            
          </Menu>
        </nav>
      </div>
    </header>
  );
};

export default Header;
