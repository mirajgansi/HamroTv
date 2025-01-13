// src/components/Sidebar.jsx
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faFilm, faTv, faBell } from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };


  return (
    <div className="sidebar">
    <ul className="sidebar-menu">
      <li>
        <button className="sidebar-button" onClick={toggleSearchBar}>
          <FontAwesomeIcon icon={faSearch} className="icon" />
        </button>
        {/* {isSearchBarVisible && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button>&#128269;</button>
          </div>
        )} */}
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
       {/* Search Bar
       {isSearchBarVisible && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button>&#128269;</button>
        </div>
      )} */}
    </div>
  );
};

export default Sidebar;
