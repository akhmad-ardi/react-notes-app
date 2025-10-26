import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaSpinner } from "react-icons/fa";
import AddNote from "../components/AddNote";

export default function AddNotePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  return (
    <div>
      <section className="add-note-page">
        <AddNote setLoadingPage={setLoading} />

        <button
          className="add-new-page__action action"
          style={{ color: "white", backgroundColor: "red" }}
          onClick={() => navigate("/")}
          disabled={loading}
        >
          {loading ? <FaSpinner className="spinner" /> : <FaHome />}
        </button>
      </section>
    </div>
  );
}
