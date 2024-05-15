import { useState, useEffect } from 'react';
import useAuthToken from '../Token/useAuthToken';


const useFetchRecordatorios = () => {
  const [recordatorios, setRecordatorios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthToken();

  useEffect(() => {
    const obtenerRecordatorios = async () => {
      try {
        
        const response = await fetch('http://localhost:8080/api/V1/recordatorio/listar', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los recordatorios');
        }

        const data = await response.json();
        setRecordatorios(data);
        setLoading(false);
        
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    obtenerRecordatorios();
  }, [token]);

  return { recordatorios, loading, error };
};

export default useFetchRecordatorios;
