import React, { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // Keep only Routes and Route imports
import HomePage from "../components/HomePage.jsx";

import Sidebar from "../components/SideBar.jsx";
import ProfileIcon from "../components/ProfileIcon.jsx";
import "../styles/Main.css";

const Main = ({ toggleSearchBar }) => {
    return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar toggleSearchBar={toggleSearchBar} />
      </div>

      {/* Profile Icon */}
      <div className="profile-icon">
        <ProfileIcon />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Routes> {/* Define the Routes here */}
          <Route path="/" element={<HomePage />} /> 
        </Routes>
      </div>

      {/* Search Bar Overlay (Conditionally Rendered) */}
    
    </div>
  );
};

export default Main;
