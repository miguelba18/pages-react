import  { useState } from "react";
import EditProfileModal from "./EditarPerfil";
import useProfile from "../../../hook/Perfil/useProfile";
import {toast} from "react-toastify";
function Perfil() {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = async (editedProfile) => {
    const success = await updateProfile(editedProfile);
    if (success) {
      setIsEditing(false);
      toast.success("Perfil editado exitosamente" ,{ autoClose: 1200 });
      setTimeout(() =>
        {
          window.location.reload();
        }, 1700);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
  };

  return (
    <div className="py-6">
      {profile ? (
        <div className="bg-tertiary-100 p-8 rounded-xl mb-8">
          <h1 className="text-3xl text-secundary">Perfil</h1>
          <hr className="my-8 border-gray-500/30" />
          <form>
            <div className="flex items-center mb-8">
              <div className="w-1/4">
                <p>Avatar</p>
              </div>
              <div className="flex-1">
                <div className="relative mb-2">
                  <img
                    src={profile.imagen}
                    className="w-28 h-28 rounded-lg object-cover"
                    alt="Avatar"
                  />
                  <input type="file" id="avatar" className="hidden" />
                </div>
                
              </div>
            </div>

            <div className="flex items-center mb-8">
              <div className="w-1/4 text-sm">
                <p>
                  Nombre Completo <span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex-1 flex items-center gap-4">
                <div className="w-full ">
                  <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                    {profile.nombre}
                  </h2>
                </div>
                <div className="w-full">
                  <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                    {profile.apellido}
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex items-center mb-8">
              <div className="w-1/4">
                <p>
                  Departamento <span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex-1">
                <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                  {profile.departamento}
                </h2>
              </div>
            </div>

            <div className="flex items-center mb-8">
              <div className="w-1/4">
                <p>
                  Ciudad <span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex-1">
                <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                  {profile.ciudad}
                </h2>
              </div>
            </div>

            <div className="flex items-center mb-8">
              <div className="w-1/4">
                <p>
                  Celular <span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex-1">
                <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                  {profile.telefono}
                </h2>
              </div>
            </div>
            <div className="flex items-center mb-8">
              <div className="w-1/4">
                <p>
                  Cedula <span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex-1">
                <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                  {profile.cedula}
                </h2>
              </div>
            </div>

            <div className="flex items-center mb-8">
              <div className="w-1/4">
                <p>
                  Rol <span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex-1">
                <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                  {profile.rol}
                </h2>
              </div>
            </div>
          </form>
          <hr className="my-8 border-gray-500/30" />
          <div className="flex justify-end">
            <button
              className="flex mr-2 justify-center items-center gap-2 w-20 h-10 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3]"
              onClick={handleEditClick}
            >
              Editar
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
      {isEditing && (
        <EditProfileModal
          isOpen={isEditing}
          onClose={handleCloseEditModal}
          onSave={handleEditProfile}
          perfil={profile}
        />
      )}
    </div>
  );
}

export default Perfil;
