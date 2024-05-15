import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import {
  RiSearchLine,
  RiNotification3Line,
  RiArrowDownSLine,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import DarkModeSwitch from "../Darkmode/DarkModeSwitch";

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No hay token de autenticación.");
        }

        const response = await fetch(
          "http://localhost:8080/api/V1/usuario/perfil",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          const { nombre, apellido, email, imagen } = userData || {};
          setUserName(`${nombre} ${apellido}`);
          setEmail(email);
          setImagen(imagen);
        } else {
          console.error("Error al obtener los datos:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <header className="xl:h-[10vh] border-b border-tertiary-100 md:p-3 px-2  ">
      <div className="flex justify-between items-center">
        <h1 className="font-normal md:text-4xl">Dashboard Overview</h1>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
              placeholder="Search"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <RiSearchLine className="h-6 w-6" />
            </div>
          </div>
        </div>

        <nav className="flex items-center xl:gap-x-2">
          <Menu
            menuButton={
              <MenuButton className="relative hover:bg-tertiary-100 p-4 rounded-lg transition-colors">
                <RiNotification3Line className="h-6 w-6" />
                <span className="absolute top-2 right-3 bg-secundary py-0.5 px-[5px] text-black rounded-full text-[8px] font-bold">
                  2
                </span>
              </MenuButton>
            }
            transition
            menuClassName="bg-tertiary-100 text-black p-1"
          >
            <MenuItem className="p-0">
              <div className="flex items-center gap-x-4 rounded-lg transition-colors py-2 px-6 cursor-default">
                <div className="flex gap-1 items-center">
                  <RiCheckboxCircleFill className="h-6 w-6 text-green-500 mr-4" />
                  <div className="flex-col flex">
                    <span className="text-sm">Registro Exitoso</span>
                    <span className="text-sm">Nuevo alcalde registrado</span>
                  </div>
                </div>
              </div>
            </MenuItem>

            <MenuItem className="p-0">
              <div className="flex items-center gap-x-4 rounded-lg transition-colors py-2 px-6 cursor-default">
                <div className="flex gap-1 items-center">
                  <RiCloseCircleFill className="h-6 w-6 text-red-500 mr-4" />
                  <div className="flex-col flex">
                    <span className="text-sm">Registro Erroneo</span>
                    <span className="text-sm">No se registró el alcalde</span>
                  </div>
                </div>
              </div>
            </MenuItem>
          </Menu>

          <Menu
            menuButton={
              <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                <img
                  src={imagen}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Avatar"
                />
                <span className="text-sm font-semibold hidden xl:inline">
                  {userName}
                </span>
                <RiArrowDownSLine className="h-6 w-6" />
              </MenuButton>
            }
            transition
            menuClassName="bg-tertiary-100 text-black p-4"
          >
            <MenuItem className="p-0 hover:bg-transparent">
              <Link
                to="/perfil"
                className="flex items-center gap-x-4 rounded-lg transition-colors py-2 px-6 hover:bg-secundary/70 hover:text-white"
              >
                <img
                  src={imagen}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Avatar"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-sm">{userName}</span>
                  <span className="text-[12px] text-gray-600">{email}</span>
                </div>
              </Link>
            </MenuItem>
            <hr className="border-gray-300 my-4" />
            <MenuItem className="p-0 hover:bg-transparent">
              <DarkModeSwitch/>
            </MenuItem>
            

            
          </Menu>
        </nav>
      </div>
    </header>
  );
};

export default Header;
