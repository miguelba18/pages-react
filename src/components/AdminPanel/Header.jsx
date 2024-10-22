import { Link, useNavigate } from "react-router-dom";
import useAuthToken from "../../views/hook/Token/useAuthToken";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import {
  RiNotification3Line,
  RiArrowDownSLine,
  RiQuestionAnswerFill,
  RiCalendarTodoFill,
  RiUser6Fill,
  RiMailUnreadFill,
  RiAppsFill,
  RiAddCircleFill,
  RiFileList3Fill,
  RiAdminFill,
  RiBillFill,
  RiShakeHandsFill,
  RiBankFill,
  RiMoneyDollarCircleFill,
  RiTeamFill,
  RiMailSendFill,
  RiArticleFill,
  RiFolderOpenFill,
  RiGroupFill,
} from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { IoFileTrayFull } from "react-icons/io5";

import useListNotificacion from "../../views/hook/Notificaciones/useListNotificacion";
import useDeleteNotificacionReminder from "../../views/hook/Notificaciones/Recordatorio/useDeleteNotificacionReminder";
import useDeleteNotificacion from "../../views/hook/Notificaciones/Inquietud/useDeleteNotificacion";
import useDeleteNotificacionProfile from "../../views/hook/Notificaciones/Perfil/useDeleteNotificacionProfile";
import useDeleteNotificacionEmail from "../../views/hook/Notificaciones/Enviar correo/useDeleteNotificacionEmail";
import { useEffect, useState } from "react";

