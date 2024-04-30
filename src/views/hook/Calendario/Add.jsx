

export const useGuardarRecordatorio = () => {
  const guardarRecordatorio = async (newRecordatorio) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:8080/api/V1/recordatorio/alcalde', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newRecordatorio)
      });

      if (!response.ok) {
        throw new Error('Error al agregar el recordatorio');
      }

      alert('Recordatorio agregado exitosamente');
      return true;
    } catch (error) {
      console.error('Error al agregar el recordatorio:', error);
      alert('Error al agregar el recordatorio');
      return false;
    }
  };

  return guardarRecordatorio;
};
export default useGuardarRecordatorio;