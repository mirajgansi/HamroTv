import React, { useState } from "react";

const ProfileIcon = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredMovies([]);
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  return (
    <div
      className="profile-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`profile-icon ${isHovered ? "visible" : ""}`}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button>&#128269;</button>
        </div>
        <img src="profile.jpg" alt="Profile" />
        <div className="details">
          <span>John Doe</span>
          <span>Email@example.com</span>
        </div>
      </div>

      {/* Display recommendations */}
      {filteredMovies.length > 0 && (
        <div className="recommendations">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="recommendation-item">
              {movie.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
