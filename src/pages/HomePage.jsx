import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaPlus, FaArchive } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { LanguageContext } from "../contexts/LanguageContext";
import { getActiveNotes } from "../utils/network-data";
import { translations } from "../utils/translations";

export default function HomePage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const keywordParam = searchParams.get("keyword") || "";

  const { language } = React.useContext(LanguageContext);
  const t = translations[language];

  const [keyword, setKeyword] = React.useState(keywordParam);
  const [loadingPage, setLoadingPage] = React.useState(false);
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    setLoadingPage(true);

    (async () => {
      const response = await getActiveNotes();
      setNotes(response.data);
      setLoadingPage(false);
    })();
  }, []);

  const filteredNotes = notes?.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  const handleKeywordChange = (newKeyword) => {
    setKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };

  return (
    <section className="homepage">
      <h2>{t.activeNotes}</h2>

      <SearchBar keyword={keyword} keywordChange={handleKeywordChange} />

      {loadingPage ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      ) : (
        <NoteList notes={filteredNotes} />
      )}

      <button
        className="homepage__action action"
        onClick={() => navigate("/notes/archive")}
        style={{ right: "96px" }}
      >
        <FaArchive />
      </button>

      <button
        className="homepage__action action"
        onClick={() => navigate("/notes/new")}
      >
        <FaPlus />
      </button>
    </section>
  );
}
