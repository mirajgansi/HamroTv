import React, { useState } from "react";
import "../styles/Profile.css"; // Include the CSS file for styling
import { Link } from "react-router-dom";
const ProfileIcon = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    console.log("Logged out");
    // Add your logout functionality here
  };
  const handleSwitchAccount = () => {
    console.log("Switch account");
    // Add your switch account functionality here
  };
  const handleSetting = () => {
    console.log("Switch account");
    // Add your switch account functionality here
  };
  return (
    <div className="profile-icon-container">
      <img
        src={require('../assets/peter.png')} // Replace with the user's profile picture URL
        alt="Profile"
        className="profile-icon"
        onClick={handleDropdownToggle}
      />
      {isDropdownOpen && (
        <div className="profile-dropdown">
          <div className="profile-info">
            <img
              src={require('../assets/peter.png')}
              alt="Profile"
              className="dropdown-pic"
            />
            <div className="details">
              <p className="profile-name">Peter Griffin</p> 
              <p className="profile-email">PeeteGRIFIN@example.com</p>{" "}
            </div>
          </div>
          <button className="dropdown-button" onClick={handleSwitchAccount}>
            Switch Account
          </button>
          <button className="dropdown-button" onClick={handleSetting}>
          <Link to="/setting">Setting </Link>
          </button>
          <button className="dropdown-button" onClick={handleLogout}>
          <Link to="/">Log Out </Link>
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfileIcon;