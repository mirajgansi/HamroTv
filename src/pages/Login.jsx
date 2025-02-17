
import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import api from "../Script/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope,faEye, faEyeSlash,faUserCog} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 2000); // Clears error after 1 second
      return () => clearTimeout(timer); // Cleanup function
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email.trim() || !password.trim()) {
      setError('Email and password cannot be empty.');
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await api.post('/users/login', { email, password });
  
      console.log('Full API Response:', response.data); // Debugging response
  
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentEmail', email);
        
        console.log('Login successful:', response.data);

        
        navigate('/Main');
      } else {
        console.error('Unexpected API response:', response.data);
        setError(`Unexpected API response. Check server response: ${JSON.stringify(response.data)}`);
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleAdminClick = () => {
    const isAdmin = window.confirm("Are you an Admin?");
    
    if (isAdmin) {
      const password = prompt("Enter Admin Passkey:", "");
      const adminPassword = "2019"; // Hardcoded, should be secured or moved to environment variables
      if (password === adminPassword) {
        alert("Welcome Admin!");
        localStorage.setItem('isAdmin', 'true'); // Set admin status in localStorage
        navigate('/admin'); // Navigate to admin page
      } else {
        alert("Incorrect credentials. Please try again.");
      }
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
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder=" "
            autoComplete="current-password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
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
            <Link to="/admin">
            <button type="button" className="google-btn" onClick={handleAdminClick}>
            <FontAwesomeIcon icon={faUserCog} alt="Google logo" className="google-logo" />
              Are you Admin?
            </button> </Link>
            
            <span className="new-user">
              <Link to="/signup">Create Account</Link>
            </span>
          </div>
        </div>
      </div>
    );
  };

  export default Login;