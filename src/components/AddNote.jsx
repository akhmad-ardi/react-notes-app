import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { addNote } from "../utils/local-data";

export default function AddNote() {
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    addNote({ title, body });
    navigate("/");
    alert("Berhasil menambahkan catatan");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          placeholder="Catatan rahasia"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div
          className="add-new-page__input__body"
          contentEditable="true"
          data-placeholder="Sebenarnya saya adalah ...."
          onInput={(e) => setBody(e.target.innerText)}
          value={body}
        ></div>
      </div>

      <button
        type="submit"
        className="homepage__action action"
        style={{ right: "96px" }}
      >
        <FaCheck />
      </button>
    </form>
  );
}
