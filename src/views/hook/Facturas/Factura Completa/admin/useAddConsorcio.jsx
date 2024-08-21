import { useState } from 'react';

import useAuthToken from '../../../Token/useAuthToken';
import useListFacturaCompleta from './useListFacturaCompleta';
import { toast } from 'react-toastify';

const useAddConsorcio = () => {
    const { fetchFacturas, selectedCiudad, selectedAnio,searchQuery } = useListFacturaCompleta();

    
  const [error, setError] = useState(null);
  
  const [success, setSuccess] = useState(false);
  const { token } = useAuthToken();

  const addConsorcio = async (id) => {
  
    setSuccess(false);

    try {
      const response = await fetch(`http://localhost:8080/consorcio/${id}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });

      if (!response.ok) {
        throw new Error('Error al agregar el consorcio');
      }

      setSuccess(true);
      fetchFacturas(selectedCiudad, searchQuery, selectedAnio);
      toast.success("Consorcio agregada con éxito", { autoClose: 1700 });
      return id;
    } catch (err) {
      setError(err.message);
    } 
  };

  return { addConsorcio, error, success };
};

export default useAddConsorcio;
