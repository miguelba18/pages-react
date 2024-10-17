
import Form from "./Form";

import  { useState } from 'react';

const Secretario = () => {
  const [mayors, setMayors] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleCreateMayor = (newMayor) => {
    setMayors([...mayors, newMayor]);
    setShowForm(false);
  };

  
  return (
    <div className="container mx-auto xl:p-4">
     <h1 className="font-bold text-3xl text-secundary mb-4">
          Agregar Secretario
        </h1>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8 "
          onClick={() => setShowForm(true)}
        >
          Crear Secretario
        </button>
      </div>
      {showForm && <Form onCreateMayor={handleCreateMayor}/>}
      
      
    </div>
  )
}

export default Secretario