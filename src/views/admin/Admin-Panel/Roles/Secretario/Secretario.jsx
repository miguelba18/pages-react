
import Form from "./Form";
import Tabla from "./Tabla";
import  { useState } from 'react';

const Secretario = () => {
  const [mayors, setMayors] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleCreateMayor = (newMayor) => {
    setMayors([...mayors, newMayor]);
    setShowForm(false);
  };

  const handleDeleteMayor = (id) => {
    setMayors(mayors.filter(mayor => mayor.id !== id));
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Secretarios</h1>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 "
          onClick={() => setShowForm(true)}
        >
          Crear Secretario
        </button>
      </div>
      {showForm && <Form onCreateMayor={handleCreateMayor}/>}
      <Tabla mayors={mayors} onDeleteMayor={handleDeleteMayor} />
    </div>
  )
}

export default Secretario