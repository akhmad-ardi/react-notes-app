import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useGuest() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      navigate("/");
    }
  }, []);
}
