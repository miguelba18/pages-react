import { useState } from 'react';

function useAuthToken() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return { token, saveToken, removeToken };
}

export default useAuthToken;

