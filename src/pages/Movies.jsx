import React from "react";
import HomePage from "./HomePage";
import Sidebar from "./SideBar";
import ProfileIcon from "./ProfileIcon";
import "../styles/HomePage.css"; // Add styling if needed

const Main = () => {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar />
      </div>

      {/* Search Container (optional placeholder) */}
      <div className="search-container">
        {/* Add search functionality or placeholder here */}
      </div>

      {/* Profile Icon */}
      <div className="profile-icon">
        <ProfileIcon />
      </div>

      {/* Main Content (HomePage) */}
      <div className="main-content">
        <HomePage />
      </div>
    </div>
  );
};

export default Main;
