import useSelectCityDepaUtils from "../../../../../utils/useSelectCityDepaUtils";

import { useState, useEffect } from "react";
import useListUsers from "../../../../hook/Enviar correo/useListUsers";
import useAuthToken from "../../../../hook/Token/useAuthToken";
const EnviarCorreoAlcalde = () => {
  const { users, fetchUsers, setUsers } = useListUsers();
  const [formData, setFormData] = useState({});
  const { token } = useAuthToken();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [showCheckboxes, setShowCheckboxes] = useState(false); 
  const [showModal, setShowModal] = useState(false);

  const {
    departamentos,
    filteredCiudades,
    selectedDepartamento,
    selectedCiudad,
    handleDepartamentoChange,
    handleCiudadChange,
  } = useSelectCityDepaUtils();

  useEffect(() => {
    if (selectedCiudad) {
      fetchUsers(selectedCiudad);
    } else {
      setUsers([]);
    }
  }, [fetchUsers, selectedCiudad, setUsers]);

  useEffect(() => {
    setUsers([]);
  }, [selectedDepartamento, setUsers]);

  useEffect(() => {
    setUsers([]);
    setSelectedUsers([]);
  }, [selectedDepartamento, setUsers]);

  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId) 
        : [...prevSelectedUsers, userId] 
    );
  };
  const handleSendEmails = async () => {
    try {
      const url = "http://localhost:8080/correo/enviar";
      const body = {
        para: selectedUsers,
        asunto: emailSubject,
        contenido: emailContent,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el correo");
      }

      alert("Correos enviados correctamente");  
      setShowModal(false);
      setShowCheckboxes(false);
      setSelectedUsers([false]);
      

    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar los correos.");
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <img src="../../../../../../src/assets/img/img2.png" alt="Imagen" />
      </div>
        <h1 className="mb-2 text-bold text-3xl">Enviar correos </h1>
      <div className="flex">
        <div className="mr-4">
          <select
            value={selectedDepartamento}
            onChange={(e) => {
              handleDepartamentoChange(e);
              setFormData({
                ...formData,
                departamentoId: e.target.value,
              });
            }}
            className="mb-4 rounded-xl  text-secundary shadow-md shadow-blue-500 px-2  py-3 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
          >
            <option value="">Selecciona un departamento</option>
            {departamentos.map((departamento) => (
              <option key={departamento.id} value={departamento.id}>
                {departamento.departamento}
              </option>
            ))}
          </select>
        </div>
        <div>
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
            className=" mb-4 px-2 rounded-xl shadow-md shadow-blue-500 text-secundary py-3 bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
          >
            <option value="">Selecciona una ciudad</option>
            {filteredCiudades.map((ciudad) => (
              <option key={ciudad.id} value={ciudad.id}>
                {ciudad.ciudad}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <button
         hidden={!selectedCiudad}
          onClick={() => setShowCheckboxes(true)}
          className="bg-secundary text-white px-4 py-2 rounded-xl shadow-md hover:bg-secundary-dark focus:outline-none focus:ring-2 focus:ring-secundary focus:ring-opacity-50"
        >
          Seleccionar usuarios
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-8 ">
          <thead>
            <tr>
               {showCheckboxes && (
                <th className="px-4 py-2 bg-secundary text-white">SELECCIONAR</th>
              )} 
              <th className="px-4 py-2 bg-secundary text-white">#</th>
              
              <th className="px-4 py-2 bg-secundary text-white">NOMBRE</th>
              <th className="px-4 py-2 bg-secundary text-white">APELLIDO</th>
              <th className="px-4 py-2 bg-secundary text-white">
                CORREO ELECTRONICO
              </th>
              <th className="px-4 py-2 bg-secundary text-white">ROL</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                {showCheckboxes && (
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleUserSelect(user.id)}
                    />
                  </td>
                )}
                <td className="border px-4 py-2 text-center">{index+1}</td>
                <td className="border px-4 py-2">{user.nombre}</td>
                <td className="border px-4 py-2">{user.apellido}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCheckboxes && (
        <div className="mt-8">
          <button
            onClick={() => setShowModal(true)}
            disabled={selectedUsers.length === 0}
            className="bg-secundary text-white px-4 py-2 rounded-xl shadow-md hover:bg-secundary-dark focus:outline-none focus:ring-2 focus:ring-secundary focus:ring-opacity-50"
          >
            Enviar correo
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Enviar correo</h2>
            <input
              type="text"
              placeholder="Asunto"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="mb-4 px-2 py-3 rounded-xl shadow-md shadow-blue-500 text-secundary bg-tertiary-100 w-full focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
            />
            <textarea
              placeholder="Contenido del correo"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="mb-4 px-2 py-3 rounded-xl shadow-md shadow-blue-500 text-secundary bg-tertiary-100 w-full h-32 focus:outline-none focus:ring-2 focus:ring-secundary focus:border-transparent"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-4 bg-gray-400 text-white px-4 py-2 rounded-xl shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendEmails}
                disabled={!emailSubject || !emailContent}
                className="bg-secundary text-white px-4 py-2 rounded-xl shadow-md hover:bg-secundary-dark focus:outline-none focus:ring-2 focus:ring-secundary focus:ring-opacity-50"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnviarCorreoAlcalde;

