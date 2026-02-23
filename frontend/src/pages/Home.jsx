import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/global.css";

function Home() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/session/my-sessions")
      .then(res => {
        setSessions(res.data);
      })
      .catch(err => {
        console.error("Error fetching sessions:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>My Parking History</h1>

      {loading ? (
        <p>Loading your orders...</p>
      ) : sessions.length === 0 ? (
        <p>You have no parking history yet.</p>
      ) : (
        <div className="sessions-list">
          {sessions.map(session => (
            <div key={session._id} className="card session-card">
              <h3>{session.space_id ? session.space_id.name : "Unknown Spot"}</h3>
              <p><strong>License Plate:</strong> {session.license_plate}</p>
              <p><strong>Entry Time:</strong> {new Date(session.entry_time).toLocaleString()}</p>
              {session.exit_time ? (
                <>
                  <p><strong>Exit Time:</strong> {new Date(session.exit_time).toLocaleString()}</p>
                  <p><strong>Duration:</strong> {session.duration_minutes} mins</p>
                  <p><strong>Cost:</strong> ₪{session.total_amount.toFixed(2)}</p>
                  <span className={`status-badge ${session.is_paid ? 'paid' : 'unpaid'}`}>
                    {session.is_paid ? "Paid" : "Unpaid"}
                  </span>
                </>
              ) : (
                <span className="status-badge active">Active Now</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
