import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RiDashboardFill,
  RiLogoutBoxLine,
  RiCalendarTodoFill,
  RiUser6Fill,
  RiAppsFill,
  RiPagesFill,
  RiAddCircleFill,
  RiMenu3Fill,
  RiCloseFill
  
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRoleId, setUserRoleId] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

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
  }, [navigate]);

  const LimpiarToken = () => {
    window.localStorage.removeItem("token");
    navigate("/home");
  };

  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        className={
          `xl:h-[100vh] overflow-y-scroll h-full w-[80%] md:w-[40%] lg:w-[30%] xl:w-full fixed xl:static top-0 bg-tertiary-100 p-8 flex flex-col justify-between z-50 transition-all duration-500 ${showMenu ? "left-0" : "-left-full"}`
        }
      >
        <div>
        <h1 className="text-center text-2xl font-normal mb-10 flex items-center ">
          <RiAppsFill className="text-secundary mr-4" />
          {userRoleId === "ADMIN" && <span>SIM Admin<span className="text-4xl text-secundary">.</span></span>}
          {userRoleId === "Alcalde" && <span>SIM Alcalde<span className="text-4xl text-secundary">.</span></span>}
          {userRoleId === "Secretario" && <span>SIM Secretario<span className="text-4xl text-secundary">.</span></span>}
          {userRoleId === "Personal" && <span>SIM Personal<span className="text-4xl text-secundary">.</span></span>}
        </h1>
          <nav>
            <ul className="list-none">

            {userRoleId === "ADMIN" && (
              <li className={location.pathname === '/alcalde' ? 'bg-secundary text-white rounded-lg ' : 'hover:bg-tertiary-900 transition-colors  rounded-lg' }>
              <Link
                to="/alcalde"
                className="flex items-center  gap-4 px-4 py-2 mb-2" 
              >
                <RiAddCircleFill className={`text-xl text-secundary ${location.pathname === '/alcalde' ? 'text-white' : ''}`} />
                Agregar Alcalde
              </Link>
              </li>
            )}

            {userRoleId === "Alcalde" && (
              <>
              <li className={location.pathname === '/secretario' ? 'bg-secundary text-white rounded-lg ' : ' rounded-lg hover:bg-tertiary-900 transition-colors' }>
                <Link
                  to="/secretario"
                  className="flex gap-4 items-center   px-4 py-2  mb-2"
                >
                  <RiAddCircleFill className={`text-xl text-secundary ${location.pathname === '/secretario' ? 'text-white' : ''}`} />
                  Agregar Secretario
                </Link>
                </li>

                <li className={location.pathname === '/personal' ? 'bg-secundary text-white rounded-lg' : 'rounded-lg hover:bg-tertiary-900 transition-colors ' }>
                <Link
                  to="/personal"
                  className="flex items-center  gap-4 px-4 py-2  mb-2"
                >
                  <RiAddCircleFill className={`text-xl text-secundary ${location.pathname === '/personal' ? 'text-white' : ''}`} />
                  Agregar Personal
                </Link>
                </li>
                
              </>
            )}
            <li className={location.pathname === '/' ? 'bg-secundary text-white rounded-lg' : 'rounded-lg hover:bg-tertiary-900 transition-colors ' }>
            <Link
              to="/"
              className="flex items-center  gap-4 px-4 py-2 mb-2"
            >
              <RiDashboardFill className={`text-xl text-secundary ${location.pathname === '/' ? 'text-white' : ''}`} />
              Dashboard
            </Link>
            </li>

            <li className={location.pathname === '/calendario' ? 'bg-secundary text-white rounded-lg' : 'rounded-lg hover:bg-tertiary-900 transition-colors ' }>
            <Link
              to="/calendario"
              className="flex items-center  gap-4 px-4 py-2 mb-2"
            >
              <RiCalendarTodoFill className={`text-xl text-secundary ${location.pathname === '/calendario' ? 'text-white' : ''}`} />
              Calendario
            </Link>
            </li>

            <li className={location.pathname === '/perfil' ? 'bg-secundary text-white rounded-lg' : 'rounded-lg hover:bg-tertiary-900 transition-colors ' }>
            <Link
              to="/perfil"
              className="flex items-center  gap-4 px-4 py-2  mb-2"
            >
              <RiUser6Fill className={`text-xl text-secundary ${location.pathname === '/perfil' ? 'text-white' : ''}`} />
              Perfil
            </Link>
            </li>
            </ul>
          </nav>
        </div>
        <nav>
        <button className="flex items-center gap-4 px-4 py-2 rounded-lg bg-secundary/70 hover:bg-secundary hover:text-white transition-colors mb-2">
          <RiPagesFill className="text-white" />
          <Link to={"/home"} className=" text-white  ">Landing Page</Link>
        </button>
        
          <button
            onClick={LimpiarToken}
            className="flex items-center  gap-4 px-4 py-2 rounded-lg hover:bg-tertiary-900 transition-colors"
          >
            <RiLogoutBoxLine className="text-secundary" />
            Cerrar Sesión
          </button>
        </nav>
      </div>

      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden fixed bottom-4 right-4 bg-secundary text-white p-3 rounded-full z-50 mr-2"
      >
        {showMenu ? <RiCloseFill />: <RiMenu3Fill /> }
        
      </button>
    </>
  );
};

export default Sidebar;
