import { useState, useEffect } from "react";
import axios from "axios";

const useProfile = () => {
  const [profile, setprofile] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      const headers = {
        Authorization: `Bearer ${storedToken}`,
      };

      axios
        .get("http://localhost:8080/api/V1/usuario/perfil", { headers })
        .then((response) => {
          setprofile(response.data);
        })
        .catch(() => {
          setprofile(null);
        });
    }
  }, []);

  const updateProfile = async (editedProfile) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/V1/usuario/perfil",
        editedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.error) {
        throw new Error(response.data.error);
      }

      setprofile(response.data);
      return true;
    } catch (error) {
      alert(error.response.data);
      return false;
    }
  };

  return { profile, updateProfile };
};

export default useProfile;
