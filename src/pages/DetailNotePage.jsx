import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuArchiveX } from "react-icons/lu";
import { FaSpinner, FaHome, FaTrash, FaArchive } from "react-icons/fa";
import { LanguageContext } from "../contexts/LanguageContext";
import { showFormattedDate } from "../utils/index";
import { translations } from "../utils/translations";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data";

export default function DetailNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { language } = React.useContext(LanguageContext);
  const t = translations[language];

  const [loadingPage, setLoadingPage] = React.useState(false);
  const [loadingAction, setLoadingAction] = React.useState(false);
  const [note, setNote] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      setLoadingPage(true);

      const response = await getNote(id);
      if (response.error) {
        setLoadingPage(false);
        return;
      }

      setLoadingPage(false);
      setNote(response.data);
    })();
  }, []);

  async function handleNoteAction({
    confirmMessage,
    actionFn,
    successRedirect = "/",
  }) {
    setLoadingAction(true);

    const isConfirmed = confirm(confirmMessage);
    if (!isConfirmed) {
      setLoadingAction(false);
      return;
    }

    const response = await actionFn(note.id);

    setLoadingAction(false);

    alert(t[response.message]);

    if (!response.error) {
      navigate(successRedirect);
    }
  }

  async function handleDeleteNote() {
    await handleNoteAction({
      confirmMessage: t.confirmDeleteNote,
      actionFn: deleteNote,
    });
  }

  async function handleArchiveNote() {
    await handleNoteAction({
      confirmMessage: t.confirmArchiveNote,
      actionFn: archiveNote,
    });
  }

  async function handleUnarchiveNote() {
    await handleNoteAction({
      confirmMessage: t.confirmUnarchiveNote,
      actionFn: unarchiveNote,
    });
  }

  if (loadingPage) {
    return (
      <section className="detail-page">
        <h3 className="detail-page__title" style={{ textAlign: "center" }}>
          Loading...
        </h3>
      </section>
    );
  }

  return (
    <section className="detail-page">
      {note ? (
        <>
          <h3 className="detail-page__title">{note.title}</h3>
          <p className="detail-page__createdAt">
            {showFormattedDate(
              note.createdAt,
              language === "id" ? "id-ID" : "en-US",
            )}
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
        disabled={loadingAction}
      >
        {loadingAction ? <FaSpinner className="spinner" /> : <FaHome />}
      </button>

      {note?.archived ? (
        <button
          className="homepage__action action"
          style={{ right: "96px", color: "white", backgroundColor: "red" }}
          onClick={handleUnarchiveNote}
          disabled={loadingAction}
        >
          {loadingAction ? <FaSpinner className="spinner" /> : <LuArchiveX />}
        </button>
      ) : (
        <button
          className="homepage__action action"
          style={{ right: "96px" }}
          onClick={handleArchiveNote}
          disabled={loadingAction}
        >
          {loadingAction ? <FaSpinner className="spinner" /> : <FaArchive />}
        </button>
      )}

      <button
        className="homepage__action action"
        style={{ color: "white", backgroundColor: "red" }}
        onClick={handleDeleteNote}
        disabled={loadingAction}
      >
        {loadingAction ? <FaSpinner className="spinner" /> : <FaTrash />}
      </button>
    </section>
  );
}
