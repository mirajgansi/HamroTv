import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faUser,faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import api from "../Script/api";
import "../styles/SignUp.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState({}); // Error state as an object
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const [clickedFields, setClickedFields] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };
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
    setError({}); // Reset errors on input change
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let newErrors = {};
    const username = formData.username.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();
  
    if (!username) newErrors.username = "Username is required!";
    if (!email) newErrors.email = "Email is required!";
    if (!password) newErrors.password = "Password is required!";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required!";
  
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
  
    if (password !== confirmPassword) {
      setError({ confirmPassword: "Passwords do not match!" });
      return;
    }
  
    if (!validatePassword(password)) {
      setError({
        password: "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number."
      });
      return;
    }
  
    try {
      setIsSubmitting(true);
      
      const response = await api.post("/users/register", { username, email, password });
  
      console.log("API Response:", response.data); // Debugging
  
      // ✅ Modify this check based on actual API response
      if (response.data.success || response.data.message === "Registration successful") {
        setError({ global: "Signup successful! Redirecting to login..." });
        navigate('/');
      } else {
        setError({ global: response.data.message || "Signup failed. Please try again!" });
      }
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      setError({ global: err.response?.data?.message || "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  const handleApiError = (error) => {
    if (!error.response) {
      setError({ global: "Server not responding. Please try again later." });
    } else {
      const errorMessage =
        error.response.data.message || "Registration failed. Please try again";
      setError({ global: errorMessage });
    }
    setTimeout(() => setError({}), 1000);
  };

  return (
    <div className="signup-container">
      {error.global && <div className="error-message">{error.global}</div>}

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
          {/* Username */}
          <div className={`input-group ${clickedFields.username || formData.username ? "focused" : ""}`}>
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder=" "
              value={formData.username}
              onChange={handleInputChange}
              onFocus={() => handleFocus("username")}
              onBlur={(e) => handleBlur("username", e.target.value)}
            />
            <label>Username</label>
            {error.username && <p className="error-text">{error.username}</p>}
          </div>

          {/* Email */}
          <div className={`input-group ${clickedFields.email || formData.email ? "focused" : ""}`}>
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
            {error.email && <p className="error-text">{error.email}</p>}
          </div>

          {/* Password */}
          <div className={`input-group ${clickedFields.password || formData.password ? "focused" : ""}`}>
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
                      type={isPasswordVisible ? 'text' : 'password'}

              name="password"
              placeholder=" "
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => handleFocus("password")}
              onBlur={(e) => handleBlur("password", e.target.value)}
              required
              minLength="8"
            />
            <FontAwesomeIcon
        icon={isPasswordVisible ? faEyeSlash : faEye}
        className="password-toggle-icon"
        onClick={togglePasswordVisibility}
      />
            <label>Create Password</label>
            {error.password && <p className="error-text">{error.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className={`input-group ${clickedFields.confirmPassword || formData.confirmPassword ? "focused" : ""}`}>
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
               type={isConfirmPasswordVisible ? 'text' : 'password'}
              name="confirmPassword"
              placeholder=" "
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onFocus={() => handleFocus("confirmPassword")}
              onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
              required
              minLength="8"
            />
            <FontAwesomeIcon
        icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
        className="password-toggle-icon"
        onClick={toggleConfirmPasswordVisibility}
      />
            <label>Confirm Password</label>
            {error.confirmPassword && <p className="error-text">{error.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? <div className="spinner"></div> : "Sign Up"}
          </button>

          {/* Login Link */}
          <span className="already-user">
            Already have an account? <Link to="/">Log In</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
