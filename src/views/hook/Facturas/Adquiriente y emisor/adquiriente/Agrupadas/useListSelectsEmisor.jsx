import { useState, useEffect } from "react";
import axios from "axios";
import useAuthToken from "../../../../Token/useAuthToken";
const useListSelectsEmisor = () => {
  const [emisores, setEmisores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuthToken();
  const [nitEmisores,setNitEmisores] = useState([]);

  useEffect(() => {
    const fetchEmisores = async () => {
      setLoading(true);
     
      
      try {
        const response = await axios.get(`http://localhost:8080/factura/nombre-comercial-emisor`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        setEmisores(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchEmisores();
  }, [ token]);

  useEffect(() => {
    const fetchNitEmisores = async () => {
      setLoading(true);
     
      
      try {
        const response = await axios.get(`http://localhost:8080/factura/nit-emisor`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        setNitEmisores(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchNitEmisores();
  }, [ token]);

  return { emisores,nitEmisores, loading, error };
};

export default useListSelectsEmisor;
