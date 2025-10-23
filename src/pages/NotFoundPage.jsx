import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>404 Not Found Page</h1>

      <button className="homepage__action action" onClick={() => navigate("/")}>
        <FaHome />
      </button>
    </div>
  );
}
