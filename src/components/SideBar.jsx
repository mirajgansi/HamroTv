import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faFilm, faTv, faBell } from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ toggleSearchBar }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {/* Search Icon */}
        <li>
          <button className="sidebar-button" onClick={toggleSearchBar}>
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <span className="hover-text">Search</span>
          </button>
        </li>

        {/* Other Menu Items */}
        <li>
          <Link to="/main">
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
          <button className="sidebar-button" onClick={toggleSearchBar} >
            <FontAwesomeIcon icon={faBell} className="icon" />
            <span className="hover-text">Notification</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;