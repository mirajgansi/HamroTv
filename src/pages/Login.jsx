import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import api from "../Script/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faEye, faEyeSlash, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Single error message
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error on new submission attempt
    setError("");

    // Client-side validation
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
        localStorage.setItem("currentUsername", response.data.username); // Assuming username is returned
        navigate("/Main");
      } else {
        setError("Login failed. No token received from server.");
      }
    } catch (err) {
      // Handle specific backend errors
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
  };

  const handleAdminClick = () => {
    const isAdmin = window.confirm("Are you an Admin?");
    if (!isAdmin) return;

    const password = prompt("Enter Admin Passkey:", "");
    if (password === null) return;

    const adminPassword = "2019"; // Hardcoded; secure this in production
    if (password === adminPassword) {
      alert("Welcome Admin!");
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Incorrect admin passkey. Please try again.");
    }
  };

  return (
    <div className="container">
      {/* Error Message Display */}
      {error && <div className="error-message">{error}</div>}

      {/* Logo Section */}
      <div className="Logo">
        <img src={require("../icons/logo.png")} alt="HamroTV Logo" />
      </div>

      {/* Main Login Form */}
      <div className="login-container">
        <h1>Welcome</h1>
        <h2>We are glad to see you back with us</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
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
                setError(""); // Clear error on change
              }}
            />
            <label htmlFor="email">Email</label>
          </div>

          {/* Password Field */}
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-login-icon" />
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
                setError(""); // Clear error on change
              }}
            />
            <label htmlFor="password">Password</label>
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEyeSlash : faEye}
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            />
          </div>

          {/* Display error below inputs */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Next"}
          </button>

          <div className="new-user">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </form>

        {/* Alternative Login */}
        <div className="alternative-login">
          <div className="divider">
            <span className="line"></span>
            <span>Login with Others</span>
            <span className="line"></span>
          </div>
          <Link to="/admin">
            <button type="button" className="google-btn" onClick={handleAdminClick}>
              <FontAwesomeIcon icon={faUserCog} alt="Admin logo" className="google-logo" />
              Are you Admin?
            </button>
          </Link>
          <span className="new-user">
            <Link to="/signup">Create Account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;