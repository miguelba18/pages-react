import { useState } from 'react';

import useAuthToken from '../../../Token/useAuthToken';
import useListFacturaCompleta from './useListFacturaCompleta';
import { toast } from 'react-toastify';

const useAddConsorcio = () => {
    const { fetchFacturas, selectedCiudad, selectedAnio,searchQuery } = useListFacturaCompleta();

    
  const [error, setError] = useState(null);
  
  const [success, setSuccess] = useState(false);
  const { token } = useAuthToken();

  const addConsorcio = async (ids) => {
  
    setSuccess(false);
    const idsArray = Array.isArray(ids) ? ids : [ids]; 
    const formattedIds = idsArray.join(','); 

  

    try {
      
      const response = await fetch(`http://localhost:8080/consorcio/${formattedIds}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });

      if (!response.ok) {
        const errorText = await response.text();
            throw new Error(errorText);
      }

      setSuccess(true);
      fetchFacturas(selectedCiudad, searchQuery, selectedAnio);
      toast.success("Consorcio agregado con éxito", { autoClose: 1700 });
      return formattedIds;
    } catch (error) {
      setError(error.message);
      toast.info(error.message);
    } 
  };

  return { addConsorcio, error, success };
};

export default useAddConsorcio;
