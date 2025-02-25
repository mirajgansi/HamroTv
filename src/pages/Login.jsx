import React, { useState } from "react";
import "../styles/Login.css";
import api from "../Script/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock, faEnvelope, faEye, faEyeSlash, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLocked, setIsLocked] = useState(true); // New state for lock/unlock
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address (e.g., user@example.com).");
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post("/users/login", { email, password });
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("currentEmail", email);
        localStorage.setItem("currentUsername", response.data.username);
        navigate("/Main");
      } else {
        setError("Login failed. No token received from server.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred during login.";
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (err.response?.status === 400) {
        setError("Bad request. Please check your email and password.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
    setIsLocked((prevState) => !prevState); // Toggle lock state with visibility
  };

  const handleAdminClick = (e) => {
    e.preventDefault();
    setIsAdminModalOpen(true);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setAdminError("");

    if (!adminEmail.trim() || !/\S+@\S+\.\S+/.test(adminEmail)) {
      setAdminError("Please enter a valid admin email.");
      return;
    }
    if (!adminPassword.trim()) {
      setAdminError("Please enter the admin password.");
      return;
    }

    const hardcodedAdminEmail = "admin@gmail.com";
    const hardcodedAdminPassword = "2019";

    if (adminEmail === hardcodedAdminEmail && adminPassword === hardcodedAdminPassword) {
      localStorage.setItem("isAdmin", "true");
      setIsAdminModalOpen(false);
      navigate("/adminpage");
    } else {
      setAdminError("Invalid admin email or password.");
    }
  };

  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
    setAdminEmail("");
    setAdminPassword("");
    setAdminError("");
  };

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}
      <div className="Logo">
        <img src={require("../icons/logo.png")} alt="HamroTV Logo" />
      </div>
      <div className="login-container">
        <h1>Welcome</h1>
        <h2>We are glad to see you back with us</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="input-login-icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              autoComplete="email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <FontAwesomeIcon
              icon={isLocked ? faLock : faUnlock} // Toggle between lock and unlock icons
              className="input-login-icon"
            />
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder=" "
              autoComplete="current-password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <label htmlFor="password">Password</label>
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEyeSlash : faEye}
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Next"}
          </button>
        </form>
        <div className="alternative-login">
          <div className="divider">
            <span className="line"></span>
            <span>Login with Others</span>
            <span className="line"></span>
          </div>
          <button type="button" className="google-btn" onClick={handleAdminClick}>
            <FontAwesomeIcon icon={faUserCog} className="google-logo" />
            Are you Admin?
          </button>
          <span className="new-user">
            <Link to="/signup">Create Account</Link>
          </span>
        </div>
      </div>

      {/* Admin Modal */}
      {isAdminModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Admin Login</h2>
            <form onSubmit={handleAdminSubmit}>
              <div className="input-group">
                <FontAwesomeIcon icon={faEnvelope} className="input-login-icon" />
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <FontAwesomeIcon icon={isLocked ? faLock : faUnlock} className="input-login-icon" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Admin Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                />
              </div>
              {adminError && <p className="error-message">{adminError}</p>}
              <div className="modal-buttons">
                <button type="submit" className="modal-btn">Login</button>
                <button type="button" className="modal-btn cancel" onClick={closeAdminModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;