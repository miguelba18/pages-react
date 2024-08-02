import { Link } from "react-router-dom";
import useAuthToken from "../../views/hook/Token/useAuthToken";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import {
  RiNotification3Line,
  RiArrowDownSLine,
  RiQuestionAnswerFill,
  RiCalendarTodoFill,
  RiUser6Fill,
} from "react-icons/ri";

import useListNotificacion from "../../views/hook/Notificaciones/useListNotificacion";

import useDeleteNotificacionReminder from "../../views/hook/Notificaciones/Recordatorio/useDeleteNotificacionReminder";
import useDeleteNotificacion from "../../views/hook/Notificaciones/Inquietud/useDeleteNotificacion";
import useDeleteNotificacionProfile from "../../views/hook/Notificaciones/Perfil/useDeleteNotificacionProfile";

const Header = () => {
  const { handleNotificationClick } = useDeleteNotificacion();
  const { handleNotificationClickReminder } = useDeleteNotificacionReminder();
  const { handleNotificationClickProfile } = useDeleteNotificacionProfile();
  const {
    userName,
    email,
    imagen,
    notifications,
    reminderNotifications,
    profileNotifications,
  } = useListNotificacion();
  const totalNotifications =
    notifications.length +
    reminderNotifications.length +
    profileNotifications.length;
  const { removeToken } = useAuthToken();

  return (
    <header className="xl:h-[10vh] border-b border-tertiary-100 md:p-3 px-2  ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#06B6D4] h-9  px-3"
          >
            <svg
              className="lucide lucide-rocket text-cyan-500 dark:text-cyan-400"
              stroke="#06B6D4"
              fill="none"
              viewBox="0 0 24 24"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
            </svg>
            <p hidden className="md:inline">Dashboard</p>
          </Link>
          <a
            href="https://www.dian.gov.co/impuestos/factura-electronica/documentacion/Paginas/estatuto-tributario.aspx"
            target="BLANK"
            className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 px-3"
          >
            <svg
              className="lucide lucide-newspaper text-blue-400 dark:text-blue-600"
              stroke="#60A5FA"
              fill="none"
              viewBox="0 0 24 24"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
              <path d="M18 14h-8"></path>
              <path d="M15 18h-5"></path>
              <path d="M10 6h8v4h-8V6Z"></path>
            </svg>
            <p hidden className="md:inline">Articulos</p>
          </a>
          <a
            href="https://www.dian.gov.co/Paginas/AgendaEventos.aspx"
            target="BLANK"
            className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#FACC14] h-9  px-3"
          >
            <svg
              className="lucide lucide-sticky-note text-yellow-400 dark:text-yellow-600"
              stroke="#FACC14"
              fill="none"
              viewBox="0 0 24 24"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"></path>
              <path d="M15 3v6h6"></path>
            </svg>
            <p hidden className="md:inline">Eventos</p>
          </a>
          <a
            href="https://www.dian.gov.co/Calendarios/Calendario_Tributario_2024.pdf"
            target="BLANK"
            className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#FB923C] h-9  px-3"
          >
            <svg
              className="lucide lucide-star text-orange-400 dark:text-orange-600"
              stroke="#FB923C"
              fill="#FB923C"
              viewBox="0 0 24 24"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <p hidden className="md:inline">Renta</p>
          </a>
          <Link
            to="/home"
            className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-green-500 h-9  px-3"
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
            <p hidden className="md:inline">Landing Page</p>
          </Link>
          
          
        </div>

        <nav className="flex items-center xl:gap-x-2">
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
