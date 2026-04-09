import {useState} from "react";

import userIcon from '../assets/profile-icon.jpg';
import "../components/Login.css";
import SignUpModal from "../components/SignUpModal.tsx";

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  return (

    <div className="login-page">
      <div className="login-box">

        <img src={userIcon} alt="User icon" className="login-icon" />

        <h1>Sign In</h1>

        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="username@email.com" />

          <label>Password</label>
          <input type="password" placeholder="Password" />

          <a href="#" className="forgot-password">
            Forgot your password?
          </a>

          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <span className="signup-link" onClick={() => setShowSignUp(true)}>
          Sign Up
          </span>
        </p>
      </div>
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </div>
  );
};
export default Login;