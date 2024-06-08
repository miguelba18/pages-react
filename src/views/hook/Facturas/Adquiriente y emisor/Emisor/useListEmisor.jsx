import useAuthToken from "../../../Token/useAuthToken";
import { useEffect, useState } from "react";

const useListEmisor = () => {
  const { token } = useAuthToken();
  const [emisores, setEmisores] = useState([]);

  const searchEmisores = async (query) => {
    try {
      const response = await fetch(`http://localhost:8080/factura/emisor?filtro=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los emisores");
      }

      const data = await response.json();
      setEmisores(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const obtenerEmisores = async () => {
      try {
        const response = await fetch("http://localhost:8080/factura/emisor", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los adquirientes");
        }

        const data = await response.json();
        setEmisores(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    obtenerEmisores();
  }, [token]);

  return { emisores, searchEmisores };
};

export default useListEmisor;
  

