import { useState } from "react";
import api from "../services/api";
import "../styles/global.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    const DEMO_EMAIL = "test@test.com";
    const DEMO_PASS = "123456";

    // בדיקה קבועה מראש – עובד גם בלי שרת
    if (email === DEMO_EMAIL && password === DEMO_PASS) {
      localStorage.setItem("token", "demo-offline-token");
      window.location.href = "/";
      return;
    }

    // ניסיון להתחבר ל-API אמיתי
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError("כניסה נכשלה. להדגמה השתמש ב: test@test.com / 123456");
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
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

        {error && <p style={{ color: "var(--danger)", margin: "10px 0" }}>{error}</p>}

        <button className="btn-primary" style={{ width: "100%" }} onClick={handleLogin}>
          כניסה
        </button>

        <div style={{ marginTop: "20px", color: "var(--text-light)", fontSize: "0.9rem" }}>
          פרטי הדגמה: test@test.com / 123456
        </div>
      </div>
    </div>
  );
}

export default Login;