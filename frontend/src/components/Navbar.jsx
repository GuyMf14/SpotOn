import { Link } from "react-router-dom";
import "../styles/global.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>SpotOn</h2>
      <div className="nav-links">
        <Link to="/">בית</Link>
        <Link to="/parking">חנייה</Link>
        <Link to="/book">הזמנה</Link>
        <Link to="/profile">פרופיל</Link>
      </div>
    </nav>
  );
}

export default Navbar;