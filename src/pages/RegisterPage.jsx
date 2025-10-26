import React from "react";
import { Link } from "react-router-dom";
import Register from "../components/Register";
import { useGuest } from "../hooks/useGuest";
import { translations } from "../utils/translations";
import { LanguageContext } from "../contexts/LanguageContext";

export default function RegisterPage() {
  useGuest();

  const { language } = React.useContext(LanguageContext);
  const t = translations[language];

  return (
    <section>
      <h2>{t.registerPrompt}</h2>

      <Register />

      <div>
        <p>
          {t.haveAccount} <Link to="/login">{t.loginHere}</Link>
        </p>
      </div>
    </section>
  );
}
