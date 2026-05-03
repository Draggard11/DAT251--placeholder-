import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import userIcon from "../assets/profile-icon.jpg";
import "../components/Login.css";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  onClose: () => void;
};

const SignUpModal: React.FC<Props> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name,
        email,
        password,
        ...(dateOfBirth ? { dateOfBirth } : {}),
      });
      onClose();
      navigate("/");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not create account.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-title"
      onClick={handleOverlayClick}
    >
      <div className="signup-modal">
        <button
          type="button"
          onClick={onClose}
          className="close-btn"
          aria-label="Close sign up"
        >
          ×
        </button>

        <img src={userIcon} alt="" className="signup-modal-icon" />

        <h2 id="signup-title">Sign Up</h2>

        <form className="login-form signup-form" onSubmit={handleSubmit}>
          <label htmlFor="signup-name">Name</label>
          <input
            id="signup-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />

          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            placeholder="username@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <label htmlFor="signup-dob">Date of birth (optional)</label>
          <input
            id="signup-dob"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />

          <label htmlFor="signup-confirm">Confirm password</label>
          <input
            id="signup-confirm"
            type="password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="signin-btn" disabled={isLoading}>
            {isLoading ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
