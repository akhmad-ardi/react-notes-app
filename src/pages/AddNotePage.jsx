import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import AddNote from "../components/AddNote";

export default function AddNotePage() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="add-note-page">
        <AddNote />

        <button
          className="homepage__action action"
          style={{ color: "white", backgroundColor: "red" }}
          onClick={() => navigate("/")}
        >
          <FaHome />
        </button>
      </section>
    </div>
  );
}
