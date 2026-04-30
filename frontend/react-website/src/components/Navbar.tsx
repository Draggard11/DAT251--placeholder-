import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">StudyFlow</div>

        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Stats">Stats</NavLink>
          </li>
          <li>
            <NavLink to="/Groups">Study Groups</NavLink>
          </li>
          <li>
            <NavLink to="/Subjects">Subjects</NavLink>
          </li>
          <li>
            <NavLink to="/StudySession">Study Session</NavLink>
          </li>
        </ul>

        <NavLink to="/Login" className="login-link">
          <User size={18} />
          <span>Login</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
