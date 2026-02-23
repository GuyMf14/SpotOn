import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/global.css";

function BookParking() {
  // Booking state
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  // Rate state
  const [rates, setRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState("");

  // Create Space state
  const [newSpaceName, setNewSpaceName] = useState("");
  const [newSpaceCapacity, setNewSpaceCapacity] = useState("");

  // UI state
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSpaces();
    fetchRates();
  }, []);

  const fetchSpaces = async () => {
    try {
      const res = await api.get("/space");
      // Only show spaces that have room
      const availableSpaces = res.data.filter(s => s.current_occupancy < s.capacity && s.is_active);
      setSpaces(availableSpaces);
    } catch (err) {
      console.error("Error fetching spaces", err);
    }
  };

  const fetchRates = async () => {
    try {
      const res = await api.get("/rate");
      setRates(res.data);
      if (res.data.length > 0) {
        setSelectedRate(res.data[0]._id);
      }
    } catch (err) {
      console.error("Error fetching rates", err);
    }
  };

  const handleCreateSpace = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/space", {
        name: newSpaceName,
        capacity: Number(newSpaceCapacity)
      });
      setMessage(`Successfully created parking space: ${newSpaceName}`);
      setNewSpaceName("");
      setNewSpaceCapacity("");
      fetchSpaces(); // Refresh the dropdown
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create space");
    }
  };

  const handleBookSpace = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // We assume user_id is handled by the backend using token
    // For this simple version, we'll extract it from the token payload on the server

    if (!selectedSpace || !licensePlate || !selectedRate) {
      setError("Please fill all booking fields");
      return;
    }

    try {
      // In a real app we'd fetch the user ID from context.
      // Here we assume the backend handles tying the session to the logged-in user 
      // based on the JWT cookie, OR we need the frontend to supply it. 
      // Based on session.controller.js we need user_id in the body.
      // Let's get the user ID first.
      const userRes = await api.get("/user/me");
      const userId = userRes.data._id;

      await api.post("/session", {
        user_id: userId,
        space_id: selectedSpace,
        license_plate: licensePlate,
        rate_id: selectedRate
      });

      setMessage("Parking booked successfully!");
      setLicensePlate("");
      setSelectedSpace("");
      fetchSpaces(); // Refresh available spaces
    } catch (err) {
      setError(err.response?.data?.error || "Failed to book parking");
    }
  };

  return (
    <div className="booking-container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '40px' }}>

      {/* Create Space Card (Admin/Manager) */}
      <div className="booking card" style={{ margin: 0, flex: '1 1 400px', maxWidth: '500px' }}>
        <h2>Add Parking Zone</h2>
        <form onSubmit={handleCreateSpace}>
          <div className="form-group">
            <label className="form-label">Zone / Lot Name</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. Lot A or VIP Level"
              value={newSpaceName}
              onChange={(e) => setNewSpaceName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Total Capacity</label>
            <input
              type="number"
              className="input"
              placeholder="Number of parking spots"
              value={newSpaceCapacity}
              onChange={(e) => setNewSpaceCapacity(e.target.value)}
              min="1"
              required
            />
          </div>

          <button type="submit" className="btn-secondary" style={{ width: '100%' }}>Create Zone</button>
        </form>
      </div>

      {/* Book Space Card */}
      <div className="booking card" style={{ margin: 0, flex: '1 1 400px', maxWidth: '500px' }}>
        <h2>Book a Parking Spot</h2>

        {message && <div className="booking-success"><p>{message}</p></div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleBookSpace}>
          <div className="form-group">
            <label className="form-label">Select Location</label>
            <select
              className="input"
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
              required
            >
              <option value="">Select an available spot</option>
              {spaces.map(space => (
                <option key={space._id} value={space._id}>
                  {space.name} (Available: {space.capacity - space.current_occupancy})
                </option>
              ))}
            </select>
            {spaces.length === 0 && <p className="form-helper" style={{ color: 'var(--danger)' }}>No available parking spots right now.</p>}
          </div>

          <div className="form-group">
            <label className="form-label">License Plate</label>
            <input
              type="text"
              className="input"
              placeholder="Enter your license plate"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ display: 'none' }}>
            {/* Hidden, assuming a default rate is chosen, or could be exposed if multiple rates exist */}
            <label className="form-label">Rate Type</label>
            <select
              className="input"
              value={selectedRate}
              onChange={(e) => setSelectedRate(e.target.value)}
              required
            >
              {rates.map(rate => (
                <option key={rate._id} value={rate._id}>
                  {rate.name} - ₪{rate.price_per_hour}/hr
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={spaces.length === 0}>Start Session</button>
        </form>
      </div>

    </div>
  );
}

export default BookParking;
