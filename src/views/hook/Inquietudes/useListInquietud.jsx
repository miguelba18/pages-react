import { useState, useEffect } from 'react';
import useAuthToken from '../Token/useAuthToken';


const useListInquietud = () => {
  const [inquietudes, setInquietudes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthToken();

  useEffect(() => {
    const obtenerInquietudes = async () => {
      try {
        
        const response = await fetch('http://localhost:8080/inquietud/listar', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener las Inquietudes');
        }

        const data = await response.json();
        setInquietudes(data);
        setLoading(false);
        
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    obtenerInquietudes();
  }, [token]);

  return { inquietudes, loading, error };
};

export default useListInquietud;
