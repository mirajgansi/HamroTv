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
        
      </div>
      <div className="form-wrapper">
        <div className="profile">
        <h1>Welcome <span className="highlight"> <br />to the family! Begin your journey with us <br /> by signing up</span></h1>

        </div>
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