import React from "react";
import "../styles/SignUp.css"; 
import profileIcon from "../icons/camera.png"; 
import usernameIcon from "../icons/username.png";
import emailIcon from "../icons/email.png";
import passwordIcon from "../icons/password.png";

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="signup-container">
      <div className="logo">
        <h1>H<span className="highlight">Tv</span></h1>
      </div>
      <div className="form-wrapper">
        <div className="profile-icon">
          <img src={profileIcon} alt="Profile Icon" />
        </div>
        <h2 className="form-title">Profile</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <img src={usernameIcon} alt="Username Icon" className="input-icon" />
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-group">
            <img src={emailIcon} alt="Email Icon" className="input-icon" />
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <img src={passwordIcon} alt="Password Icon" className="input-icon" />
            <input
              type="password"
              placeholder="Create Password"
              required
              pattern=".{8,}"
              title="Password must be at least 8 characters long"
            />
          </div>
          <div className="input-group">
            <img src={passwordIcon} alt="Confirm Password Icon" className="input-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              pattern=".{8,}"
              title="Password must be at least 8 characters long"
            />
          </div>
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
