import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faEye, faEyeSlash, faUserCog } from "@fortawesome/free-solid-svg-icons";
import "../styles/AdminLogin.css";

const AdminLogin = () => {
  const [isModalOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      alert("Welcome Admin!");
      navigate("/adminpage");
    } else {
      setError("Incorrect email or password.");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="container">
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
            <FontAwesomeIcon icon={faUserCog} className="input-icon left" />
            Admin Login</h2>
            {error && <p className="error-message">{error}</p>}
            
            {/* Email Input */}
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon left" />
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon left" />
              <input
                type={isPasswordVisible ? "text" : "password"} // Dynamic type
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={isPasswordVisible ? faEyeSlash : faEye}
                className="input-icon right clickable"
                onClick={togglePasswordVisibility}
              />
            </div>

            <button onClick={handleLogin}>Login</button>
            <button className="close-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;