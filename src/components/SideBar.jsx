import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faFilm, faTv, faBell } from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { fetchMovies } from '../Script/api'; // Adjust path if necessary

const Sidebar = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [recommendations, setRecommendations] = useState([]); 
  const searchBarRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  // Add navigate hook here
  
  // Toggle search bar visibility
  const toggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev);
    setSearchQuery("");
    setRecommendations([]);
  };

  // Handle input change for search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Fetch movie recommendations when search query changes
  useEffect(() => {
    if (searchQuery.length >= 3) {
      setIsLoading(true);
      console.log(`Searching for movie: ${searchQuery}`);
      fetchMovies(searchQuery)
        .then((res) => {
          console.log('Fetched movies:', res.data);  // Check the response data
          setRecommendations(res.data ? [res.data] : []);  // Wrap it in an array if it's an object
        })
        .catch((err) => {
          console.error("Error fetching movies:", err);
        })
        .finally(() => setIsLoading(false));
    } else {
      setRecommendations([]);
    }
  }, [searchQuery]);

  // Handle movie click to navigate to details page
  
  const handleMovieClick = (movie_id) => {
    navigate(`/movie/${movie_id}`); 
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <button className="sidebar-button" onClick={toggleSearchBar}>
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <span className="hover-text">Search</span>
          </button>
        </li>
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
          <Link to="/moviesLayout">
            <button className="sidebar-button">
              <FontAwesomeIcon icon={faTv} className="icon" />
              <span className="hover-text">Movies</span>
            </button>
          </Link>
        </li>
        <li>
          <button className="sidebar-button">
            <FontAwesomeIcon icon={faBell} className="icon" />
            <span className="hover-text">Notification</span>
          </button>
        </li>
      </ul>

      {isSearchBarVisible && (
        <div className="search-overlay">
          <div className="search-container" ref={searchBarRef}>
            <input
              type="text"
              placeholder="Search movies..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {isLoading ? (
              <div className="search-loading">Searching...</div>
            ) : recommendations.length > 0 ? (
              <ul className="search-results">
              {recommendations.map((movie) => (
                <li key={movie.id} className="search-item">
                  {movie.thumbnailupload ? (
                    <img 
                      src={`http://localhost:5000/${movie.thumbnailupload}`} 
                      alt={movie.name}
                      className="movie-poster"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleMovieClick(movie.id)}  // Pass the movie's id correctly
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="placeholder-poster">No image</div>
                  )}
                  <div className="movie-details">
                    <p className="movie-title">{movie.name}</p>
                    {movie.year && <p className="movie-year">{movie.year}</p>}
                  </div>
                </li>
              ))}
            </ul>
            
            ) : searchQuery.length > 2 ? (
              <div className="search-no-results">No results found for "{searchQuery}"</div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
