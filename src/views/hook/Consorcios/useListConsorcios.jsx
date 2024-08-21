import useAuthToken from "../Token/useAuthToken"
import {  useState } from "react"
const useListConsorcios = () => {
    const { token } = useAuthToken()
    const [consorcios, setConsorcios] = useState([])
    const listConsorcios = async () => {
        try {
            const response = await fetch(`http://localhost:8080/consorcio`, {
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

  return { consorcios, listConsorcios };
}

export default useListConsorcios
