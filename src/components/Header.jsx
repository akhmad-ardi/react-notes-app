import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineGTranslate } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { useUser } from "../hooks/useUser";
import { translations } from "../utils/translations";

export default function Header() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toggleTheme } = React.useContext(ThemeContext);
  const { language, toggleLanguage } = React.useContext(LanguageContext);
  const t = translations[language];

  function handleLogout() {
    if (confirm(t.confirmLogout)) {
      localStorage.removeItem("accessToken");

      navigate("/login");
    }
  }

  return (
    <header>
      <h1>{t.appName}</h1>

      <button
        className="toggle-locale"
        onClick={toggleLanguage}
        style={{ textTransform: "uppercase" }}
      >
        <MdOutlineGTranslate /> {language}
      </button>

      <button className="toggle-theme" onClick={toggleTheme}>
        <IoSunny />
      </button>

      {user ? (
        <button className="button-logout" onClick={handleLogout}>
          <HiArrowRightStartOnRectangle />
          {user.name}
        </button>
      ) : null}
    </header>
  );
}
