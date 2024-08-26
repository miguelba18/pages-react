import { useState } from 'react';

import useAuthToken from '../Token/useAuthToken';
import { toast } from 'react-toastify';

const useDeleteConsorcios = () => {
    

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useAuthToken();

  const deleteConsorcio = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`http://localhost:8080/consorcio/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la factura');
      }

      setSuccess(true);
      
      toast.success("Factura eliminada con éxito", { autoClose: 1200 });
      setTimeout(() =>
      {
        window.location.reload();
      }, 1700);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteConsorcio, loading, error, success };
};

export default useDeleteConsorcios;
