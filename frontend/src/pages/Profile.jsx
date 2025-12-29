import { useState } from "react";
import "../styles/global.css";

function Profile() {
  const [user] = useState({
    name: "יוסי כהן",
    email: "test@test.com",
    phone: "050-1234567",
    vehicleNumber: "12-345-67",
    joinDate: "ינואר 2024"
  });

  const [bookings] = useState([
    { id: 1, spot: "A1", date: "29/12/2024", time: "08:00-17:00", status: "active" },
    { id: 2, spot: "B3", date: "28/12/2024", time: "08:00-17:00", status: "completed" },
    { id: 3, spot: "A5", date: "27/12/2024", time: "09:00-18:00", status: "completed" },
    { id: 4, spot: "C2", date: "26/12/2024", time: "08:30-16:30", status: "completed" }
  ]);

  const stats = {
    totalBookings: bookings.length,
    activeBookings: bookings.filter(b => b.status === 'active').length,
    hoursParked: 156
  };

  return (
    <div className="profile">
      <div className="card">
        <h2>הפרופיל שלי</h2>
        
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0)}
          </div>
          <div className="profile-info">
            <h3>{user.name}</h3>
            <p>חבר מאז {user.joinDate}</p>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-value">{stats.totalBookings}</span>
            <span className="profile-stat-label">סך הזמנות</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{stats.activeBookings}</span>
            <span className="profile-stat-label">הזמנות פעילות</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{stats.hoursParked}</span>
            <span className="profile-stat-label">שעות חנייה</span>
          </div>
        </div>

        {/* Personal Information */}
        <div className="profile-section">
          <h3>פרטים אישיים</h3>
          <div className="profile-field">
            <span className="profile-field-label">אימייל</span>
            <span className="profile-field-value">{user.email}</span>
          </div>
          <div className="profile-field">
            <span className="profile-field-label">טלפון</span>
            <span className="profile-field-value">{user.phone}</span>
          </div>
          <div className="profile-field">
            <span className="profile-field-label">מספר רכב</span>
            <span className="profile-field-value">{user.vehicleNumber}</span>
          </div>
        </div>

        {/* Booking History */}
        <div className="profile-section">
          <h3>היסטוריית הזמנות</h3>
          {bookings.map(booking => (
            <div key={booking.id} className="booking-history-item">
              <div>
                <div className="booking-history-spot">מקום {booking.spot}</div>
                <div className="booking-history-date">{booking.date} • {booking.time}</div>
              </div>
              <span className={`booking-history-status ${booking.status}`}>
                {booking.status === 'active' ? 'פעיל' : 'הושלם'}
              </span>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <button 
          className="btn-secondary" 
          style={{ width: '100%', marginTop: '24px' }}
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
        >
          התנתק
        </button>
      </div>
    </div>
  );
}

export default Profile;