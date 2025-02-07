import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import api from "../Script/api";
import "../styles/SignUp.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password_hash: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [clickedFields, setClickedFields] = useState({
    username: false,
    email: false,
    password_hash: false,
    confirmPassword: false
  });

  const handleFocus = (field) => {
    setClickedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field, value) => {
    if (!value) {
      setClickedFields(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password_hash !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!validatePassword(formData.password_hash)) {
      setError(
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number."
      );
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Submitting:", formData);
      const response = await api.post("/register", {
        username: formData.username,
        email: formData.email,
        password_hash: formData.password_hash
      });

      if (response.data.success) {
        setError("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/loginUser"), 2000);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApiError = (error) => {
    if (!error.response) {
      setError("Server not responding. Please try again later.");
    } else {
      const errorMessage =
        error.response.data.message || "Registration failed. Please try again";
      setError(errorMessage);
    }
    setTimeout(() => setError(""), 3000);
  };

  return (
    <div className="signup-container">
      {error && <div className="error-message">{error}</div>}

      <div className="form-wrapper">
        <div className="profile">
          <h1>
            Welcome{" "}
            <span className="highlight">
              <br />
              to the family! Begin your journey with us <br /> by signing up
            </span>
          </h1>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div
            className={`input-group ${
              clickedFields.username || formData.username ? "focused" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder=" "
              value={formData.username}
              onChange={handleInputChange}
              onFocus={() => handleFocus("username")}
              onBlur={(e) => handleBlur("username", e.target.value)}
              required
              minLength="3"
            />
            <label>Username</label>
          </div>

          <div
            className={`input-group ${
              clickedFields.email || formData.email ? "focused" : ""
            }`}
          >
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder=" "
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => handleFocus("email")}
              onBlur={(e) => handleBlur("email", e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div
            className={`input-group ${
              clickedFields.password_hash || formData.password_hash
                ? "focused"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              name="password_hash"
              placeholder=" "
              value={formData.password_hash}
              onChange={handleInputChange}
              onFocus={() => handleFocus("password_hash")}
              onBlur={(e) => handleBlur("password_hash", e.target.value)}
              required
              minLength="8"
            />
            <label>Create Password</label>
          </div>

          <div
            className={`input-group ${
              clickedFields.confirmPassword || formData.confirmPassword
                ? "focused"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder=" "
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onFocus={() => handleFocus("confirmPassword")}
              onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
              required
              minLength="8"
            />
            <label>Confirm Password</label>
          </div>
          <Link to="/">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? <div className="spinner"></div> : "Sign Up"}
          </button></Link>
          

          <span className="already-user">
            Already have an account? <Link to="/">Log In</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
