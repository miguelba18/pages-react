import useAuthToken from "../../../hook/Token/useAuthToken";
import { useState } from "react";
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri";
import useSelectCityDepaUtils from "../../../../utils/useSelectCityDepaUtils";
import { toast } from "react-toastify";

const RegistroAdmin = () => {
  const { token } = useAuthToken();
  const {
    departamentos,
    filteredCiudades,
    selectedDepartamento,
    selectedCiudad,
    handleDepartamentoChange,
    handleCiudadChange,
    setSelectedCiudad,
    setSelectedDepartamento,
  } = useSelectCityDepaUtils();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    email: "",
    password: "",
    departamentoId: "",
    ciudadId: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      departamentoId: selectedDepartamento,
      ciudadId: selectedCiudad,
    };

    try {
      const response = await fetch("http://localhost:8080/api/V1/auth/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message, { autoClose: 2000 });
        setFormData({
          nombre: "",
          apellido: "",
          cedula: "",
          telefono: "",
          email: "",
          password: "",
        });
        setSelectedCiudad("");
        setSelectedDepartamento("");
      } else {
        const result = await response.json();
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div className="xl:p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Ingreso de admin</h1>
      <div className="flex justify-center items-center">
        <div className="md:p-10 xl:w-[50%] w-[100%]">
          <form
            className="shadow-2xl shadow-blue-500 rounded-2xl  py-10 bg-tertiary-100 px-[20%]"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center">
            <img
              src="../../../../../../src/assets/img/fondologin.png"
              alt=""
              className="mb-0 rounded-2xl w-[60%] h-1/2 "
            /></div>
            <h4 className="text-center text-[#FF432A] text-2xl font-bold py-8">
              Registro de Admin Nuevo
            </h4>

            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-blue-500 text-sm font-bold mb-2"
              >
                Nombre:
              </label>
              <input
                type="text"
                name="nombre"
                required
                className="border-b px-2 border-black  py-1 bg-tertiary-100 w-full focus:outline-none focus:border-blue-500 text-black placeholder-black placeholder-opacity-70"
                onChange={handleChange}
                value={formData.nombre}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="apellido"
                className="block text-blue-500 text-sm font-bold mb-2"
              >
                Apellido:
              </label>
              <input
                type="text"
                name="apellido"
                className="border-b px-2 border-black  py-1 bg-tertiary-100 w-full focus:outline-none focus:border-blue-500 text-black placeholder-black placeholder-opacity-70"
                required
                onChange={handleChange}
                value={formData.apellido}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="cedula"
                className="block text-blue-500 text-sm font-bold mb-2"
              >
                Cédula:
              </label>
              <input
                type="number"
                name="cedula"
                className="border-b px-2 border-black  py-1 bg-tertiary-100 w-full focus:outline-none focus:border-blue-500 text-black placeholder-black placeholder-opacity-70"
                required
                onChange={handleChange}
                value={formData.cedula}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="telefono"
                className="block text-blue-500 text-sm font-bold mb-2"
              >
                Teléfono:
              </label>
              <input
                type="number"
                name="telefono"
                className="border-b px-2 border-black  py-1 bg-tertiary-100 w-full focus:outline-none focus:border-blue-500 text-black placeholder-black placeholder-opacity-70"
                required
                onChange={handleChange}
                value={formData.telefono}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-blue-500 text-sm font-bold mb-2"
              >
                Correo electrónico:
              </label>
              <input
                type="email"
                name="email"
                className="border-b px-2 border-black  py-1 bg-tertiary-100 w-full focus:outline-none focus:border-blue-500 text-black placeholder-black placeholder-opacity-70"
                required
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-blue-500 text-sm font-bold mb-2"
              >
                Contraseña:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="border-b px-2 border-black  py-1 bg-tertiary-100 w-full focus:outline-none focus:border-blue-500 text-black placeholder-black placeholder-opacity-70"
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  {showPassword ? (
                    <RiEyeOffFill
                      className="cursor-pointer text-blue-500"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <RiEyeFill
                      className="cursor-pointer text-blue-500"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-blue-500 text-sm font-bold mb-2">
                Departamento
              </label>
              <select
                value={selectedDepartamento}
                onChange={(e) => {
                  handleDepartamentoChange(e);
                  setFormData({
                    ...formData,
                    departamentoId: e.target.value,
                  });
                }}
                className="mb-4 text-secundary border-b px-2 border-black py-1 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
              >
                <option value="">Selecciona un departamento</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.id} value={departamento.id}>
                    {departamento.departamento}
                  </option>
                ))}
              </select>

              <label
                htmlFor="ciudad"
                className="block text-blue-500 text-sm font-bold mb-2"
              >
                Ciudad:
              </label>
              <select
                value={selectedCiudad}
                onChange={(e) => {
                  handleCiudadChange(e);
                  setFormData({
                    ...formData,
                    ciudadId: e.target.value,
                  });
                }}
                disabled={!selectedDepartamento}
                className="border-b px-2 text-secundary border-black py-1 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
              >
                <option value="">Selecciona una ciudad</option>
                {filteredCiudades.map((ciudad) => (
                  <option key={ciudad.id} value={ciudad.id}>
                    {ciudad.ciudad}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="flex justify-center items-center gap-2 px-3 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb8871] via-[#e15e1d] to-[#be6e12] hover:shadow-xl hover:shadow-orange-500 hover:scale-105 duration-300 hover:from-[#be4612] hover:to-[#fba871]"
            >
              Guardar Administrador
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroAdmin;
