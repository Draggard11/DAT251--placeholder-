import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { User } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { student, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">StudyFlow</div>
          <ul className={"nav-links"}>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            {student && (
            <>
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
            <li>
            {student ? (
                <button onClick={handleLogout} className="logout-btn">
                Logout ({student.name})
                </button>
            ) : (
                <NavLink to="/Login" className="login-link">
                    <User size={18} />
                    <span>Login</span>
                </NavLink>
            )}
            </li>
          </ul>
          </div>
    </nav>
  );
};

export default Navbar;
