import React, { useState } from "react";
import moviesData from "./moviesData"; // Import your movie data
import "./Movies.css"; // Add your styles

const Movies = () => {
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  // Function to handle thumbnail click
  const handleThumbnailClick = (trailer) => {
    setSelectedTrailer(trailer); // Set the selected trailer URL
  };

  // Function to close the trailer modal
  const closeTrailer = () => {
    setSelectedTrailer(null); // Reset the selected trailer
  };

  return (
    <div className="movies-container">
      <h1>Movie List</h1>
      <div className="movie-list">
        {moviesData.map((movie) => (
          <div
            key={movie.id}
            className="movie-thumbnail"
            onClick={() => handleThumbnailClick(movie.trailer)}
          >
            <img src={movie.thumbnail} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>

      {/* Trailer Modal */}
      {selectedTrailer && (
        <div className="trailer-modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeTrailer}>
              &times;
            </button>
            <iframe
              width="560"
              height="315"
              src={selectedTrailer}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;