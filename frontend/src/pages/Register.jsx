import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/global.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      await api.post("/user/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "הרשמה נכשלה");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>SpotOn</h1>
        <p>יצירת חשבון חדש</p>
        <input
          className="input"
          type="text"
          name="name"
          placeholder="שם מלא"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="input"
          type="email"
          name="email"
          placeholder="אימייל"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="סיסמה"
          value={form.password}
          onChange={handleChange}
        />
        {error && <p className="error-message">{error}</p>}
        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "נרשם..." : "הרשמה"}
        </button>
        <div>
          <span>כבר יש לך חשבון? </span>
          <Link to="/login">התחבר</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;