import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuArchiveX } from "react-icons/lu";
import { FaHome, FaTrash, FaArchive } from "react-icons/fa";
import { getNote } from "../utils/local-data";
import { showFormattedDate } from "../utils/index";
import { deleteNote, archiveNote, unarchiveNote } from "../utils/local-data";

export default function DetailNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = getNote(id);

  function handleDeleteNote() {
    deleteNote(id);
    navigate("/");
    alert("Catatan berhasil dihapus");
  }

  function handleArchiveNote() {
    archiveNote(note.id);
    navigate("/");
    alert("Catatan berhasil diarsipkan");
  }

  function handleUnarchiveNote() {
    unarchiveNote(note.id);
    navigate("/");
    alert("Catatan berhasil diunarsipkan");
  }

  return (
    <section className="detail-page">
      {note ? (
        <>
          <h3 className="detail-page__title">{note.title}</h3>
          <p className="detail-page__createdAt">
            {showFormattedDate(note.createdAt)}
          </p>
          <div className="detail-page__body">{note.body}</div>
        </>
      ) : (
        <h3 className="detail-page__title">Catatan tidak ditemukan</h3>
      )}

      <button
        className="homepage__action action"
        style={{ right: "162px" }}
        onClick={() => navigate("/")}
      >
        <FaHome />
      </button>

      {note.archived ? (
        <button
          className="homepage__action action"
          style={{ right: "96px", color: "white", backgroundColor: "red" }}
          onClick={handleUnarchiveNote}
        >
          <LuArchiveX />
        </button>
      ) : (
        <button
          className="homepage__action action"
          style={{ right: "96px" }}
          onClick={handleArchiveNote}
        >
          <FaArchive />
        </button>
      )}

      <button
        className="homepage__action action"
        style={{ color: "white", backgroundColor: "red" }}
        onClick={handleDeleteNote}
      >
        <FaTrash />
      </button>
    </section>
  );
}
