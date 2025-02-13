import React, { useContext, useState } from "react";
import { ProfilePictureContext } from "./ProfilePictureContext.jsx";
import "../styles/Profile.css"; // Include the CSS file for styling
import { Link ,useNavigate } from "react-router-dom";

const ProfileIcon = () => {
  const { profilePicture } = useContext(ProfilePictureContext); // Access the profile picture from context
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();   const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUsername');
    navigate('/');
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
      {/* Use the profile picture from context or a default image */}
      <img
        src={profilePicture || require("../assets/peter.png")} // Use the uploaded image or a default image
        alt="Profile"
        className="profile-icon"
        onClick={handleDropdownToggle}
      />
      {isDropdownOpen && (
        <div className="profile-dropdown">
          <div className="profile-info">
            {/* Use the profile picture from context or a default image */}
            <img
              src={profilePicture || require("../assets/peter.png")}
              alt="Profile"
              className="dropdown-pic"
            />
            <div className="details">
              <p className="profile-name">Peter Griffin</p>
              <p className="profile-email">PeeteGRIFIN@example.com</p>
            </div>
          </div>
          <Link to="/adminpage">
          <button className="dropdown-button" onClick={handleSwitchAccount}>
            Switch Account
          </button>
          </Link>
          <button className="dropdown-button" onClick={handleSetting}>
            <Link to="/setting">Setting</Link>
          </button>
          <button className="dropdown-button" onClick={handleLogout}>
            <Link to="/">Log Out</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;