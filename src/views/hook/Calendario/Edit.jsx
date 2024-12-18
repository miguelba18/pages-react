import { useState } from "react";
import { toast } from "react-toastify";
import useAuthToken from "../Token/useAuthToken";


const useEditRecordatorio = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuthToken();

  const editRecordatorio = async (id, data) => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error('No hay token');
      }


      const response = await fetch(`http://localhost:8080/api/V1/recordatorio/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Error al editar el recordatorio');
      }

      
      setLoading(false);
      toast.success('Recordatorio editado correctamente',{ autoClose: 1200 });
      setTimeout(() => {
        window.location.reload();
      }, 1700);
      
    } catch (error) {
      toast.error('Error al editar el recordatorio:', error);
      setError('Error al editar el recordatorio');
      setLoading(false);
    }
  };

  return { editRecordatorio, loading, error };
};

export default useEditRecordatorio;
  