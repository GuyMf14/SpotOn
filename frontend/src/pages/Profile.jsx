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

  const fetchData = async () => {
    try {
      const [userRes, sessionsRes] = await Promise.all([
        api.get("/user/me"),
        api.get("/session/my-sessions")
      ]);
      setUser(userRes.data);
      setSessions(sessionsRes.data);
    } catch (err) {
      console.log("Error:", err.response?.status, err.response?.data);
      setError("שגיאה בטעינת הפרופיל");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEndSession = async (sessionId) => {
    try {
      await api.put(`/session/${sessionId}/end`);
      fetchData(); // Refresh the data to show updated status and amount
    } catch (err) {
      console.error("Failed to end session:", err);
      alert(err.response?.data?.error || "Failed to end session");
    }
  };

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

  const activeSessions = sessions.filter(s => !s.exit_time);
  const completedSessions = sessions.filter(s => s.exit_time);

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
                  <div className="booking-history-spot">{session.space_id ? session.space_id.name : "N/A"}</div>
                  <div className="booking-history-date">
                    {new Date(session.entry_time).toLocaleDateString("he-IL")}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <span className={`booking-history-status ${!session.exit_time ? "active" : "completed"}`}>
                    {!session.exit_time ? "פעיל" : "שולם"}
                  </span>
                  {!session.exit_time ? (
                    <button
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: '0.875rem' }}
                      onClick={() => handleEndSession(session._id)}
                    >
                      סיים חניה
                    </button>
                  ) : (
                    <span style={{ fontWeight: 'bold' }}>
                      ₪{session.total_amount ? session.total_amount.toFixed(2) : "0.00"}
                    </span>
                  )}
                </div>
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