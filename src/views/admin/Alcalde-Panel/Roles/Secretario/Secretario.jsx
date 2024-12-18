
import Form from "./Form";

import  { useState } from 'react';

const Secretario = () => {
  const [mayors, setMayors] = useState([]);


  const handleCreateMayor = (newMayor) => {
    setMayors([...mayors, newMayor]);

  };

  
  return (
    <div className="container mx-auto xl:p-4">
     <h1 className="font-bold text-3xl text-secundary mb-4">
          Agregar Secretario
        </h1>
      
      {<Form onCreateMayor={handleCreateMayor}/>}
      
      
    </div>
  )
}

export default Secretario