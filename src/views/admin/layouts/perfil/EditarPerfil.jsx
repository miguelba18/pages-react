import { useState } from "react";
import PropTypes from "prop-types";
import { RiEdit2Line } from "react-icons/ri";
function EditProfileModal({ perfil, isOpen, onClose, onSave }) {
  EditProfileModal.propTypes = {
    perfil: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  const [editedProfile, setEditedProfile] = useState({ ...perfil });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "imagen") {
      handleFileChange(e);
    } else {
      setEditedProfile({
        ...editedProfile,
        [name]: value,
      });
    }
  };
  const [encodedImage, setEncodedImage] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const encodedData = event.target.result;
      setEncodedImage(encodedData);
      setEditedProfile({
        ...editedProfile,
        imagen: encodedData,
      });
    };
    reader.readAsDataURL(file);
  };
  const handleSaveClick = () => {
    const editedProfileWithImage = {
      ...editedProfile,
      imagen: encodedImage,
    };
    onSave(editedProfile, editedProfileWithImage);
    onClose();
  };

  const isAdmin = perfil.rol === "ADMIN";

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className=" bg-white p-2 px-8 rounded-lg shadow-md max-w-3xl h-[100%] ">
          <h2 className="text-2xl font-semibold mb-2">Edit Profile</h2>
          <form>
            <div className="pb-4">
              <div className="relative mb-2">
                <img
                  src={editedProfile.imagen}
                  className="w-28 h-28 rounded-lg object-cover"
                ></img>
                <label
                  htmlFor="imagen"
                  className="rounded-full hover:cursor-pointer p-2 absolute -top-3 left-24 bg-tertiary-100 transform transition-transform duration-500 hover:scale-110"
                >
                  <RiEdit2Line />
                </label>
              </div>
              <input
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hidden  "
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                Solo imágenes de tipo: png, jpg, jpeg
              </p>
            </div>
            <div className="flex">
              <div className="pb-2 mr-4">
                <label
                  htmlFor="nombre"
                  className="font-semibold text-sm text-gray-700 block pb-1"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="border-2  border-gray-300 rounded-xl px-2 py-2 w-full"
                  value={editedProfile.nombre}
                  onChange={handleInputChange}
                  disabled={!isAdmin}
                />
              </div>
              <div className="pb-2">
                <label
                  htmlFor="apellido"
                  className="font-semibold text-sm text-gray-700 block pb-1"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  className="border-2 border-gray-300 rounded-xl px-2 py-2 w-full"
                  value={editedProfile.apellido}
                  onChange={handleInputChange}
                  disabled={!isAdmin}
                />
              </div>
            </div>

            <div className="pb-2">
              <label
                htmlFor="ciudad"
                className="font-semibold text-sm text-gray-700 block pb-1"
              >
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                className="border-2 border-gray-300 rounded-xl px-2 py-2 w-full"
                value={editedProfile.ciudad}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="pb-2">
              <label
                htmlFor="telefono"
                className="font-semibold text-sm text-gray-700 block pb-1"
              >
                Teléfono
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                className="border-2 border-gray-300 rounded-xl px-2 py-2 w-full"
                value={editedProfile.telefono}
                onChange={handleInputChange}
                disabled={!isAdmin}
              />
            </div>

            <div className="pb-2">
              <label
                htmlFor="cedula"
                className="font-semibold text-sm text-gray-700 block pb-1"
              >
                Cedula
              </label>
              <input
                type="text"
                id="cedula"
                name="cedula"
                className="border-2 border-gray-300 rounded-xl px-2 py-2 w-full"
                value={editedProfile.cedula}
                onChange={handleInputChange}
                disabled={!isAdmin}
              />
            </div>
            <div className="pb-2">
              <label
                htmlFor="email"
                className="font-semibold text-sm text-gray-700 block pb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border-2 border-gray-300 rounded-xl px-2 py-2 w-full"
                value={editedProfile.email}
                onChange={handleInputChange}
                disabled={!isAdmin}
              />
            </div>
            <div className="pb-2">
              <label
                htmlFor="rol"
                className="font-semibold text-sm text-gray-700 block pb-1"
              >
                Rol
              </label>
              <input
                type="text"
                id="rol"
                name="rol"
                className="border-2 border-gray-300 rounded-xl px-2 py-2 "
                value={editedProfile.rol}
                onChange={handleInputChange}
                disabled
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
              >
                Guardar
              </button>
              <button
                onClick={onClose}
                className="ml-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
