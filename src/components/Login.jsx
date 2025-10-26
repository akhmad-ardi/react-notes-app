import React from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { login } from "../utils/network-data";
import { translations } from "../utils/translations";
import { LanguageContext } from "../contexts/LanguageContext";

export default function Login() {
  const navigate = useNavigate();

  const { language } = React.useContext(LanguageContext);
  const t = translations[language];

  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const response = await login({ email, password });
    if (response.error) {
      setLoading(false);
      alert(t[`${response.message}`]);
      return;
    }

    const accessToken = response.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    alert(`${t.loginSuccess}!!!`);
    navigate("/");
  }
  return (
    <form onSubmit={handleSubmit} className="input-login">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        required
        value={email}
        onChange={setEmail}
        disabled={loading}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        required
        value={password}
        onChange={setPassword}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        Login
      </button>
    </form>
  );
}
