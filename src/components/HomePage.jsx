import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/HomePage.css";
import api from "../Script/api";

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("/movies/");
        setMovies(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

const Carousel = ({ movies, title, handleThumbnailClick }) => (
  <div className="section">
    <h2>{title}</h2>
    <div className="carousel">
      {movies.map((movie) => (
        <div className="movie-card" key={movie.movie_id}>
          <img
            src={`http://localhost:5000/${movie.thumbnailupload}`} 
            alt={movie.movie_name}
            onClick={() => handleThumbnailClick(movie.youtube_link)}
            style={{ cursor: "pointer" }}
          />
          <p>{movie.movie_name}</p>
        </div>
      ))}
    </div>
  </div>
);
const getEmbedUrl = (url) => {
  if (url.includes('youtube.com')) {
    // Convert youtube.com/watch?v=VIDEO_ID to youtube.com/embed/VIDEO_ID
    const videoId = url.split('v=')[1].split('&')[0]; // Handles extra URL parameters
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('vimeo.com')) {
    // Handle Vimeo URLs similarly
    const videoId = url.split('vimeo.com/')[1];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url; // If it's not YouTube or Vimeo, return the original URL
};
const MainLayout = ({ children }) => {
  const { movies, loading, error } = useFetchMovies();
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const handleThumbnailClick = (youtube_link) => {
    if (youtube_link) {
      setSelectedTrailer(youtube_link);
    } else {
      console.warn("No trailer URL available");
    }
  };

  const closeTrailer = () => {
    setSelectedTrailer(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app-container">
      <div className="main-content">
        <h2 className="text-xl font-semibold mt-4">Movies List</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} className="p-2 border-b">
              <span>
                {movie.movie_name} - {movie.genre} ({movie.release_year})
              </span>
              {movie.youtube_link && (
                <button
                  onClick={() => handleThumbnailClick(movie.youtube_link)}
                  className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
                  aria-label={`Watch trailer for ${movie.movie_name}`}
                  tabIndex="0"
                >
                  Watch Trailer
                </button>
              )}
            </li>
          ))}
        </ul>
          
        <Carousel
          movies={movies}
          title="New This Week"
          handleThumbnailClick={handleThumbnailClick}
        />
        <Carousel
          movies={movies}
          title="Trending Now"
          handleThumbnailClick={handleThumbnailClick}
        />

        {children && <div className="extra-content">{children}</div>}
      </div>

      {selectedTrailer && (
        <div className="trailer-modal" onClick={closeTrailer}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeTrailer}>
              &times;
            </button>
            {selectedTrailer.includes("youtube.com") || selectedTrailer.includes("vimeo.com") ? (
              <iframe
              width="560"
              height="315"
              src={getEmbedUrl(selectedTrailer)} // pass selectedTrailer here
              title="Video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            ) : (
              <p>Invalid trailer URL</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;