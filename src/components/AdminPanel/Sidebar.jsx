import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  RiDashboardFill,
  RiLogoutBoxLine,
  RiCalendarTodoFill,
  RiUser6Fill,
  RiAppsFill,
  RiPagesFill,
  RiAddCircleFill,
  RiMenu3Fill,
  RiCloseFill,
  RiFileList3Fill,
  RiAdminFill,
  RiArrowDropRightLine,
  RiBillFill,
  RiQuestionAnswerFill,
  RiShakeHandsFill,
  RiBankFill,
  RiArchiveFill,
} from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import useAuthToken from "../../views/hook/Token/useAuthToken";
const Sidebar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubMenuFactura, setShowSubMenuFactura] = useState(false);
  const { token } = useAuthToken();

  const location = useLocation();
  const navigate = useNavigate();
  const [userRoleId, setuserRoleId] = useState(null);

  useEffect(() => {


    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const roleId = decodedToken.role;

        setuserRoleId(roleId);
       
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        window.localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, token]);

  const LimpiarToken = () => {
    window.localStorage.removeItem("token");
    navigate("/home");
  };

  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-scroll h-full w-[80%] md:w-[40%] lg:w-[30%] xl:w-full fixed xl:static top-0 bg-tertiary-100 p-4 flex flex-col justify-between z-50 transition-all duration-500 ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        <div>
          <h1 className="text-center text-2xl font-normal mb-10 flex items-center ">
            <RiAppsFill className="text-secundary mr-4" />
            {userRoleId === "ADMIN" && (
              <span>
                SIM Admin<span className="text-4xl text-secundary">.</span>
              </span>
            )}
            {userRoleId === "Alcalde" && (
              <span>
                SIM Alcalde<span className="text-4xl text-secundary">.</span>
              </span>
            )}
            {userRoleId === "Secretario" && (
              <span>
                SIM Secretario<span className="text-4xl text-secundary">.</span>
              </span>
            )}
            {userRoleId === "Personal" && (
              <span>
                SIM Personal<span className="text-4xl text-secundary">.</span>
              </span>
            )}
          </h1>
          <nav>
            <ul className="list-none">
              {userRoleId === "ADMIN" && (
                <>
                  <li className="">
                    <button
                      onClick={() => setShowSubMenu(!showSubMenu)}
                      className="flex items-center  gap-2 px-3 py-2 hover:bg-tertiary-900 rounded-lg  "
                    >
                      <RiAdminFill className="text-xl text-secundary" />
                      Admin y Alcaldes
                      <RiArrowDropRightLine
                        className={`text-3xl ${showSubMenu && "rotate-90"}`}
                      />
                    </button>

                    <ul className={`my-2 ${!showSubMenu && "hidden"} `}>
                      <li
                        className={
                          location.pathname === "/registroadmin"
                            ? "bg-secundary text-white rounded-lg  "
                            : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                        }
                      >
                        <Link
                          to="/registroadmin"
                          className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[22%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                        >
                          <RiAddCircleFill
                            className={`text-xl text-secundary ${
                              location.pathname === "/registroadmin"
                                ? "text-white "
                                : ""
                            }`}
                          />
                          Agregar Admin
                        </Link>
                      </li>

                      <li
                        className={
                          location.pathname === "/alcalde"
                            ? "bg-secundary text-white rounded-lg  "
                            : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                        }
                      >
                        <Link
                          to="/alcalde"
                          className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[22%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                        >
                          <RiAddCircleFill
                            className={`text-xl text-secundary ${
                              location.pathname === "/alcalde"
                                ? "text-white "
                                : ""
                            }`}
                          />
                          Agregar Alcalde
                        </Link>
                      </li>
                      <li
                        className={
                          location.pathname === "/tablaadminalcalde"
                            ? "bg-secundary text-white rounded-lg "
                            : "hover:bg-tertiary-900 transition-colors text-gray-500  rounded-lg"
                        }
                      >
                        <Link
                          to="/tablaadminalcalde"
                          className="flex items-center  gap-4 px-4 py-2 mb-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                        >
                          <RiFileList3Fill
                            className={`text-xl text-secundary ${
                              location.pathname === "/tablaadminalcalde"
                                ? "text-white"
                                : ""
                            }`}
                          />
                          Ver Admin y Alcaldes
                        </Link>
                      </li>
                    </ul>

                    <li
                      className={
                        location.pathname === "/calendarioadmin"
                          ? "bg-secundary text-white rounded-lg"
                          : "rounded-lg hover:bg-tertiary-900 transition-colors "
                      }
                    >
                      <Link
                        to="/calendarioadmin"
                        className="flex items-center  gap-4 px-4 py-2 mb-2"
                      >
                        <RiCalendarTodoFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/calendarioadmin"
                              ? "text-white"
                              : ""
                          }`}
                        />
                        Calendario
                      </Link>
                    </li>
                    <li
                      className={
                        location.pathname === "/inquietud"
                          ? "bg-secundary text-white rounded-lg"
                          : "rounded-lg hover:bg-tertiary-900 transition-colors "
                      }
                    >
                      <Link
                        to="/inquietud"
                        className="flex items-center  gap-4 px-4 py-2 mb-2"
                      >
                        <RiQuestionAnswerFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/inquietud"
                              ? "text-white"
                              : ""
                          }`}
                        />
                        Inquietudes
                      </Link>
                    </li>

                    <button
                      onClick={() => setShowSubMenuFactura(!showSubMenuFactura)}
                      className="flex items-center w-full  gap-8 px-4 py-2 hover:bg-tertiary-900 rounded-lg  "
                    >
                      <RiAdminFill className="text-xl text-secundary" />
                      Facturas
                      <RiArrowDropRightLine
                        className={`text-3xl ${
                          showSubMenuFactura && "rotate-90"
                        }`}
                      />
                    </button>

                    <ul className={`my-2 ${!showSubMenuFactura && "hidden"} `}>
                      <li
                        className={
                          location.pathname === "/administrarfacturas"
                            ? "bg-secundary text-white rounded-lg"
                            : "rounded-lg hover:bg-tertiary-900 transition-colors "
                        }
                      >
                        <Link
                          to="/administrarfacturas"
                          className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                        >
                          <MdManageAccounts
                            className={`text-xl text-secundary ${
                              location.pathname === "/administrarfacturas"
                                ? "text-white"
                                : ""
                            }`}
                          />
                          Administrar Facturas
                        </Link>
                      </li>

                      <li
                        className={
                          location.pathname === "/facturaelectronica"
                            ? "bg-secundary text-white rounded-lg"
                            : "rounded-lg hover:bg-tertiary-900 transition-colors "
                        }
                      >
                        <Link
                          to="/facturaelectronica"
                          className="flex items-center  gap-4 px-4 py-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                        >
                          <RiBillFill
                            className={`text-xl text-secundary ${
                              location.pathname === "/facturaelectronica"
                                ? "text-white"
                                : ""
                            }`}
                          />
                          Factura Electronica
                        </Link>
                      </li>

                      <li
                        className={
                          location.pathname === "/facturasagrupadas"
                            ? "bg-secundary text-white rounded-lg"
                            : "rounded-lg hover:bg-tertiary-900 transition-colors "
                        }
                      >
                        <Link
                          to="/facturasagrupadas"
                          className="flex items-center  gap-4 px-4 py-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                        >
                          <RiArchiveFill
                            className={`text-xl text-secundary ${
                              location.pathname === "/facturasagrupadas"
                                ? "text-white"
                                : ""
                            }`}
                          />
                          Facturas Agrupadas
                        </Link>
                      </li>

                      <li
                        className={
                          location.pathname === "/adquiriente"
                            ? "bg-secundary text-white rounded-lg"
                            : "rounded-lg hover:bg-tertiary-900 transition-colors "
                        }
                      >
                        <Link
                          to="/adquiriente"
                          className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[22%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                        >
                          <RiShakeHandsFill
                            className={`text-xl text-secundary ${
                              location.pathname === "/adquiriente"
                                ? "text-white"
                                : ""
                            }`}
                          />
                          Adquiriente
                        </Link>
                      </li>

                      <li
                        className={
                          location.pathname === "/emisor"
                            ? "bg-secundary text-white rounded-lg"
                            : "rounded-lg hover:bg-tertiary-900 transition-colors "
                        }
                      >
                        <Link
                          to="/emisor"
                          className="flex items-center  gap-4 px-4 py-2 mb-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[22%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                        >
                          <RiBankFill
                            className={`text-xl text-secundary ${
                              location.pathname === "/emisor"
                                ? "text-white"
                                : ""
                            }`}
                          />
                          Emisor
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {userRoleId === "Alcalde" && (
                <>
                  <li>
                    <button
                      onClick={() => setShowSubMenu(!showSubMenu)}
                      className="flex items-center  gap-4 px-4 py-2 mb-2 hover:bg-tertiary-900 rounded-lg  "
                    >
                      <RiAdminFill className="text-xl text-secundary" />
                      Secretarios y Personal
                      <RiArrowDropRightLine
                        className={`text-3xl ${showSubMenu && "rotate-90"}`}
                      />
                    </button>

                    <ul className={`my-2 ${!showSubMenu && "hidden"} `}>
                      <li
                        className={
                          location.pathname === "/secretario"
                            ? "bg-secundary text-white rounded-lg "
                            : " rounded-lg hover:bg-tertiary-900 transition-colors"
                        }
                      >
                        <Link
                          to="/secretario"
                          className="flex items-center  gap-4 px-4 py-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                        >
                          <RiAddCircleFill
                            className={`text-xl text-secundary ${
                              location.pathname === "/secretario"
                                ? "text-white"
                                : ""
                            }`}
                          />
                          Agregar Secretario
                        </Link>
                      </li>

                      <li
                        className={
                          location.pathname === "/personal"
                            ? "bg-secundary text-white rounded-lg"
                            : "rounded-lg hover:bg-tertiary-900 transition-colors "
                        }
                      >
                        <Link
                          to="/personal"
                          className="flex items-center  gap-4 px-4 py-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                        >
                          <RiAddCircleFill
                            className={`text-xl text-secundary ${
                              location.pathname === "/personal"
                                ? "text-white"
                                : ""
                            }`}
                          />
                          Agregar Personal
                        </Link>
                      </li>

                      <li
                        className={
                          location.pathname === "/tabla"
                            ? "bg-secundary text-white rounded-lg "
                            : "hover:bg-tertiary-900 transition-colors  rounded-lg"
                        }
                      >
                        <Link
                          to="/tabla"
                          className="flex items-center  gap-4 px-4 py-2 mb-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                        >
                          <RiFileList3Fill
                            className={`text-xl xl:text-3xl text-secundary ${
                              location.pathname === "/tabla" ? "text-white" : ""
                            }`}
                          />
                          Ver Secretarios y Personal
                        </Link>
                      </li>
                    </ul>
                    <li
                      className={
                        location.pathname === "/calendarioalcalde"
                          ? "bg-secundary text-white rounded-lg"
                          : "rounded-lg hover:bg-tertiary-900 transition-colors "
                      }
                    >
                      <Link
                        to="/calendarioalcalde"
                        className="flex items-center  gap-4 px-4 py-2 mb-2"
                      >
                        <RiCalendarTodoFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/calendarioalcalde"
                              ? "text-white"
                              : ""
                          }`}
                        />
                        Calendario
                      </Link>
                    </li>
                  </li>
                </>
              )}

              <li
                className={
                  location.pathname === "/"
                    ? "bg-secundary text-white rounded-lg"
                    : "rounded-lg hover:bg-tertiary-900 transition-colors "
                }
              >
                <Link
                  to="/"
                  className="flex items-center  gap-4 px-4 py-2 mb-2"
                >
                  <RiDashboardFill
                    className={`text-xl text-secundary ${
                      location.pathname === "/" ? "text-white" : ""
                    }`}
                  />
                  Dashboard
                </Link>
              </li>

              {userRoleId === "Secretario" && (
                <>
                  <li
                    className={
                      location.pathname === "/calendarioalcalde"
                        ? "bg-secundary text-white rounded-lg"
                        : "rounded-lg hover:bg-tertiary-900 transition-colors "
                    }
                  >
                    <Link
                      to="/calendarioalcalde"
                      className="flex items-center  gap-4 px-4 py-2 mb-2"
                    >
                      <RiCalendarTodoFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/calendarioalcalde"
                            ? "text-white"
                            : ""
                        }`}
                      />
                      Calendario
                    </Link>
                  </li>
                </>
              )}

              {userRoleId === "Personal" && (
                <>
                  <li
                    className={
                      location.pathname === "/calendarioalcalde"
                        ? "bg-secundary text-white rounded-lg"
                        : "rounded-lg hover:bg-tertiary-900 transition-colors "
                    }
                  >
                    <Link
                      to="/calendarioalcalde"
                      className="flex items-center  gap-4 px-4 py-2 mb-2"
                    >
                      <RiCalendarTodoFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/calendarioalcalde"
                            ? "text-white"
                            : ""
                        }`}
                      />
                      Calendario
                    </Link>
                  </li>
                </>
              )}

              <li
                className={
                  location.pathname === "/facturaelectronica"
                    ? "bg-secundary text-white rounded-lg"
                    : "rounded-lg hover:bg-tertiary-900 transition-colors "
                }
                hidden={userRoleId === "ADMIN"}
              >
                <Link
                  to="/facturaelectronica"
                  className="flex items-center  gap-4 px-4 py-2 mb-2"
                >
                  <RiBillFill
                    className={`text-xl text-secundary ${
                      location.pathname === "/facturaelectronica"
                        ? "text-white"
                        : ""
                    }`}
                  />
                  Factura Electronica
                </Link>
              </li>

              <li
                className={
                  location.pathname === "/adquiriente"
                    ? "bg-secundary text-white rounded-lg"
                    : "rounded-lg hover:bg-tertiary-900 transition-colors "
                }
                hidden={userRoleId === "ADMIN"}
              >
                <Link
                  to="/adquiriente"
                  className="flex items-center  gap-4 px-4 py-2 mb-2"
                >
                  <RiShakeHandsFill
                    className={`text-xl text-secundary ${
                      location.pathname === "/adquiriente" ? "text-white" : ""
                    }`}
                  />
                  Adquiriente
                </Link>
              </li>

              <li
                className={
                  location.pathname === "/emisor"
                    ? "bg-secundary text-white rounded-lg"
                    : "rounded-lg hover:bg-tertiary-900 transition-colors "
                }
                hidden={userRoleId === "ADMIN"}
              >
                <Link
                  to="/emisor"
                  className="flex items-center  gap-4 px-4 py-2 mb-2"
                >
                  <RiBankFill
                    className={`text-xl text-secundary ${
                      location.pathname === "/emisor" ? "text-white" : ""
                    }`}
                  />
                  Emisor
                </Link>
              </li>

              <li
                className={
                  location.pathname === "/perfil"
                    ? "bg-secundary text-white rounded-lg"
                    : "rounded-lg hover:bg-tertiary-900 transition-colors "
                }
              >
                <Link
                  to="/perfil"
                  className="flex items-center  gap-4 px-4 py-2  mb-2"
                >
                  <RiUser6Fill
                    className={`text-xl text-secundary ${
                      location.pathname === "/perfil" ? "text-white" : ""
                    }`}
                  />
                  Perfil
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <nav>
          <button className="flex mb-2 justify-center items-center gap-4 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3]">
            <RiPagesFill className="text-white" />
            <Link to={"/home"} className=" text-white  ">
              Landing Page
            </Link>
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
        {showMenu ? <RiCloseFill /> : <RiMenu3Fill />}
      </button>
    </>
  );
};

export default Sidebar;
