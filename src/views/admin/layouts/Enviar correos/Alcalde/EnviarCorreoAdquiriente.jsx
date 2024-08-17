import useListAdquiriente from "../../../../hook/Enviar correo/Alcalde/useListAdquiriente";
import { useState,useEffect } from "react"
import useAuthToken from "../../../../hook/Token/useAuthToken"
import { RiLoader4Line } from "react-icons/ri";
import { toast } from "react-toastify";
const EnviarCorreoAdquiriente = () => {
    const { token } = useAuthToken();
    const { users, fetchUsers } = useListAdquiriente()
    const [selectedUsers, setSelectedUsers] = useState([]);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [showCheckboxes, setShowCheckboxes] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId) 
        : [...prevSelectedUsers, userId] 
    );
  };
  const handleSendEmails = async (tipo="adquirientes") => {
    setIsLoading(true);
    try {
      const tipoString = typeof tipo === 'string' ? tipo : "adquirientes";

   
    const url = `http://localhost:8080/correo/enviar/?tipo=${encodeURIComponent(tipoString)}`;
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

      toast.success("Correos enviados correctamente");  
      setShowModal(false);
      setShowCheckboxes(false);
      setSelectedUsers([false]);
      

    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al enviar los correos.");
    }
    setIsLoading(false);
  };
  return (
    <div>
        <div className="mt-4">
            {!showCheckboxes ? (
               <button
          onClick={() => setShowCheckboxes(true)}
          className="bg-secundary text-white px-4 py-2 rounded-xl shadow-md hover:bg-secundary-dark focus:outline-none focus:ring-2 focus:ring-secundary focus:ring-opacity-50"
        >
          Seleccionar usuarios
        </button> 
            
        ) : (
            <button
            onClick={() => setShowCheckboxes(false)}
            className="bg-secundary text-white px-4 py-2 rounded-xl shadow-md hover:bg-secundary-dark focus:outline-none focus:ring-2 focus:ring-secundary focus:ring-opacity-50"
          >
            Salir del seleccionar
          </button> 
        )}
        
      </div>
        <div className="overflow-x-auto">
        <table className="table-auto w-full mt-4 ">
          <thead>
            <tr>
               {showCheckboxes && (
                <th className="px-4 py-2 bg-secundary text-white">SELECCIONAR</th>
              )} 
              <th className="px-4 py-2 bg-secundary text-white">#</th>
              
              
              <th className="px-4 py-2 bg-secundary text-white">
                CORREO ELECTRONICO
              </th>
             
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                {showCheckboxes && (
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.correoAdquiriente)}
                      onChange={() => handleUserSelect(user.correoAdquiriente)}
                    />
                  </td>
                )}
                <td className="border px-4 py-2 text-center">{index+1}</td>
                <td className="border px-4 py-2 text-center">{user.correoAdquiriente}</td>
                
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
            {!isLoading ? (
                <>
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
                </>
              ) : (
                <div className="flex justify-center">
                  <RiLoader4Line className="text-black animate-spin text-4xl mt-6" />
                  <p className="text-black mt-8 ">Enviando correos...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      
    </div>
  )
}

export default EnviarCorreoAdquiriente
