import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { getActiveNotes } from "../utils/local-data";

export default function HomePage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const keywordParam = searchParams.get("keyword") || "";

  const [keyword, setKeyword] = React.useState(keywordParam);
  const notes = getActiveNotes();

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  const handleKeywordChange = (newKeyword) => {
    setKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };

  return (
    <section className="homepage">
      <h2>Active Notes</h2>

      <SearchBar keyword={keyword} keywordChange={handleKeywordChange} />

      <NoteList notes={filteredNotes} />

      <button
        className="homepage__action action"
        onClick={() => navigate("/notes/new")}
      >
        <FaPlus />
      </button>
    </section>
  );
}
