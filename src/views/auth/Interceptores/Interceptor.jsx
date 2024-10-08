import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://localhost:8080/api/V1', 
});


instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
  
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('tokenExpiration');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default instance;
