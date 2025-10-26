import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import { showFormattedDate } from "../utils/index";

function NoteList({ notes }) {
  const { language } = React.useContext(LanguageContext);

  return (
    <>
      {notes.length ? (
        <section className="notes-list">
          {notes.map((note) => (
            <article className="note-item" key={note.id}>
              <h3 className="note-item__title">
                <Link to={`/notes/${note.id}`}>{note.title}</Link>
              </h3>
              <p className="note-item__createdAt">
                {showFormattedDate(
                  note.createdAt,
                  language === "id" ? "id-ID" : "en-US",
                )}
              </p>
              <p className="note-item__body">{note.body}</p>
            </article>
          ))}
        </section>
      ) : (
        <section className="notes-list-empty">
          <p>Tidak ada catatan.</p>
        </section>
      )}
    </>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default NoteList;
