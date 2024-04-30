import { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import EliminarAlcalde from "../../../hook/Editar/alcalde/eliminar";
import fetchData from "../../../hook/Editar/alcalde/listar";
import actualizarUsuario from "../../../hook/Editar/alcalde/editar";
import Modal from "../../../modal/Modal";

const Tabla = () => {
  const [localMayors, setLocalMayors] = useState([]);
  const [selectedMayor, setSelectedMayor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const openEditModal = (mayor) => {
    setSelectedMayor(mayor);
    setNombre(mayor.nombre);
    setApellido(mayor.apellido);
    setCedula(mayor.cedula);
    setTelefono(mayor.telefono);
    setEmail(mayor.email);
    setIsModalOpen(true);
  };

  const actualizarUsuarioFunc = async () => {
    await actualizarUsuario(
      selectedMayor,
      token,
      nombre,
      apellido,
      cedula,
      telefono,
      email,
      mensaje,
      setMensaje,
      () => setIsModalOpen(false), 
      setLocalMayors
    );
    window.location.reload();
  };

  useEffect(() => {
    fetchData(setLocalMayors, setMensaje);
  }, []);

  const eliminarAlcalde = (id) => {
    setLocalMayors(localMayors.filter((mayor) => mayor.id !== id));
  };

  return (
    <>
      <div className="  flex justify-center"><img src="../../../../../../src/assets/img/img2.png" /></div>
      
      <h1 className="text-2xl font-bold mb-4">Lista de Alcaldes y Admin</h1>
      <table className="table-auto w-full mt-8">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-secundary text-white">NOMBRE</th>
            <th className="px-4 py-2 bg-secundary text-white">APELLIDO</th>
            <th className="px-4 py-2 bg-secundary text-white">CEDULA</th>
            <th className="px-4 py-2 bg-secundary text-white">TELEFONO</th>
            <th className="px-4 py-2 bg-secundary text-white">
              CORREO ELECTRONICO
            </th>
            <th className="px-4 py-2 bg-secundary text-white">CIUDAD</th>
            <th className="px-4 py-2 bg-secundary text-white">DEPARTAMENTO</th>
            <th className="px-4 py-2 bg-secundary text-white">ROL</th>
            <th className="px-4 py-2 bg-secundary text-white">ACCIONES</th>
          </tr>
        </thead>

        <tbody>
          {localMayors.map((mayor) => (
            <tr key={mayor.id}>
              <td className="border px-4 py-2">{mayor.nombre}</td>
              <td className="border px-4 py-2">{mayor.apellido}</td>
              <td className="border px-4 py-2">{mayor.cedula}</td>
              <td className="border px-4 py-2">{mayor.telefono}</td>
              <td className="border px-4 py-2">{mayor.email}</td>
              <td className="border px-4 py-2">{mayor.ciudad.ciudad}</td>
              <td className="border px-4 py-2">
                {mayor.ciudad.departamento.departamento}
              </td>
              <td className="border px-4 py-2">{mayor.rol.name}</td>
              <td className="border px-4 py-2 flex justify-center items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 rounded"
                  onClick={() => openEditModal(mayor)}
                >
                  <RiEdit2Fill />
                </button>
                <EliminarAlcalde id={mayor.id} onDelete={eliminarAlcalde} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Alcalde/Admin"
        confirmText="Guardar Cambios"
        cancelText="Cancelar"
        onConfirm={actualizarUsuarioFunc}
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Editar Alcalde/Admin
          </h3>
          <div className="mt-5">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="apellido"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="cedula"
              className="block text-sm font-medium text-gray-700"
            >
              Cédula
            </label>
            <input
              type="text"
              name="cedula"
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Tabla;
