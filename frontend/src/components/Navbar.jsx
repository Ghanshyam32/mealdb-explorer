import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <div className="brand-mark">🍽</div>
          <span className="brand-name">
            MealDB<span className="brand-dot">.</span>
          </span>
        </Link>
        <Link to="/" className="nav-link">Explore</Link>
      </div>
    </nav>
  );
}

export default Navbar;
