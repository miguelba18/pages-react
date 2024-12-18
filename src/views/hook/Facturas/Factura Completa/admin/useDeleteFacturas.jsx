import { useState } from 'react';

import useAuthToken from '../../../Token/useAuthToken';
import useListFacturaCompleta from './useListFacturaCompleta';
import { toast } from 'react-toastify';

const useDeleteFacturas = () => {
    const { fetchFacturas, selectedCiudad, selectedAnio,searchQuery } = useListFacturaCompleta();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useAuthToken();

  const deleteFactura = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`http://localhost:8080/factura/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la factura');
      }

      setSuccess(true);
      fetchFacturas(selectedCiudad, searchQuery, selectedAnio);
      toast.success("Factura eliminada con éxito", { autoClose: 1700 });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteFactura, loading, error, success };
};

export default useDeleteFacturas;
