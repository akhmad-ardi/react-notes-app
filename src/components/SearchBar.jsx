import React from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";

function SearchBar({ keyword, keywordChange }) {
  const { language } = React.useContext(LanguageContext);
  const t = translations[language];

  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder={`${t.findNotes}...`}
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </section>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
