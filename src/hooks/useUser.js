import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserLogged } from "../utils/network-data";

export function useUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    (async () => {
      const response = await getUserLogged();
      if (response.error) {
        if (localStorage.getItem("accessToken")) {
          localStorage.removeItem("accessToken");
        }
        navigate("/login");
      }

      setUser(response.data);
    })();
  }, [accessToken]);

  return { user };
}
