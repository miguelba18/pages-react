
import { Link,  } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { RiNotification3Line, RiArrowDownSLine, RiQuestionAnswerFill,RiCalendarTodoFill,RiUser6Fill } from "react-icons/ri";
import DarkModeSwitch from "../Darkmode/DarkModeSwitch";
import useListNotificacion from "../../views/hook/Notificaciones/useListNotificacion";

import useDeleteNotificacionReminder from "../../views/hook/Notificaciones/Recordatorio/useDeleteNotificacionReminder";
import useDeleteNotificacion from "../../views/hook/Notificaciones/Inquietud/useDeleteNotificacion";
import useDeleteNotificacionProfile from "../../views/hook/Notificaciones/Perfil/useDeleteNotificacionProfile";

const Header = () => {
  const { handleNotificationClick} = useDeleteNotificacion();
  const { handleNotificationClickReminder} = useDeleteNotificacionReminder();
  const { handleNotificationClickProfile} = useDeleteNotificacionProfile();
  const {userName, email, imagen, notifications, reminderNotifications, profileNotifications} = useListNotificacion();
  const totalNotifications = notifications.length + reminderNotifications.length + profileNotifications.length;

  

  
  return (
    <header className="xl:h-[10vh] border-b border-tertiary-100 md:p-3 px-2  ">
      <div className="flex justify-between items-center">
        <h1 className="font-normal md:text-4xl">Dashboard Overview</h1>

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
              <DarkModeSwitch />
            </MenuItem>
          </Menu>
        </nav>
      </div>
    </header>
  );
};

export default Header;
