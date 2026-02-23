import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/global.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      await api.post("/user/login", { email, password });
      window.location.href = "/";
    } catch (err) {
      setError("כניסה נכשלה. בדוק אימייל וסיסמה");
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>SpotOn</h1>
        <p>ניהול חנייה חכם</p>
        <input
          className="input"
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button className="btn-primary" onClick={handleLogin}>
          כניסה
        </button>
        <div>
          <span>אין לך חשבון? </span>
          <Link to="/register">הירשם</Link>
        </div>
        <div className="demo-info">
          פרטי הדגמה: test@test.com / 123456
        </div>
      </div>
    </div>
  );
}

export default Login;