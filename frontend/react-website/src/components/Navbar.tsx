import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import HvlLogo from "../assets/hvl_logo.png";

import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { student, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/Login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <NavLink to="/">
            <img src={HvlLogo} alt="HVL logo" className="navbar-logo" />
            <span>StudyFlow</span>
          </NavLink>
        </div>

        <ul className="nav-links">
          {student && (
            <>
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
            </>
          )}
        </ul>

        <div className="navbar-actions">
          {student ? (
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <NavLink to="/Login" className="login-link">
              <User size={18} />
              <span>Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
