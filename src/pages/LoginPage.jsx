import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import { translations } from "../utils/translations";
import { useGuest } from "../hooks/useGuest";
import { LanguageContext } from "../contexts/LanguageContext";

export default function LoginPage() {
  useGuest();

  const { language } = React.useContext(LanguageContext);
  const t = translations[language];

  return (
    <section>
      <h2>{t.loginPrompt}</h2>

      <Login />

      <div>
        <p>
          {t.noAccount} <Link to="/register">{t.registerHere}</Link>
        </p>
      </div>
    </section>
  );
}
