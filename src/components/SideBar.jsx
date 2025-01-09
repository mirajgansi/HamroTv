// src/components/Sidebar.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faFilm,
  faTv,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
      <li>
          <button className="sidebar-button">
            <FontAwesomeIcon icon={faSearch} className="icon" />
           
          </button>
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
