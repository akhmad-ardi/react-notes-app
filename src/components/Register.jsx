import React from "react";
import { useInput } from "../hooks/useInput";
import { translations } from "../utils/translations";
import { register } from "../utils/network-data";
import { LanguageContext } from "../contexts/LanguageContext";

export default function Register() {
  const { language } = React.useContext(LanguageContext);
  const t = translations[language];

  const [loading, setLoading] = React.useState(false);
  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      alert(t.msgRegisterPasswordNotMatch);
      setLoading(false);
      return;
    }

    const response = await register({ name, email, password });
    if (response.error) {
      setLoading(false);
      alert(t[`${response.message}`]);
      return;
    }

    setLoading(false);
    alert(t.msgRegisterSuccess);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className="input-login">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        required
        value={name}
        onChange={setName}
        disabled={loading}
      />

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

      <label htmlFor="confirm_password">Confirm Password</label>
      <input
        type="password"
        id="confirm_password"
        required
        value={confirmPassword}
        onChange={setConfirmPassword}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        Register
      </button>
    </form>
  );
}
