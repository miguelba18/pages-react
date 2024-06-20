import { useState, useEffect } from "react";
import useAuthToken from "../Token/useAuthToken";

const useListNotificacion = () => {
    const { token } = useAuthToken();
    const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [imagen, setImagen] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [reminderNotifications, setReminderNotifications] = useState([]);
  const [profileNotifications, setProfileNotifications] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            if (!token) {
              throw new Error("No hay token de autenticación.");
            }
    
            const response = await fetch(
              "http://localhost:8080/api/V1/usuario/perfil",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.ok) {
              const userData = await response.json();
              const { nombre, apellido, email, imagen } = userData || {};
              setUserName(`${nombre} ${apellido}`);
              setEmail(email);
              setImagen(imagen);
            } else {
              console.error("Error al obtener los datos:", response.status);
            }
          } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
          }
        };
    
        const fetchNotifications = async () => {
          try {
            if (!token) {
              throw new Error("No hay token de autenticación.");
            }
    
            const response = await fetch(
              "http://localhost:8080/notificaciones-inquietudes",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.ok) {
              const data = await response.json();
              setNotifications(data);
            } else {
              console.error(
                "Error al obtener las notificaciones:",
                response.status
              );
            }
          } catch (error) {
            console.error("Error al obtener las notificaciones:", error);
          }
        };

        const fetchReminderNotifications = async () => {
            try {
              if (!token) {
                throw new Error("No hay token de autenticación.");
              }
      
              const response = await fetch("http://localhost:8080/notificaciones-recordatorios", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (response.ok) {
                const data = await response.json();
                setReminderNotifications(data);
                
              } else {
                console.error("Error al obtener las notificaciones de recordatorio:", response.status);
              }
            } catch (error) {
              console.error("Error al obtener las notificaciones de recordatorio:", error);
            }
          };

          const fetchProfileNotifications = async () => {
            try {
              if (!token) {
                throw new Error("No hay token de autenticación.");
              }
      
              const response = await fetch("http://localhost:8080/notificaciones-perfil", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (response.ok) {
                const data = await response.json();
                setProfileNotifications(data);
                
              } else {
                console.error("Error al obtener las notificaciones de recordatorio:", response.status);
              }
            } catch (error) {
              console.error("Error al obtener las notificaciones de recordatorio:", error);
            }
          };
    
        fetchUserData();
        fetchNotifications();
        fetchReminderNotifications();
        fetchProfileNotifications();
      }, [token, setNotifications]);

      

  return { userName, email, imagen, notifications, reminderNotifications, profileNotifications}
}

export default useListNotificacion
