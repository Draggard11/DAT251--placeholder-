import "./Navbar.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className={"nav-links"}>
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
        <li>
          <NavLink to="/Login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
