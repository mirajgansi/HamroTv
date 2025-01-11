// src/components/Sidebar.jsx
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faFilm, faTv, faBell } from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";

const Sidebar = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false); // State to show/hide search bar

  // Function to toggle the visibility of the search bar
  const toggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev);
  };

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() !== "") {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(term.toLowerCase())
      );
      console.log("Filtered Movies:", filtered); // For testing
    }
  };


  return (
    <div className="sidebar">
    <ul className="sidebar-menu">
      <li>
        <button className="sidebar-button" onClick={toggleSearchBar}>
          <FontAwesomeIcon icon={faSearch} className="icon" />
        </button>
        {isSearchBarVisible && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button>&#128269;</button>
          </div>
        )}
        </li>
        <li>
          <button className="sidebar-button">
            <FontAwesomeIcon icon={faHome} className="icon" />
          </button>
        </li>
        <li>
          <button className="sidebar-button">
            <FontAwesomeIcon icon={faFilm} className="icon" />
          </button>
        </li>
        <li>
          <button className="sidebar-button">
            <FontAwesomeIcon icon={faTv} className="icon" />
          </button>
        </li>
        <li>
          <button className="sidebar-button">
            <FontAwesomeIcon icon={faBell} className="icon" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
