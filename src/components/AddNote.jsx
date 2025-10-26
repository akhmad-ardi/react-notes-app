import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaSpinner } from "react-icons/fa";
import PropTypes from "prop-types";
import { LanguageContext } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import { addNote } from "../utils/network-data";

function AddNote({ setLoadingPage }) {
  const navigate = useNavigate();

  const { language } = React.useContext(LanguageContext);
  const t = translations[language];

  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  React.useEffect(() => {
    setLoadingPage(loading);
  }, [loading]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const response = await addNote({ title, body });
    if (response.error) {
      alert(response.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/");
    alert(t.addNoteSuccess);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          placeholder={`${t.placeholderAddNoteTitle}...`}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div
          className="add-new-page__input__body"
          contentEditable="true"
          data-placeholder={`${t.placeholderAddNoteBody}...`}
          onInput={(e) => setBody(e.target.innerText)}
          value={body}
        ></div>
      </div>

      <button
        type="submit"
        className="add-new-page__action action"
        style={{ right: "96px" }}
        disabled={loading}
      >
        {loading ? <FaSpinner className="spinner" /> : <FaCheck />}
      </button>
    </form>
  );
}

AddNote.propTypes = {
  setLoadingPage: PropTypes.func.isRequired,
};

export default AddNote;
