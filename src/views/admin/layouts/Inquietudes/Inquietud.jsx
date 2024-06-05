import { useState } from "react";
import useAuthToken from "../../../hook/Token/useAuthToken";
import Switch from "react-switch";
import useListInquietud from "../../../hook/Inquietudes/useListInquietud";
import DeleteInquietud from "../../../hook/Inquietudes/useDeleteInquietudes";

const Inquietud = () => {
  const [switchStates, setSwitchStates] = useState({});
  const { inquietudes, setInquietudes } = useListInquietud();
  const [showDescriptions, setShowDescriptions] = useState({});
  const { token } = useAuthToken();

  const handleSwitchChange = async (id, checked) => {
    try {
      const response = await fetch(`http://localhost:8080/inquietud/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ estado: checked ? 1 : 0 }),
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
      if (response.ok) {
        setSwitchStates((prevSwitchStates) => ({
          ...prevSwitchStates,
          [id]: checked,
        }));
        setInquietudes((prevInquietudes) =>
          prevInquietudes.map((inquietud) =>
            inquietud.id === id ? { ...inquietud, estado: checked ? 1 : 0 } : inquietud
          )
        );
      } else {
        console.error("Error actualizando el estado");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleDescriptionClick = (id) => {
    setShowDescriptions((prevShowDescriptions) => ({
      ...prevShowDescriptions,
      [id]: !prevShowDescriptions[id],
    }));
  };

  const groupedInquietudes = [];
  for (let i = 0; i < inquietudes.length; i += 3) {
    groupedInquietudes.push(inquietudes.slice(i, i + 3));
  }

  return (
    <div className="">
      <h1 className="text-4xl font-normal mb-4">Inquietudes</h1>
      <div className="justify-center ">
        {groupedInquietudes.map((group, index) => (
          <div key={index} className="xl:flex mb-4 ">
            {group.map((inquietud) => (
              <div key={inquietud.id} className="xl:w-[30%] mb-4 mr-4">
                <div key={inquietud.id} className={`${inquietud.estado === 0 ? 'bg-red-600/70' : 'bg-green-600/70'} rounded-t-[10px] p-2 flex font-medium text-xl text-black`}>
                  <div className="w-[60%] justify-end flex">
                    <h1>{inquietud.estado === 0 ? 'No Leído' : 'Leído'}</h1>
                  </div>
                  <div className="w-[40%] flex justify-end">
                    <Switch 
                      onChange={(checked) => handleSwitchChange(inquietud.id, checked)} 
                      checked={switchStates[inquietud.id] !== undefined ? switchStates[inquietud.id] : inquietud.estado === 1} 
                    />
                  </div>
                </div>
                <div className="bg-tertiary-100 rounded-b-[10px] shadow-2xl p-8">
                  {!showDescriptions[inquietud.id] ? (
                    <>
                      <h1 className="text-center text-xl font-medium mb-4">Datos</h1>
                      <div className="flex items-center mb-8">
                        <div className="w-1/4">
                          <p>Nombre</p>
                        </div>
                        <div className="flex-1">
                          <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">{inquietud.nombre}</h2>
                        </div>
                      </div>
                      <div className="flex items-center mb-8">
                        <div className="w-1/4">
                          <p>Email</p>
                        </div>
                        <div className="flex-1">
                          <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">{inquietud.email}</h2>
                        </div>
                      </div>
                      <div className="flex items-center mb-8">
                        <div className="w-1/4">
                          <p>Celular</p>
                        </div>
                        <div className="flex-1">
                          <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">{inquietud.celular}</h2>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className="text-center text-xl font-medium mb-4">Observaciones</h1>
                      <p className="break-words">{inquietud.texto}</p>
                    </>
                  )}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleDescriptionClick(inquietud.id)}
                      className="gap-2 mt-4 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3]"
                    >
                      {showDescriptions[inquietud.id] ? 'Datos' : 'Descripcion'}
                    </button>
                    <DeleteInquietud 
                      id={inquietud.id}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inquietud;
