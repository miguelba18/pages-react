import { useEffect, useState } from "react";
import { RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import actualizarUsuario from "../../../hook/Editar/Secretario/editar";
import eliminarUsuario from "../../../hook/Editar/Secretario/eliminar";
import fetchData from "../../../hook/Editar/Secretario/listar";
import Modal from "../../../modal/Modal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tabla = () => {
  const [localMayors, setLocalMayors] = useState([]);
  const [selectedMayor, setSelectedMayor] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (mayor) => {
    setSelectedMayor(mayor);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    await eliminarUsuario(selectedMayor.id, setLocalMayors);
    toast.success('¡Se eliminó el secretario/personal con éxito!');
    setIsDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
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
      setMensaje,
      setIsEditModalOpen,
      setLocalMayors
    );
    
    setTimeout(() => {
      window.location.reload();
    }, 1700);
  };

  useEffect(() => {
    fetchData(setLocalMayors, setMensaje);
  }, [mensaje]);

  return (
    <>
      <div className="flex justify-center">
        <img src="../../../../../../src/assets/img/img2.png" />
      </div>
      <h1 className="text-2xl font-bold mb-4">Lista de Secretarios y Personal</h1>
      <table className="table-auto w-full mt-8">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-secundary text-white">NOMBRE</th>
            <th className="px-4 py-2 bg-secundary text-white">APELLIDO</th>
            <th className="px-4 py-2 bg-secundary text-white">CEDULA</th>
            <th className="px-4 py-2 bg-secundary text-white">TELEFONO</th>
            <th className="px-4 py-2 bg-secundary text-white">CORREO ELECTRONICO</th>
            <th className="px-4 py-2 bg-secundary text-white">ROL</th>
            <th className="px-4 py-2 bg-secundary text-white">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {localMayors.map((mayor) => (
            <tr key={mayor.id}>
              <td className="border px-4 py-2 text-center">{mayor.nombre}</td>
              <td className="border px-4 py-2 text-center">{mayor.apellido}</td>
              <td className="border px-4 py-2 text-center">{mayor.cedula}</td>
              <td className="border px-4 py-2 text-center">{mayor.telefono}</td>
              <td className="border px-4 py-2 text-center">{mayor.email}</td>
              <td className="border px-4 py-2 text-center">{mayor.rol.name}</td>
              <td className="border px-4 py-2 flex justify-center items-center">
                <button
                  className="flex mr-2 justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3]"
                  onClick={() => openEditModal(mayor)}
                >
                  <RiEdit2Fill />
                </button>
                <button
                  className="flex justify-center items-center gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                  onClick={() => openDeleteModal(mayor)}
                >
                  <RiDeleteBin5Fill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Eliminar Secretario/Personal"
        confirmText="Confirmar"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      >
        <p>¿Estás seguro de eliminar este secretario/personal?</p>
      </Modal>
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={actualizarUsuarioFunc}
        title="Editar Secretario/Personal"
        confirmText="Guardar Cambios"
      >
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
      </Modal>
    </>
  );
};

export default Tabla;