const Header = () => {
  const { handleNotificationClick } = useDeleteNotificacion();
  const { handleNotificationClickReminder } = useDeleteNotificacionReminder();
  const { handleNotificationClickProfile } = useDeleteNotificacionProfile();
  const { handleNotificationClickEmail } = useDeleteNotificacionEmail();
  const [userRoleId, setUserRoleId] = useState(null);
  const { token } = useAuthToken();
  const navigate = useNavigate();

  useState(false);

  const {
    userName,
    email,
    imagen,
    notifications,
    reminderNotifications,
    profileNotifications,
    emailNotifications,
  } = useListNotificacion();

  const totalNotifications =
    notifications.length +
    reminderNotifications.length +
    profileNotifications.length +
    emailNotifications.length;

  const { removeToken } = useAuthToken();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const roleId = decodedToken.role;

        setUserRoleId(roleId);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        window.localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <header className="xl:h-[10vh] border-b border-tertiary-100 md:p-3 px-2  ">
      <div className="md:flex justify-between items-center ">
        <div className="hidden md:inline rounded-md bg-primary p-2   ">
          <div className="flex justify-center items-center">
            <RiAppsFill className="text-white  h-6 w-6 mr-2" />
            <h1 className=" text-2xl font-normal   ">
              {userRoleId === "ADMIN" && (
                <span className="text-white">
                  SIM ADMIN<span className=" ">.</span>
                </span>
              )}
              {userRoleId === "Alcalde" && (
                <span className="text-white">
                  SIM Alcalde
                  <span className=" text-secundary">.</span>
                </span>
              )}
              {userRoleId === "Secretario" && (
                <span className="text-white">
                  SIM Secretario
                  <span className=" text-secundary">.</span>
                </span>
              )}
              {userRoleId === "Personal" && (
                <span className="text-white">
                  SIM Personal
                  <span className=" text-secundary">.</span>
                </span>
              )}
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2"></div>

        <nav className="">
          <ul className="list-none flex justify-center md:justify-start items-center">
            {userRoleId === "ADMIN" && (
              <>
                <Menu
                  menuButton={
                    <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                      <div className="flex items-center ">
                        <RiAdminFill className="text-xl mr-2 text-secundary" />
                        <span className="text-sm font-semibold hidden xl:inline">
                          Administrador y Alcaldes
                        </span>
                      </div>
                      <RiArrowDownSLine className="h-6 w-6" />
                    </MenuButton>
                  }
                  transition
                  menuClassName="bg-tertiary-100 text-black p-4"
                >
                  <MenuItem className="p-0 ">
                    <Link
                      to="/registroadmin"
                      className="flex items-center  gap-4 px-4 py-2  "
                    >
                      <RiAddCircleFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/registroadmin" ? " " : ""
                        }`}
                      />
                      Agregar Admin
                    </Link>
                  </MenuItem>
                  <MenuItem className="p-0 ">
                    <Link
                      to="/alcalde"
                      className="flex items-center  gap-4 px-4 py-2  "
                    >
                      <RiAddCircleFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/alcalde" ? " " : ""
                        }`}
                      />
                      Agregar Alcalde
                    </Link>
                  </MenuItem>
                  <MenuItem className="p-0 ">
                    <Link
                      to="/tablaadminalcalde"
                      className="flex items-center  gap-4 px-4 py-2 mb-2 "
                    >
                      <RiFileList3Fill
                        className={`text-xl text-secundary ${
                          location.pathname === "/tablaadminalcalde" ? "" : ""
                        }`}
                      />
                      Ver Admin y Alcaldes
                    </Link>
                  </MenuItem>
                </Menu>
                <Menu
                  menuButton={
                    <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                      <div className="flex items-center ">
                        <RiAdminFill className="text-xl mr-2 text-secundary" />
                        <span className="text-sm font-semibold hidden xl:inline">
                          Revisar
                        </span>
                      </div>
                      <RiArrowDownSLine className="h-6 w-6" />
                    </MenuButton>
                  }
                  transition
                  menuClassName="bg-tertiary-100 text-black p-4"
                >
                  <MenuItem className="p-0 ">
                    <Link
                      to="/calendarioadmin"
                      className="flex items-center  gap-4 px-4 py-2 mb-2"
                    >
                      <RiCalendarTodoFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/calendarioadmin" ? "" : ""
                        }`}
                      />
                      Calendario
                    </Link>
                  </MenuItem>
                  <MenuItem className="p-0 ">
                    <Link
                      to="/inquietud"
                      className="flex items-center  gap-4 px-4 py-2 mb-2"
                    >
                      <RiQuestionAnswerFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/inquietud" ? "" : ""
                        }`}
                      />
                      Inquietudes
                    </Link>
                  </MenuItem>
                  <MenuItem className="p-0 ">
                    <Link
                      to="/enviarcorreos"
                      className="flex items-center  gap-4 px-4 py-2 mb-2"
                    >
                      <RiMailSendFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/enviarcorreos" ? "" : ""
                        }`}
                      />
                      Enviar Correos
                    </Link>
                  </MenuItem>
                </Menu>
                <Menu
                  menuButton={
                    <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                      <div className="flex items-center ">
                        <RiBillFill className="text-xl mr-2 text-secundary" />
                        <span className="text-sm font-semibold hidden xl:inline">
                          Facturas
                        </span>
                      </div>
                      <RiArrowDownSLine className="h-6 w-6" />
                    </MenuButton>
                  }
                  transition
                  menuClassName="bg-tertiary-100 text-black p-4"
                >
                  <SubMenu
                    label={
                      <div className="flex items-center gap-2">
                        <RiGroupFill className="text-xl mr-2 text-secundary" />
                        Vinculantes
                      </div>
                    }
                    className=""
                  >
                    <MenuItem className="">
                      <Link
                        to="/agrupadasadquiriente"
                        className="flex items-center  gap-4 px-4 py-2  "
                      >
                        <RiShakeHandsFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/agrupadasadquiriente"
                              ? " "
                              : ""
                          }`}
                        />
                        Comprador ubicado en el Municipio
                      </Link>
                    </MenuItem>
                    <MenuItem className="">
                      <Link
                        to="/agrupadasemisor"
                        className="flex items-center  gap-4 px-4 py-2 mb-2"
                      >
                        <RiBankFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/agrupadasemisor" ? "" : ""
                          }`}
                        />
                        Vendedor Ubicado en el municipio
                      </Link>
                    </MenuItem>
                  </SubMenu>
                  <SubMenu
                    label={
                      <div className="flex items-center gap-2">
                        <RiTeamFill className="text-xl mr-2 text-secundary" />
                        No Vinculantes
                      </div>
                    }
                    className=""
                  >
                    <MenuItem>
                      <Link
                        to="/consorcios"
                        className="flex items-center  gap-4 px-4 py-2  "
                      >
                        <IoFileTrayFull
                          className={`text-xl text-secundary ${
                            location.pathname === "/consorcios" ? " " : ""
                          }`}
                        />
                        Todos los no Vinculantes
                      </Link>
                    </MenuItem>
                    <MenuItem className="">
                      <Link
                        to="/consorcioclientemunicipio"
                        className="flex items-center  gap-4 px-4 py-2  "
                      >
                        <RiShakeHandsFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/consorcioclientemunicipio"
                              ? " "
                              : ""
                          }`}
                        />
                        No Vinculante Cliente
                      </Link>
                    </MenuItem>
                    <MenuItem className="">
                      <Link
                        to="/consorciovendedormunicipio"
                        className="flex items-center  gap-4 px-4 py-2 mb-2 "
                      >
                        <RiBankFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/consorciovendedormunicipio"
                              ? ""
                              : ""
                          }`}
                        />
                        No Vinculante Vendedor
                      </Link>
                    </MenuItem>
                    <MenuItem className="">
                      <Link
                        to="unionesconsorcios"
                        className="flex items-center  gap-4 px-4 py-2 mb-2 "
                      >
                        <RiBankFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/unionesconsorcios"
                              ? ""
                              : ""
                          }`}
                        />
                        Uniones Temporales y Consorcios
                      </Link>
                    </MenuItem>
                    <MenuItem className="">
                      <Link
                        to="/otroscontribuyentes"
                        className="flex items-center  gap-4 px-4 py-2 mb-2 "
                      >
                        <RiBankFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/otroscontribuyentes"
                              ? ""
                              : ""
                          }`}
                        />
                        Otros Contribuyentes
                      </Link>
                    </MenuItem>
                  </SubMenu>
                  <SubMenu
                    label={
                      <div className="flex items-center gap-2">
                        <RiBillFill className="text-xl mr-2 text-secundary" />
                        Documento Electronico
                      </div>
                    }
                    className=""
                  >
                    <MenuItem className="">
                      <Link
                        to="/administrarfacturas"
                        className="flex items-center  gap-4 px-4 py-2  "
                      >
                        <MdManageAccounts
                          className={`text-xl text-secundary ${
                            location.pathname === "/administrarfacturas"
                              ? ""
                              : ""
                          }`}
                        />
                        Administrar Documentos electronicos
                      </Link>
                    </MenuItem>
                    <MenuItem className="">
                      <Link
                        to="/facturaelectronica"
                        className="flex items-center  gap-4 px-4 py-2 "
                      >
                        <RiAddCircleFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/facturaelectronica"
                              ? ""
                              : ""
                          }`}
                        />
                        Agregar Facturas
                      </Link>
                    </MenuItem>
                    <MenuItem className="">
                      <Link
                        to="/facturacompletatodas"
                        className="flex items-center  gap-4 px-4 py-2 "
                      >
                        <IoFileTrayFull
                          className={`text-xl text-secundary ${
                            location.pathname === "/facturacompletatodas"
                              ? ""
                              : ""
                          }`}
                        />
                        Todos los documentos electronicos
                      </Link>
                    </MenuItem>
                    <MenuItem className="">
                      <Link
                        to="/facturacompleta"
                        className="flex items-center  gap-4 px-4 py-2 "
                      >
                        <IoFileTrayFull
                          className={`text-xl text-secundary ${
                            location.pathname === "/facturacompleta" ? "" : ""
                          }`}
                        />
                        Documento Electronico Municipio
                      </Link>
                    </MenuItem>
                  </SubMenu>
                </Menu>
              </>
            )}

            {userRoleId === "Alcalde" && (
              <>
                <Menu
                  menuButton={
                    <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                      <div className="flex items-center ">
                        <RiAdminFill className="text-xl mr-2 text-secundary" />
                        <span className="text-sm font-semibold hidden xl:inline">
                          Secretarios y Personal
                        </span>
                      </div>
                      <RiArrowDownSLine className="h-6 w-6" />
                    </MenuButton>
                  }
                  transition
                  menuClassName="bg-tertiary-100 text-black p-4"
                >
                  <MenuItem className="p-0 ">
                    <Link
                      to="/secretario"
                      className="flex items-center  gap-4 px-4 py-2 "
                    >
                      <RiAddCircleFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/secretario" ? "" : ""
                        }`}
                      />
                      Agregar Secretario
                    </Link>
                  </MenuItem>
                  <MenuItem className="p-0 ">
                    <Link
                      to="/personal"
                      className="flex items-center  gap-4 px-4 py-2 "
                    >
                      <RiAddCircleFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/personal" ? "" : ""
                        }`}
                      />
                      Agregar Personal
                    </Link>
                  </MenuItem>
                  <MenuItem className="p-0 ">
                    <Link
                      to="/tabla"
                      className="flex items-center  gap-4 px-4 py-2 mb-2 "
                    >
                      <RiFileList3Fill
                        className={`text-xl  text-secundary ${
                          location.pathname === "/tabla" ? "" : ""
                        }`}
                      />
                      Ver Secretarios y Personal
                    </Link>
                  </MenuItem>
                </Menu>
                <Menu
                  menuButton={
                    <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                      <div className="flex items-center ">
                        <RiAdminFill className="text-xl mr-2 text-secundary" />
                        <span className="text-sm font-semibold hidden xl:inline">
                          Revisar
                        </span>
                      </div>
                      <RiArrowDownSLine className="h-6 w-6" />
                    </MenuButton>
                  }
                  transition
                  menuClassName="bg-tertiary-100 text-black p-4"
                >
                  <MenuItem className="p-0 ">
                    <Link
                      to="/enviarcorreoalcalde"
                      className="flex items-center  gap-4 px-4 py-2 mb-2"
                    >
                      <RiMailSendFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/enviarcorreoalcalde" ? "" : ""
                        }`}
                      />
                      Enviar Correos
                    </Link>
                  </MenuItem>
                  <MenuItem className="p-0 ">
                    <Link
                      to="/calendarioalcalde"
                      className="flex items-center  gap-4 px-4 py-2 mb-2"
                    >
                      <RiCalendarTodoFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/calendarioalcalde" ? "" : ""
                        }`}
                      />
                      Calendario
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}

            {userRoleId === "Secretario" && (
              <>
                <Menu
                  menuButton={
                    <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                      <div className="flex items-center ">
                        <RiCalendarTodoFill className="text-xl mr-2 text-secundary" />
                        <span className="text-sm font-semibold hidden xl:inline">
                          Calendarios
                        </span>
                      </div>
                      <RiArrowDownSLine className="h-6 w-6" />
                    </MenuButton>
                  }
                  transition
                  menuClassName="bg-tertiary-100 text-black p-4"
                >
                  <MenuItem className="p-0 ">
                    <Link
                      to="/calendarioalcalde"
                      className="flex items-center  gap-4 px-4 py-2 "
                    >
                      <RiCalendarTodoFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/calendarioalcalde" ? "" : ""
                        }`}
                      />
                      Calendario
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}

            {userRoleId === "Personal" && (
              <>
                <Menu
                  menuButton={
                    <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                      <div className="flex items-center ">
                        <RiCalendarTodoFill className="text-xl mr-2 text-secundary" />
                        <span className="text-sm font-semibold hidden xl:inline">
                          Calendarios
                        </span>
                      </div>
                      <RiArrowDownSLine className="h-6 w-6" />
                    </MenuButton>
                  }
                  transition
                  menuClassName="bg-tertiary-100 text-black p-4"
                >
                  <MenuItem className="p-0 ">
                    <Link
                      to="/calendarioalcalde"
                      className="flex items-center  gap-4 px-4 py-2 "
                    >
                      <RiCalendarTodoFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/calendarioalcalde" ? "" : ""
                        }`}
                      />
                      Calendario
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}

            <div hidden={userRoleId === "ADMIN"}>
              <Menu
                menuButton={
                  <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                    <div className="flex items-center ">
                      <RiBillFill className="text-xl mr-2 text-secundary" />
                      <span className="text-sm font-semibold hidden xl:inline">
                        Facturas
                      </span>
                    </div>
                    <RiArrowDownSLine className="h-6 w-6" />
                  </MenuButton>
                }
                transition
                menuClassName="bg-tertiary-100 text-black p-4"
              >
                <SubMenu
                  label={
                    <div className="flex items-center gap-2">
                      <RiGroupFill className="text-xl mr-2 text-secundary" />
                      Vinculantes
                    </div>
                  }
                  className=""
                >
                  <MenuItem className="">
                    <Link
                      to="/agrupadasadquirientealcalde"
                      className="flex items-center  gap-4 px-4 py-2 "
                    >
                      <RiShakeHandsFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/agrupadasadquirientealcalde"
                            ? " "
                            : ""
                        }`}
                      />
                      Comprador ubicado en el Municipio
                    </Link>
                  </MenuItem>
                  <MenuItem className="">
                    <Link
                      to="/agrupadasemisoralcalde"
                      className="flex items-center  gap-4 px-4 py-2 mb-2 "
                    >
                      <RiBankFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/agrupadasemisoralcalde"
                            ? ""
                            : ""
                        }`}
                      />
                      Vendedor Ubicado en el municipio
                    </Link>
                  </MenuItem>
                </SubMenu>
                <SubMenu
                  label={
                    <div className="flex items-center gap-2">
                      <RiTeamFill className="text-xl mr-2 text-secundary" />
                      No Vinculantes
                    </div>
                  }
                  className=""
                >
                  <MenuItem>
                    <Link
                      to="/consorciosalcalde"
                      className="flex items-center  gap-4 px-4 py-2  "
                    >
                      <IoFileTrayFull
                        className={`text-xl text-secundary ${
                          location.pathname === "/consorciosalcalde" ? " " : ""
                        }`}
                      />
                      Todos los no Vinculantes
                    </Link>
                  </MenuItem>
                  <MenuItem className="">
                    <Link
                      to="/clientealcalde"
                      className="flex items-center  gap-4 px-4 py-2  "
                    >
                      <RiShakeHandsFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/clientealcalde" ? "" : ""
                        }`}
                      />
                      No Vinculante Cliente
                    </Link>
                  </MenuItem>
                  <MenuItem className="">
                    <Link
                      to="/vendedoralcalde"
                      className="flex items-center  gap-4 px-4 py-2 mb-2 "
                    >
                      <RiBankFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/vendedoralcalde" ? "" : ""
                        }`}
                      />
                      No Vinculante Vendedor
                    </Link>
                  </MenuItem>
                  <MenuItem className="">
                      <Link
                        to="unionesconsorcios"
                        className="flex items-center  gap-4 px-4 py-2 mb-2 "
                      >
                        <RiBankFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/unionesconsorcios"
                              ? ""
                              : ""
                          }`}
                        />
                        Uniones Temporales y Consorcios
                      </Link>
                    </MenuItem>
                    <MenuItem className="">
                      <Link
                        to="/otroscontribuyentes"
                        className="flex items-center  gap-4 px-4 py-2 mb-2 "
                      >
                        <RiBankFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/otroscontribuyentes"
                              ? ""
                              : ""
                          }`}
                        />
                        Otros Contribuyentes
                      </Link>
                    </MenuItem>
                </SubMenu>
                <SubMenu
                  label={
                    <div className="flex items-center gap-2">
                      <RiBillFill className="text-xl mr-2 text-secundary" />
                      Documento Electronico
                    </div>
                  }
                  className=""
                >
                  <MenuItem className="">
                    <Link
                      to="/facturaelectronica"
                      className="flex items-center  gap-4 px-4 py-2 "
                    >
                      <RiAddCircleFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/facturaelectronica" ? "" : ""
                        }`}
                      />
                      Agregar Facturas
                    </Link>
                  </MenuItem>
                  <MenuItem className="">
                    <Link
                      to="/facturatodasalcalde"
                      className="flex items-center  gap-4 px-4 py-2 "
                    >
                      <IoFileTrayFull
                        className={`text-xl text-secundary ${
                          location.pathname === "/facturacompletatodas"
                            ? ""
                            : ""
                        }`}
                      />
                      Todos los documentos electronicos
                    </Link>
                  </MenuItem>
                  <MenuItem className="">
                    <Link
                      to="/facturacompletaalcalde"
                      className="flex items-center  gap-4 px-4 py-2 "
                    >
                      <IoFileTrayFull
                        className={`text-xl text-secundary ${
                          location.pathname === "/facturacompletaalcalde"
                            ? ""
                            : ""
                        }`}
                      />
                      Documento Electronico Municipio
                    </Link>
                  </MenuItem>
                </SubMenu>
              </Menu>
            </div>

            <Menu
              menuButton={
                <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                  <div className="flex items-center ">
                    <RiMoneyDollarCircleFill className="text-xl mr-2 text-secundary" />
                    <span className="text-sm font-semibold hidden xl:inline">
                      Contribuyentes
                    </span>
                  </div>
                  <RiArrowDownSLine className="h-6 w-6" />
                </MenuButton>
              }
              transition
              menuClassName="bg-tertiary-100 text-black p-4"
            >
              <MenuItem className="p-0 ">
                <Link
                  to="/contribuyente"
                  className="flex items-center gap-4 px-4 py-2 "
                >
                  <RiMoneyDollarCircleFill
                    className={`text-xl text-secundary ${
                      location.pathname === "/contribuyente" ? "" : ""
                    }`}
                  />
                  Contribuyente
                </Link>
              </MenuItem>
            </Menu>
            <Menu
              menuButton={
                <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                  <div className="flex items-center ">
                    <RiArticleFill className="text-xl mr-2 text-secundary" />
                    <span className="text-sm font-semibold hidden xl:inline">
                      Documento Soporte
                    </span>
                  </div>
                  <RiArrowDownSLine className="h-6 w-6" />
                </MenuButton>
              }
              transition
              menuClassName="bg-tertiary-100 text-black p-4"
            >
              <MenuItem className="p-0 ">
                <Link
                  to="/documentosoporte"
                  className="flex items-center  gap-4 px-4 py-2  "
                >
                  <RiFolderOpenFill
                    className={`text-xl text-secundary ${
                      location.pathname === "/documentosoporte" ? " " : ""
                    }`}
                  />
                  Documentos
                </Link>
              </MenuItem>
              <MenuItem className="p-0 ">
                <div
                  hidden={
                    userRoleId === "Secretario" ||
                    userRoleId === "Alcalde" ||
                    userRoleId === "Personal"
                  }
                >
                  <Link
                    to="/documentocomprador"
                    className="flex items-center  gap-4 px-4 py-2 "
                  >
                    <RiShakeHandsFill
                      className={`text-xl text-secundary ${
                        location.pathname === "/documentocomprador" ? " " : ""
                      }`}
                    />
                    Documento Comprador
                  </Link>
                </div>
              </MenuItem>
              <MenuItem className="p-0 ">
                <div
                  hidden={
                    userRoleId === "Secretario" ||
                    userRoleId === "Alcalde" ||
                    userRoleId === "Personal"
                  }
                >
                  <Link
                    to="/documentovendedor"
                    className="flex items-center  gap-4 px-4 py-2  "
                  >
                    <RiBankFill
                      className={`text-xl text-secundary ${
                        location.pathname === "/documentovendedor" ? " " : ""
                      }`}
                    />
                    Documento Vendedor
                  </Link>
                </div>
              </MenuItem>

              <MenuItem className="p-0 ">
                <div hidden={userRoleId === "ADMIN"}>
                  <Link
                    to="/documentocompradoralcalde"
                    className="flex items-center  gap-4 px-4 py-2 "
                  >
                    <RiShakeHandsFill
                      className={`text-xl text-secundary ${
                        location.pathname === "/documentocompradoralcalde"
                          ? " "
                          : ""
                      }`}
                    />
                    Documento Comprador
                  </Link>
                </div>
              </MenuItem>
              <MenuItem className="p-0 ">
                <div hidden={userRoleId === "ADMIN"}>
                  <Link
                    to="/documentovendedoralcalde"
                    className="flex items-center  gap-4 px-4 py-2  "
                  >
                    <RiBankFill
                      className={`text-xl text-secundary ${
                        location.pathname === "/documentovendedoralcalde"
                          ? " "
                          : ""
                      }`}
                    />
                    Documento Vendedor
                  </Link>
                </div>
              </MenuItem>
            </Menu>
          </ul>
        </nav>

        <nav className="flex items-center justify-between xl:gap-x-2">
          <Menu
            menuButton={
              <MenuButton className="relative hover:bg-tertiary-100 p-4 rounded-lg transition-colors">
                <RiNotification3Line className="h-6 w-6" />
                <span className="absolute top-2 right-3 bg-secundary py-0.5 px-[5px] text-white rounded-full text-[8px] font-bold">
                  {totalNotifications}
                </span>
              </MenuButton>
            }
            transition
            menuClassName="p-1 bg-transparent "
          >
            {notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className="flex items-center  rounded-lg  py-3 px-7 mb-2 bg-secundary cursor-pointer w-full h-full hover:bg-blue-700 transition-colors"
              >
                <div className="flex gap-1 items-center  w-full ">
                  <div className="bg-white/20 rounded-full w-auto p-3">
                    <RiQuestionAnswerFill className="h-6 w-6 text-white   " />
                  </div>
                  <div className="flex-col flex  ">
                    <span className="text-sm text-white text-center bg-white/10 rounded-full mb-1">
                      {notification.titulo}
                    </span>
                    <span className="text-sm text-white text-center bg-white/10 rounded-full px-2">
                      {notification.descripcion}
                    </span>
                  </div>
                </div>
              </MenuItem>
            ))}
            {reminderNotifications.map((reminder) => (
              <MenuItem
                key={reminder.id}
                onClick={() => handleNotificationClickReminder(reminder.id)}
                className="flex items-center rounded-lg py-3 px-7 mb-2 bg-yellow-500 cursor-pointer w-full h-full hover:bg-yellow-600 transition-colors"
              >
                <div className="flex gap-1 items-center w-full">
                  <div className="bg-white/20 rounded-full w-auto p-3">
                    <RiCalendarTodoFill className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-col flex">
                    <span className="text-sm text-white text-center bg-white/10 rounded-full mb-1">
                      {reminder.titulo}
                    </span>
                    <span className="text-sm text-white text-center bg-white/10 rounded-full px-2">
                      {reminder.descripcion}
                    </span>
                  </div>
                </div>
              </MenuItem>
            ))}

            {profileNotifications.map((profile) => (
              <MenuItem
                key={profile.id}
                onClick={() => handleNotificationClickProfile(profile.id)}
                className="flex items-center rounded-lg py-3 px-7 mb-2 bg-green-500 cursor-pointer w-full h-full hover:bg-green-600 transition-colors"
              >
                <div className="flex gap-1 items-center w-full">
                  <div className="bg-white/20 rounded-full w-auto p-3">
                    <RiUser6Fill className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-col flex">
                    <span className="text-sm text-white text-center bg-white/10 rounded-full mb-1">
                      {profile.titulo}
                    </span>
                    <span className="text-sm text-white text-center bg-white/10 rounded-full px-2">
                      {profile.descripcion}
                    </span>
                  </div>
                </div>
              </MenuItem>
            ))}
            {emailNotifications.map((email) => (
              <MenuItem
                key={email.id}
                onClick={() => handleNotificationClickEmail(email.id)}
                className="flex items-center rounded-lg py-3 px-7 mb-2 bg-red-500 cursor-pointer w-full h-full hover:bg-red-600 transition-colors"
              >
                <div className="flex gap-1 items-center w-full">
                  <div className="bg-white/20 rounded-full w-auto p-3">
                    <RiMailUnreadFill className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-col flex">
                    <span className="text-sm text-white text-center bg-white/10 rounded-full mb-1">
                      {email.titulo}
                    </span>
                    <span className="text-sm text-white text-center bg-white/10 rounded-full px-2">
                      {email.descripcion}
                    </span>
                  </div>
                </div>
              </MenuItem>
            ))}
          </Menu>

          <Menu
            menuButton={
              <MenuButton className="flex items-center gap-x-4 hover:bg-tertiary-100 py-2 xl:px-4 rounded-lg transition-colors">
                <img
                  src={imagen}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Avatar"
                />

              
              </MenuButton>
            }
            transition
            menuClassName="bg-tertiary-100 text-black p-4"
          >
            <MenuItem className="p-0 ">
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
              <Link
                to="/home"
                className="cursor-pointer bg-tertiary-300 relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-white w-full hover:text-green-500 h-9  px-3"
              >
                <svg
                  className="lucide lucide-home text-green-500 mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect x="3" y="3" width="18" height="14" rx="2" ry="2" />
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="7" y1="11" x2="7.01" y2="11" />
                  <line x1="11" y1="11" x2="11.01" y2="11" />
                  <line x1="15" y1="11" x2="15.01" y2="11" />
                </svg>
                <p hidden className="md:inline">
                  Landing Page
                </p>
              </Link>
            </MenuItem>
            <MenuItem className="p-0 hover:bg-transparent">
              <button
                onClick={removeToken}
                className="cursor-pointer bg-tertiary-300 relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-white w-full hover:text-red-500 h-9  px-3"
              >
                <svg
                  className="lucide lucide-logout text-red-500 mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 16l-4-4 4-4" />
                  <path d="M3 12h11" />
                  <path d="M20 19V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14" />
                </svg>
                Cerrar Sesión
              </button>
            </MenuItem>
          </Menu>
        </nav>
      </div>
    </header>
  );
};

export default Header;
