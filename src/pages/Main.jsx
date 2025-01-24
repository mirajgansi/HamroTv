import React, { useState, useRef, useEffect } from "react";
import HomePage from "../components/HomePage.jsx";
import Sidebar from "../components/SideBar.jsx";
import ProfileIcon from "../components/ProfileIcon.jsx";
import "../styles/Main.css";

const Main = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // State for closing animation
  const searchBarRef = useRef(null); // Ref for the search bar
  

  const toggleSearchBar = () => {
    if (isSearchBarVisible) {
      // Start closing animation
      setIsClosing(true);
      setTimeout(() => {
        setIsSearchBarVisible(false);
        setIsClosing(false);
      }, 300); // Match the duration of the closing animation
    } else {
      setIsSearchBarVisible(true);
    }
  };

  // Close the search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        toggleSearchBar(); // Trigger closing animation
      }
    };

    // Add event listener when the search bar is visible
    if (isSearchBarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchBarVisible]);

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

      {/* Main Content (HomePage) */}
      <div className="main-content">
        <HomePage />
      </div>

      {/* Search Bar Overlay (Conditionally Rendered) */}
      {isSearchBarVisible && (
        <div className={`search-bar-overlay ${isClosing ? "closing" : ""}`}>
          <div className="search-bar-center" ref={searchBarRef}>
            <input
              type="text"
              placeholder="Search..."
              className="search-bar-input"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;