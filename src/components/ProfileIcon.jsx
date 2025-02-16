import React, { useContext, useState, useEffect, useRef } from "react";
import { ProfilePictureContext } from "./ProfilePictureContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";
import peterImage from "../assets/peter.png";

const ProfileIcon = () => {
  const { profilePicture } = useContext(ProfilePictureContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUsername");
    navigate("/");
  };

  const handleSwitchAccount = () => {
    console.log("Switch account");
  };

  const handleSetting = () => {
    console.log("Opening settings...");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem("currentUsername");
        console.log("Phase 1 - Retrieved username:", username);

        if (!username || username === "undefined") {
          console.error("No username found in localStorage");
          setError("No user logged in");
          return;
        }

        console.log("Phase 2 - Making API call for:", username);
        const response = await axios.get(
          `http://localhost:5000/users/${username}`
        );

        console.log("Phase 3 - API Response:", response.data);
        if (!response.data?.username) {
          throw new Error("Invalid user data");
        }

        setUser(response.data);
        setError("");
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(err.response?.data?.error || "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="profile-icon-container" ref={dropdownRef}>
      <img
        src={profilePicture || peterImage}
        alt="Profile"
        className="profile-icon"
        onClick={handleDropdownToggle}
      />
      {isDropdownOpen && (
        <div className="profile-dropdown">
          <div className="profile-info">
            <img
              src={profilePicture || peterImage}
              alt="Profile"
              className="dropdown-pic"
            />
            <div className="details">
              <p className="profile-name">
                {user ? user.username : "Guest"}
              </p>
              <p className="profile-email">
                {user ? user.email : "No email found"}
              </p>
            </div>
          </div>
          <Link to="/setting">
          <button className="dropdown-button" onClick={handleSetting}>
            Setting
          </button></Link>
          <Link to="/">
          <button className="dropdown-button" onClick={handleLogout} > 
            Log Out
          </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;