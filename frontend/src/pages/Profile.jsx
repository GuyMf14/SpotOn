import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/global.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, sessionsRes] = await Promise.all([
          api.get("/user/me"),
          api.get("/session")
        ]);
        setUser(userRes.data);
        setSessions(sessionsRes.data);
      } catch (err) {
        console.log("Error:", err.response?.status, err.response?.data);
        setError("שגיאה בטעינת הפרופיל");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleLogout() {
    try {
      await api.post("/user/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      // Fallback
      navigate("/login");
    }
  }

  if (loading) return <div className="profile"><div className="card">טוען...</div></div>;
  if (error) return <div className="profile"><div className="card">{error}</div></div>;
  if (!user) return null;

  const activeSessions = sessions.filter(s => !s.endTime);
  const completedSessions = sessions.filter(s => s.endTime);

  return (
    <div className="profile">
      <div className="card">
        <h2>הפרופיל שלי</h2>
        <div className="profile-header">
          <div className="profile-avatar">{user.name.charAt(0)}</div>
          <div className="profile-info">
            <h3>{user.name}</h3>
            <p>חבר מאז {new Date(user.createdAt).toLocaleDateString("he-IL", { month: "long", year: "numeric" })}</p>
          </div>
        </div>
        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-value">{sessions.length}</span>
            <span className="profile-stat-label">סך הזמנות</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{activeSessions.length}</span>
            <span className="profile-stat-label">הזמנות פעילות</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{completedSessions.length}</span>
            <span className="profile-stat-label">הושלמו</span>
          </div>
        </div>
        <div className="profile-section">
          <h3>פרטים אישיים</h3>
          <div className="profile-field">
            <span className="profile-field-label">אימייל</span>
            <span className="profile-field-value">{user.email}</span>
          </div>
          {user.phone && (
            <div className="profile-field">
              <span className="profile-field-label">טלפון</span>
              <span className="profile-field-value">{user.phone}</span>
            </div>
          )}
        </div>
        <div className="profile-section">
          <h3>היסטוריית הזמנות</h3>
          {sessions.length === 0 ? (
            <p>אין הזמנות עדיין</p>
          ) : (
            sessions.map(session => (
              <div key={session._id} className="booking-history-item">
                <div>
                  <div className="booking-history-spot">מקום {session.spotNumber}</div>
                  <div className="booking-history-date">
                    {new Date(session.startTime).toLocaleDateString("he-IL")}
                  </div>
                </div>
                <span className={`booking-history-status ${!session.endTime ? "active" : "completed"}`}>
                  {!session.endTime ? "פעיל" : "הושלם"}
                </span>
              </div>
            ))
          )}
        </div>
        <button className="btn-secondary" style={{ width: "100%", marginTop: "24px" }} onClick={handleLogout}>
          התנתק
        </button>
      </div>
    </div>
  );
}

export default Profile;