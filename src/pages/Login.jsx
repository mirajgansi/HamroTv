
import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import api from "../Script/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password_hash, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 1000); // Clears error after 1 second
      return () => clearTimeout(timer); // Cleanup function
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password_hash.trim()) {
      setError('Email and password cannot be empty.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/users/login', { email, password_hash });
      localStorage.setItem('token', response.data.token);
      console.log('Login successful:', response.data);
      navigate('/Main'); // Redirect after login
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
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
              setError('');
            }}
          />
          <label htmlFor="email">Email</label>
        </div>

            {/* Password Field */}
            <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="input-login-icon" />
          <input
            type="password"
            id="password"
            name="password"
            placeholder=" "
            autoComplete="current-password"
            value={password_hash}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
          />
          <label htmlFor="password">Password</label>
        </div>
        {error && <p className="error-message">{error}</p>}
            
            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}>
            
              {isLoading ? 'Loading...' : 'Next'}
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
            <button type="button" className="google-btn">
              <img src={require("../icons/google.png")} alt="Google logo" className="google-logo" />
              Login with Google
            </button>
            
            <span className="new-user">
              <Link to="/signup">Create Account</Link>
            </span>
          </div>
        </div>
      </div>
    );
  };

  export default Login;
