import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/global.css";

function ParkingAvailability() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/space")
      .then(res => {
        setSpaces(res.data);
      })
      .catch(err => {
        console.error("Error fetching spaces:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>Parking Zones Availability</h1>

      {loading ? (
        <p>Loading zones...</p>
      ) : spaces.length === 0 ? (
        <p>No parking zones have been added yet.</p>
      ) : (
        <div className="spots-grid">
          {spaces.map(space => {
            const isFull = space.current_occupancy >= space.capacity;
            const availableSpaces = space.capacity - space.current_occupancy;

            return (
              <div
                key={space._id}
                className={`spot ${isFull ? 'occupied' : 'free'}`}
                title={`${availableSpaces} spots available out of ${space.capacity}`}
              >
                <div className="spot-status"></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.25rem' }}>{space.name}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: "normal", marginTop: '4px' }}>
                    {availableSpaces}/{space.capacity} free
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ParkingAvailability;
