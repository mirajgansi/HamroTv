import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faFilm, faTv, faBell } from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // Track the sidebar state

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded); // Toggle the expanded state of the sidebar
  };

  return (
    <div className={`sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
      <ul className="sidebar-menu">
        <li>
          <button className="sidebar-button" onClick={toggleSearchBar}>
            <FontAwesomeIcon icon={faSearch} className="icon" />
          </button>
        </li>
        <li>
          <Link to="/home-page">
            <button className="sidebar-button">
              <FontAwesomeIcon icon={faHome} className="icon" />
              <span className="hover-text">Home</span>
            </button>
          </Link>
        </li>
        <li>
          <button className="sidebar-button">
            <FontAwesomeIcon icon={faFilm} className="icon" />
            <span className="hover-text">Series</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button">
            <FontAwesomeIcon icon={faTv} className="icon" />
            <span className="hover-text">Movies</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button">
            <FontAwesomeIcon icon={faBell} className="icon" />
            <span className="hover-text">Notification</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
