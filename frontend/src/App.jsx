import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import './App.css';

// --- קומפוננטות זמניות (Placeholders) ---
// בהמשך תעביר כל אחת מהן לקובץ נפרד בתיקיית pages

const HomePage = () => (
  <div className="page">
    <h1>🏠 Welcome to SpotOn</h1>
    <p>Smart Parking Management System</p>
  </div>
);

const SpotList = () => (
  <div className="page">
    <h1>🅿️ Available Parking Spots</h1>
    <p>List of spots will appear here...</p>
  </div>
);

const SpotDetails = () => (
  <div className="page">
    <h1>ℹ️ Spot Details</h1>
    <p>Details about a specific parking spot.</p>
  </div>
);

const SpotEdit = () => (
  <div className="page">
    <h1>✍️ Edit / Create Spot</h1>
    <p>Admin form to manage spots.</p>
  </div>
);

const AdminDashboard = () => (
  <div className="page">
    <h1>👑 Admin Dashboard</h1>
    <p>Manage users, revenue, and settings.</p>
  </div>
);

// קומפוננטת התחברות בסיסית לצורך בדיקה
const LoginPage = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // סימולציה של התחברות
    login({ username: 'Guy', role: 'admin', email }); 
    navigate('/');
  };

  return (
    <div className="page">
      <h1>👤 Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Enter email..." 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// --- האפליקציה הראשית ---

function App() {
  const { user, logout, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) return <div className="loading">Loading App...</div>;

  return (
    <div className="app-container">
      {/* 1. Navbar / Header - ניווט עליון */}
      <header className="main-header">
        <div className="logo">SpotOn 🚗</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/spot">Spots</Link>
          
          {user && user.role === 'admin' && (
            <Link to="/admin">Admin</Link>
          )}

          <div className="auth-section">
            {user ? (
              <>
                <span className="welcome-msg">Hello, {user.username}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </>
            ) : (
              <Link to="/login" className="login-link">Login</Link>
            )}
          </div>
        </nav>
      </header>

      {/* 2. Main Content - כאן מתחלפים המסכים */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/spot" element={<SpotList />} />
          <Route path="/spot/:id" element={<SpotDetails />} />
          <Route path="/spot/edit" element={<SpotEdit />} />
          
          {/* הגנה על ראוט האדמין */}
          <Route 
            path="/admin" 
            element={user?.role === 'admin' ? <AdminDashboard /> : <HomePage />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;