
import { useState } from "react";
const useDeleteNotificacionProfile = () => {

    const [notifications, setNotifications] = useState([]);

    const handleNotificationClickProfile = async (id) => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("No hay token de autenticación.");
          }
    
          const response = await fetch(`http://localhost:8080/notificaciones-perfil/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.ok) {
            const updatedNotifications = notifications.filter(
              (notification) => notification.id !== id
            );
            setNotifications(updatedNotifications);
            setTimeout(() => {
              window.location.reload();
            }, 10);
           
            
          } else {
            console.error("Error al eliminar la notificación:", response.status);
          }
        } catch (error) {
          console.error("Error al eliminar la notificación:", error);
        }
      };
    
  return {handleNotificationClickProfile, notifications, setNotifications}
    
  
}

export default useDeleteNotificacionProfile
