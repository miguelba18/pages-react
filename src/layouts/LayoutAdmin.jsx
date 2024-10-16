import {Outlet} from 'react-router-dom'
import Header from '../components/AdminPanel/Header'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LayoutAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      if (tokenExpiration) {
        const currentTime = new Date().getTime();
        if (currentTime > tokenExpiration) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("tokenExpiration");
          navigate("/login");
        }
      }
    };
    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 10000);
    return () => clearInterval(intervalId); 
  }, [navigate]);

  return (
    <div className='xl:min-h-screen grid grid-cols-1  bg-tertiary-900 text-black'>
      
        <div className='xl:col-span-5 '>
            <Header/>
            <div className='h-[90vh] overflow-y-scroll p-8'>
              <Outlet />
            </div>
        </div>
    </div>
  )
}

export default LayoutAdmin