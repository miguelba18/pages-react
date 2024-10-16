import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
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
  RiMoneyDollarCircleFill,
  RiTeamFill,
  RiMailSendFill,
  RiArticleFill,
  RiFolderOpenFill,
  RiGroupFill,
} from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { IoFileTrayFull } from "react-icons/io5";
import useAuthToken from "../../views/hook/Token/useAuthToken";
const Sidebar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubMenuFactura, setShowSubMenuFactura] = useState(false);
  const [showSubMenuConsorcio, setShowSubMenuConsorcio] = useState(false);
  useState(false);
  const [showSubMenuDocumentos, setShowSubMenuDocumentos] = useState(false);
  const [showSubMenuVinculantes, setShowSubMenuVinculantes] = useState(false);
  const { token } = useAuthToken();

  const location = useLocation();
  const navigate = useNavigate();
  const [userRoleId, setUserRoleId] = useState(null);

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

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-scroll h-full w-[80%] md:w-[40%] lg:w-[30%] xl:w-full fixed xl:static top-0 bg-tertiary-100 p-4 flex flex-col justify-between z-50 transition-all duration-500 ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        <div className="">
          <div className="flex mb-4 ">
            <div className=" rounded-md bg-primary w-full flex justify-center items-center pb-2">
              <RiAppsFill className="text-white mt-2 h-6 w-6 mr-2" />
              <h1 className=" text-2xl font-normal   ">
                {userRoleId === "ADMIN" && (
                  <span className="text-white">
                    SIM ADMIN<span className="text-4xl ">.</span>
                  </span>
                )}
                {userRoleId === "Alcalde" && (
                  <span className="text-white">
                    SIM Alcalde
                    <span className="text-4xl text-secundary">.</span>
                  </span>
                )}
                {userRoleId === "Secretario" && (
                  <span className="text-white">
                    SIM Secretario
                    <span className="text-4xl text-secundary">.</span>
                  </span>
                )}
                {userRoleId === "Personal" && (
                  <span className="text-white">
                    SIM Personal
                    <span className="text-4xl text-secundary">.</span>
                  </span>
                )}
              </h1>
            </div>
          </div>
          <hr className="mb-4 border-blue-500"></hr>
          <nav>
            <ul className="list-none">
              {userRoleId === "ADMIN" && (
                <>
                  <button
                    onClick={() => setShowSubMenu(!showSubMenu)}
                    className="flex items-center w-full mb-2  gap-2 px-3 py-2 hover:bg-tertiary-900 rounded-lg  "
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
                      location.pathname === "/enviarcorreos"
                        ? "bg-secundary text-white rounded-lg"
                        : "rounded-lg hover:bg-tertiary-900 transition-colors "
                    }
                  >
                    <Link
                      to="/enviarcorreos"
                      className="flex items-center  gap-4 px-4 py-2 mb-2"
                    >
                      <RiMailSendFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/enviarcorreos"
                            ? "text-white"
                            : ""
                        }`}
                      />
                      Enviar Correos
                    </Link>
                  </li>

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
                          location.pathname === "/inquietud" ? "text-white" : ""
                        }`}
                      />
                      Inquietudes
                    </Link>
                  </li>

                  <button
                    onClick={() =>
                      setShowSubMenuVinculantes(!showSubMenuVinculantes)
                    }
                    className="flex items-center xl:justify-between  gap-2 px-3 py-2 hover:bg-tertiary-900 rounded-lg w-full  "
                  >
                    <RiGroupFill className="text-xl text-secundary mr-4" />
                    Vinculantes
                    <RiArrowDropRightLine
                      className={`text-3xl ${
                        showSubMenuVinculantes && "rotate-90"
                      }`}
                    />
                  </button>

                  <ul
                    className={`my-2 ${!showSubMenuVinculantes && "hidden"} `}
                  >
                    <li
                      className={
                        location.pathname === "/agrupadasadquiriente"
                          ? "bg-secundary text-white rounded-lg  "
                          : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                      }
                    >
                      <Link
                        to="/agrupadasadquiriente"
                        className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[22%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                      >
                        <RiShakeHandsFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/agrupadasadquiriente"
                              ? "text-white "
                              : ""
                          }`}
                        />
                        Comprador ubicado en el Municipio
                      </Link>
                    </li>
                    <li
                      className={
                        location.pathname === "/agrupadasemisor"
                          ? "bg-secundary text-white rounded-lg "
                          : "hover:bg-tertiary-900 transition-colors text-gray-500  rounded-lg"
                      }
                    >
                      <Link
                        to="/agrupadasemisor"
                        className="flex items-center  gap-4 px-4 py-2 mb-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                      >
                        <RiBankFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/agrupadasemisor"
                              ? "text-white"
                              : ""
                          }`}
                        />
                        Vendedor Ubicado en el municipio
                      </Link>
                    </li>
                  </ul>

                  <button
                    onClick={() =>
                      setShowSubMenuConsorcio(!showSubMenuConsorcio)
                    }
                    className="flex items-center xl:justify-between  gap-2 px-3 py-2 hover:bg-tertiary-900 rounded-lg w-full  "
                  >
                    <RiTeamFill className="text-xl text-secundary mr-4" />
                    No Vinculantes
                    <RiArrowDropRightLine
                      className={`text-3xl ${
                        showSubMenuConsorcio && "rotate-90"
                      }`}
                    />
                  </button>

                  <ul className={`my-2 ${!showSubMenuConsorcio && "hidden"} `}>
                    <li
                      className={
                        location.pathname === "/consorcios"
                          ? "bg-secundary text-white rounded-lg  "
                          : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                      }
                    >
                      <Link
                        to="/consorcios"
                        className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                      >
                        <IoFileTrayFull
                          className={`text-xl text-secundary ${
                            location.pathname === "/consorcios"
                              ? "text-white "
                              : ""
                          }`}
                        />
                        Todos los no Vinculantes
                      </Link>
                    </li>

                    <li
                      className={
                        location.pathname === "/consorcioclientemunicipio"
                          ? "bg-secundary text-white rounded-lg  "
                          : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                      }
                    >
                      <Link
                        to="/consorcioclientemunicipio"
                        className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[22%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                      >
                        <RiShakeHandsFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/consorcioclientemunicipio"
                              ? "text-white "
                              : ""
                          }`}
                        />
                        No Vinculante Cliente
                      </Link>
                    </li>
                    <li
                      className={
                        location.pathname === "/consorciovendedormunicipio"
                          ? "bg-secundary text-white rounded-lg "
                          : "hover:bg-tertiary-900 transition-colors text-gray-500  rounded-lg"
                      }
                    >
                      <Link
                        to="/consorciovendedormunicipio"
                        className="flex items-center  gap-4 px-4 py-2 mb-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                      >
                        <RiBankFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/consorciovendedormunicipio"
                              ? "text-white"
                              : ""
                          }`}
                        />
                        No Vinculante Vendedor
                      </Link>
                    </li>
                  </ul>

                  <button
                    onClick={() => setShowSubMenuFactura(!showSubMenuFactura)}
                    className="flex items-center xl:justify-between w-full  gap-8 px-4 py-2 hover:bg-tertiary-900 rounded-lg  "
                  >
                    <RiBillFill className="text-xl text-secundary xl:h-8 xl:w-8" />
                    Documento Electronico
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
                        className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[35%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                      >
                        <MdManageAccounts
                          className={`text-xl text-secundary ${
                            location.pathname === "/administrarfacturas"
                              ? "text-white"
                              : ""
                          }`}
                        />
                        Administrar Documentos electronicos
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
                        className="flex items-center  gap-4 px-4 py-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[22%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                      >
                        <RiAddCircleFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/facturaelectronica"
                              ? "text-white"
                              : ""
                          }`}
                        />
                        Agregar Facturas
                      </Link>
                    </li>

                    <li
                      className={
                        location.pathname === "/facturacompletatodas"
                          ? "bg-secundary text-white rounded-lg"
                          : "rounded-lg hover:bg-tertiary-900 transition-colors "
                      }
                    >
                      <Link
                        to="/facturacompletatodas"
                        className="flex items-center  gap-4 px-4 py-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[35%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                      >
                        <IoFileTrayFull
                          className={`text-xl text-secundary ${
                            location.pathname === "/facturacompletatodas"
                              ? "text-white"
                              : ""
                          }`}
                        />
                        Todos los documentos electronicos
                      </Link>
                    </li>
                    <li
                      className={
                        location.pathname === "/facturacompleta"
                          ? "bg-secundary text-white rounded-lg"
                          : "rounded-lg hover:bg-tertiary-900 transition-colors "
                      }
                    >
                      <Link
                        to="/facturacompleta"
                        className="flex items-center  gap-4 px-4 py-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[35%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                      >
                        <IoFileTrayFull
                          className={`text-xl text-secundary ${
                            location.pathname === "/facturacompleta"
                              ? "text-white"
                              : ""
                          }`}
                        />
                        Documento Electronico Municipio
                      </Link>
                    </li>
                  </ul>
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
                        location.pathname === "/enviarcorreoalcalde"
                          ? "bg-secundary text-white rounded-lg"
                          : "rounded-lg hover:bg-tertiary-900 transition-colors "
                      }
                    >
                      <Link
                        to="/enviarcorreoalcalde"
                        className="flex items-center  gap-4 px-4 py-2 mb-2"
                      >
                        <RiMailSendFill
                          className={`text-xl text-secundary ${
                            location.pathname === "/enviarcorreoalcalde"
                              ? "text-white"
                              : ""
                          }`}
                        />
                        Enviar Correos
                      </Link>
                    </li>
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
                  location.pathname === "/contribuyente"
                    ? "bg-secundary text-white rounded-lg"
                    : "rounded-lg hover:bg-tertiary-900 transition-colors "
                }
              >
                <Link
                  to="/contribuyente"
                  className="flex items-center  gap-4 px-4 py-2 mb-2"
                >
                  <RiMoneyDollarCircleFill
                    className={`text-xl text-secundary ${
                      location.pathname === "/contribuyente" ? "text-white" : ""
                    }`}
                  />
                  Contribuyente
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

              <div hidden={userRoleId === "ADMIN"}>
                <button
                  onClick={() =>
                    setShowSubMenuVinculantes(!showSubMenuVinculantes)
                  }
                  className="flex items-center xl:justify-between  gap-2 px-3 py-2 hover:bg-tertiary-900 rounded-lg w-full  "
                >
                  <RiGroupFill className="text-xl text-secundary mr-4" />
                  Vinculantes
                  <RiArrowDropRightLine
                    className={`text-3xl ${
                      showSubMenuVinculantes && "rotate-90"
                    }`}
                  />
                </button>

                <ul className={`my-2 ${!showSubMenuVinculantes && "hidden"} `}>
                  <li
                    className={
                      location.pathname === "/agrupadasadquirientealcalde"
                        ? "bg-secundary text-white rounded-lg  "
                        : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                    }
                  >
                    <Link
                      to="/agrupadasadquirientealcalde"
                      className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[22%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                    >
                      <RiShakeHandsFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/agrupadasadquirientealcalde"
                            ? "text-white "
                            : ""
                        }`}
                      />
                      Comprador ubicado en el Municipio
                    </Link>
                  </li>
                  <li
                    className={
                      location.pathname === "/agrupadasemisoralcalde"
                        ? "bg-secundary text-white rounded-lg "
                        : "hover:bg-tertiary-900 transition-colors text-gray-500  rounded-lg"
                    }
                  >
                    <Link
                      to="/agrupadasemisoralcalde"
                      className="flex items-center  gap-4 px-4 py-2 mb-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                    >
                      <RiBankFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/agrupadasemisoralcalde"
                            ? "text-white"
                            : ""
                        }`}
                      />
                      Vendedor Ubicado en el municipio
                    </Link>
                  </li>
                </ul>
              </div>

              <div hidden={userRoleId === "ADMIN"}>
                <button
                  onClick={() => setShowSubMenuFactura(!showSubMenuFactura)}
                  className="flex items-center xl:justify-between w-full  gap-8 px-4 py-2 hover:bg-tertiary-900 rounded-lg  "
                >
                  <RiBillFill className="text-xl text-secundary xl:h-8 xl:w-8" />
                  Documento Electronico
                  <RiArrowDropRightLine
                    className={`text-3xl ${showSubMenuFactura && "rotate-90"}`}
                  />
                </button>

                <ul className={`my-2 ${!showSubMenuFactura && "hidden"} `}>
                  <li
                    className={
                      location.pathname === "/facturaelectronica"
                        ? "bg-secundary text-white rounded-lg"
                        : "rounded-lg hover:bg-tertiary-900 transition-colors "
                    }
                  >
                    <Link
                      to="/facturaelectronica"
                      className="flex items-center  gap-4 px-4 py-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[22%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                    >
                      <RiAddCircleFill
                        className={`text-xl text-secundary ${
                          location.pathname === "/facturaelectronica"
                            ? "text-white"
                            : ""
                        }`}
                      />
                      Agregar Facturas
                    </Link>
                  </li>

                  <li
                    className={
                      location.pathname === "/facturacompletatodas"
                        ? "bg-secundary text-white rounded-lg"
                        : "rounded-lg hover:bg-tertiary-900 transition-colors "
                    }
                  >
                    <Link
                      to="/facturacompletatodas"
                      className="flex items-center  gap-4 px-4 py-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[35%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                    >
                      <IoFileTrayFull
                        className={`text-xl text-secundary ${
                          location.pathname === "/facturacompletatodas"
                            ? "text-white"
                            : ""
                        }`}
                      />
                      Todos los documentos electronicos
                    </Link>
                  </li>
                  <li
                    className={
                      location.pathname === "/facturacompletaalcalde"
                        ? "bg-secundary text-white rounded-lg"
                        : "rounded-lg hover:bg-tertiary-900 transition-colors "
                    }
                  >
                    <Link
                      to="/facturacompletaalcalde"
                      className="flex items-center  gap-4 px-4 py-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[35%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                    >
                      <IoFileTrayFull
                        className={`text-xl text-secundary ${
                          location.pathname === "/facturacompletaalcalde"
                            ? "text-white"
                            : ""
                        }`}
                      />
                      Documento Electronico Municipio
                    </Link>
                  </li>
                </ul>
              </div>

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
              <div>
                <button
                  onClick={() =>
                    setShowSubMenuDocumentos(!showSubMenuDocumentos)
                  }
                  className="flex items-center   gap-2 px-3 py-2 hover:bg-tertiary-900 rounded-lg w-full  "
                >
                  <RiArticleFill className="text-xl text-secundary" />
                  Documento Soporte
                  <RiArrowDropRightLine
                    className={`text-3xl ${
                      showSubMenuDocumentos && "rotate-90"
                    }`}
                  />
                </button>
              </div>

              <ul className={`my-2 ${!showSubMenuDocumentos && "hidden"} `}>
                <li
                  className={
                    location.pathname === "/documentosoporte"
                      ? "bg-secundary text-white rounded-lg  "
                      : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                  }
                >
                  <Link
                    to="/documentosoporte"
                    className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[22%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                  >
                    <RiFolderOpenFill
                      className={`text-xl text-secundary ${
                        location.pathname === "/documentosoporte"
                          ? "text-white "
                          : ""
                      }`}
                    />
                    Documentos
                  </Link>
                </li>

                <li
                  hidden={
                    userRoleId === "Secretario" ||
                    userRoleId === "Alcalde" ||
                    userRoleId === "Personal"
                  }
                  className={
                    location.pathname === "/documentocomprador"
                      ? "bg-secundary text-white rounded-lg  "
                      : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                  }
                >
                  <Link
                    to="/documentocomprador"
                    className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                  >
                    <RiShakeHandsFill
                      className={`text-xl text-secundary ${
                        location.pathname === "/documentocomprador"
                          ? "text-white "
                          : ""
                      }`}
                    />
                    Documento Comprador
                  </Link>
                </li>

                <li
                  hidden={
                    userRoleId === "Secretario" ||
                    userRoleId === "Alcalde" ||
                    userRoleId === "Personal"
                  }
                  className={
                    location.pathname === "/documentovendedor"
                      ? "bg-secundary text-white rounded-lg  "
                      : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                  }
                >
                  <Link
                    to="/documentovendedor"
                    className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                  >
                    <RiBankFill
                      className={`text-xl text-secundary ${
                        location.pathname === "/documentovendedor"
                          ? "text-white "
                          : ""
                      }`}
                    />
                    Documento Vendedor
                  </Link>
                </li>

                <li
                  hidden={userRoleId === "ADMIN"}
                  className={
                    location.pathname === "/documentocompradoralcalde"
                      ? "bg-secundary text-white rounded-lg  "
                      : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                  }
                >
                  <Link
                    to="/documentocompradoralcalde"
                    className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                  >
                    <RiShakeHandsFill
                      className={`text-xl text-secundary ${
                        location.pathname === "/documentocompradoralcalde"
                          ? "text-white "
                          : ""
                      }`}
                    />
                    Documento Comprador
                  </Link>
                </li>

                <li
                  hidden={userRoleId === "ADMIN"}
                  className={
                    location.pathname === "/documentovendedoralcalde"
                      ? "bg-secundary text-white rounded-lg  "
                      : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                  }
                >
                  <Link
                    to="/documentovendedoralcalde"
                    className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                  >
                    <RiBankFill
                      className={`text-xl text-secundary ${
                        location.pathname === "/documentovendedoralcalde"
                          ? "text-white "
                          : ""
                      }`}
                    />
                    Documento Vendedor
                  </Link>
                </li>
              </ul>
              <div hidden={userRoleId === "ADMIN"}>
                <button
                  onClick={() => setShowSubMenuConsorcio(!showSubMenuConsorcio)}
                  className="flex items-center xl:justify-between  gap-2 px-3 py-2 hover:bg-tertiary-900 rounded-lg w-full  "
                >
                  <RiTeamFill className="text-xl text-secundary" />
                  No Vinculantes
                  <RiArrowDropRightLine
                    className={`text-3xl ${
                      showSubMenuConsorcio && "rotate-90"
                    }`}
                  />
                </button>
              </div>

              <ul
                hidden={userRoleId === "ADMIN"}
                className={`my-2 ${!showSubMenuConsorcio && "hidden"} `}
              >
                <li
                  className={
                    location.pathname === "/consorciosalcalde"
                      ? "bg-secundary text-white rounded-lg  "
                      : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                  }
                >
                  <Link
                    to="/consorciosalcalde"
                    className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                  >
                    <IoFileTrayFull
                      className={`text-xl text-secundary ${
                        location.pathname === "/consorciosalcalde"
                          ? "text-white "
                          : ""
                      }`}
                    />
                    Todos los no Vinculantes
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === "/clientealcalde"
                      ? "bg-secundary text-white rounded-lg  "
                      : "hover:bg-tertiary-900 transition-colors  rounded-lg text-gray-500"
                  }
                >
                  <Link
                    to="/clientealcalde"
                    className="flex items-center  gap-4 px-4 py-2  border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[22%] before:translate-y-1/2 before:border-2 before:border-tertiary-100"
                  >
                    <RiShakeHandsFill
                      className={`text-xl text-secundary ${
                        location.pathname === "/clientealcalde"
                          ? "text-white "
                          : ""
                      }`}
                    />
                    No Vinculante Cliente
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/vendedoralcalde"
                      ? "bg-secundary text-white rounded-lg "
                      : "hover:bg-tertiary-900 transition-colors text-gray-500  rounded-lg"
                  }
                >
                  <Link
                    to="/vendedoralcalde"
                    className="flex items-center  gap-4 px-4 py-2 mb-2 border-l-2 border-secundary ml-6 relative before:w-3 before:h-3 before:absolute before:bg-secundary before:rounded-full before:-left-[6.5px] before:top-[32%] before:translate-y-1/2  before:border-2 before:border-tertiary-100"
                  >
                    <RiBankFill
                      className={`text-xl text-secundary ${
                        location.pathname === "/vendedoralcalde"
                          ? "text-white"
                          : ""
                      }`}
                    />
                    No Vinculante Vendedor
                  </Link>
                </li>
              </ul>
            </ul>
          </nav>
        </div>
        <nav>
          <hr className="border-gray-300 my-4" />
          <a
            href="https://www.dian.gov.co/"
            target="BLANK"
            className="flex mb-2  items-center w-full gap-4 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#4596ed] to-[#1285bb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#0470b3]"
          >
            <RiPagesFill className="text-white" />
            DIAN
          </a>
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
