import { useState, useEffect } from 'react';
import useAuthToken from '../Token/useAuthToken';


const useListId = (id) => {
  const [factura, setFactura] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuthToken();

  useEffect(() => {
    if (!id) return;

    const fetchFactura = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8080/consorcio/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
              },
          });
    

        if (!response.ok) {
          throw new Error('Error fetching factura');
        }
        const data = await response.json();
        setFactura(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFactura();
  }, [id, token]);

  return { factura, loading, error };
};

export default useListId;
