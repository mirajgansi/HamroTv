import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHome, faTv } from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { fetchMovies } from '../Script/api';

const Sidebar = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const searchBarRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev);
    setSearchQuery("");
    setRecommendations([]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setIsLoading(true);
      fetchMovies(searchQuery)
        .then((res) => {
          const movies = Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];
          setRecommendations(movies);
        })
        .catch((err) => {
          console.error("Fetch error:", err.response || err);
          setRecommendations([]);
        })
        .finally(() => setIsLoading(false));
    } else {
      setRecommendations([]);
    }
  }, [searchQuery]);

  const handleMovieClick = (movie_id) => {
    navigate(`/movie/${movie_id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        !event.target.closest('.sidebar-button') &&
        isSearchBarVisible
      ) {
        setIsSearchBarVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchBarVisible]);

  // Get the top recommendation (first movie in the recommendations list)
  const topRecommendation = recommendations[0];

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
          <Link to="/moviesLayout">
            <button className="sidebar-button">
              <FontAwesomeIcon icon={faTv} className="icon" />
              <span className="hover-text">Movies</span>
            </button>
          </Link>
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
            ) : topRecommendation ? (
              <div className="recommendation-section">
                <h2 className="recommendation-title">Recommendation</h2>
                <div className="top-recommendation">
                  <h3>{topRecommendation.name}</h3>
                  <p>{topRecommendation.name}</p> {/* Repeat for emphasis like in the image */}
                  <div className="movie-grid">
                    {recommendations.map((movie) => (
                      <div
                        key={movie.movie_id}
                        className="movie-poster"
                        onClick={() => handleMovieClick(movie.movie_id)}
                        style={{ cursor: "pointer" }}
                      >
                        {movie.thumbnailupload ? (
                          <img
                            src={`http://localhost:5000/${movie.thumbnailupload}`}
                            alt={movie.name}
                            onError={(e) => (e.target.src = "/default-poster.jpg")}
                          />
                        ) : (
                          <div className="placeholder-poster">No image</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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