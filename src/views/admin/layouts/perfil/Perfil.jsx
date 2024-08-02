import { useState } from "react";
import EditProfileModal from "./EditarPerfil";
import useProfile from "../../../hook/Perfil/useProfile";
import { toast } from "react-toastify";
function Perfil() {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = async (editedProfile) => {
    const success = await updateProfile(editedProfile);
    if (success) {
      setIsEditing(false);
      toast.success("Perfil editado exitosamente", { autoClose: 1200 });
      setTimeout(() => {
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
    <div className="py-6 xl:flex justify-center ">
      {profile ? (
        <>
          <div className=" mb-8  xl:w-1/2 xl:p-10 flex justify-center xl:justify-end">
            <div className="w-[80%] bg-white shadow-2xl shadow-blue-500 rounded-3xl ">
              <div className="flex justify-center mt-10 mb-6 ">
                <p className="text-3xl text-blue-500 text-semibold">
                  {profile.nombre} {profile.apellido}
                </p>
              </div>

              <div className="mb-10">
                <div className="relative mb-2 flex justify-center">
                  <img
                    src={profile.imagen}
                    className="w-[35%] h-[30%] rounded-full "
                    alt="Avatar"
                  />
                  <input type="file" id="avatar" className="hidden" />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="flex justify-center mb-4 xl:mb-0 items-cente px-3 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3]"
                  onClick={handleEditClick}
                >
                  Actualizar Perfil
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-500 p-8 rounded-xl mb-8 xl:w-1/2">
          <h1 className="text-3xl text-white font-semibold mb-4">
            Perfil
          </h1>
          <hr className="mb-2"></hr>
            <form>
              <div className=" mb-8 flex">
                <div className="w-full mr-2">
                  <div className="md:w-1/4">
                    <p className="text-white">Nombre</p>
                  </div>
                  <div className="  md:gap-4 gap-1">
                    <div className="w-full ">
                      <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                        {profile.nombre}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="w-full ">
                  <div className="md:w-1/4">
                    <p className="text-white">Apellido</p>
                  </div>
                  <div className="w-full">
                    <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                      {profile.apellido}
                    </h2>
                  </div>
                </div>
              </div>

              <div className=" mb-8 flex">
                <div className="w-full mr-2">
                  <div className="md:w-1/4">
                    <p className="text-white">Departamento</p>
                  </div>
                  <div className="  md:gap-4 gap-1">
                    <div className="w-full ">
                      <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                        {profile.departamento}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="w-full ">
                  <div className="md:w-1/4">
                    <p className="text-white">Ciudad</p>
                  </div>
                  <div className="w-full">
                    <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                      {profile.ciudad}
                    </h2>
                  </div>
                </div>
              </div>

              <div className=" mb-8 flex">
                <div className="w-full mr-2">
                  <div className="md:w-1/4">
                    <p className="text-white">Cedula</p>
                  </div>
                  <div className="  md:gap-4 gap-1">
                    <div className="w-full ">
                      <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                        {profile.cedula}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="w-full ">
                  <div className="md:w-1/4">
                    <p className="text-white">Telefono</p>
                  </div>
                  <div className="w-full">
                    <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                      {profile.telefono}
                    </h2>
                  </div>
                </div>
              </div>

              <div className=" mb-8">
                <div className="w-1/4">
                  <p className="text-white">Rol</p>
                </div>
                <div className="flex-1">
                  <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                    {profile.rol}
                  </h2>
                </div>
              </div>
            </form>
          </div>
        </>
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
