import {useState} from "react";
import { useNavigate } from "react-router-dom";

import userIcon from '../assets/profile-icon.jpg';
import "../components/Login.css";
import SignUpModal from "../components/SignUpModal.tsx";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      console.log("Login successful!");
      navigate("/"); // Navigate to home page after successful login
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <img src={userIcon} alt="User icon" className="login-icon" />

        <h1>Sign In</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email"
                 placeholder="username@email.com"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
          />

          <label>Password</label>
          <input type="password"
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
          />

          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          <a href="#" className="forgot-password">
            Forgot your password?
          </a>

          <button type="submit" className="signin-btn" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
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