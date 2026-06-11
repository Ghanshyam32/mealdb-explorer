import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        🍽️ MealDB Explorer
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}

export default Navbar;
