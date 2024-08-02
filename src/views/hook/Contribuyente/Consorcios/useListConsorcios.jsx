import useAuthToken from "../../Token/useAuthToken"
import { useEffect, useState } from "react"

const useListConsorcios = () => {
    const {token} = useAuthToken();
    const [consorcios, setConsorcios] = useState([]);

    const searchConsorcios = async (query) => {
        try {
            const response = await fetch(`http://localhost:8080/consorcio?filtro=${query}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!response.ok) {
                throw new Error("Error al obtener los contribuyentes");
              }
            const data = await response.json()
            setConsorcios(data)
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        const obtenerConsorcios = async () => {
            try {
                const response = await fetch("http://localhost:8080/consorcio", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!response.ok) {
                    throw new Error("Error al obtener los contribuyentes");
                  }
                const data = await response.json()
                setConsorcios(data)
            } catch (error) {
                console.error(error)
            }
        };
        obtenerConsorcios();
    }, [token]);
  return { consorcios, searchConsorcios };
}

export default useListConsorcios
