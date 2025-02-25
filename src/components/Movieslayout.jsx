import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/MoviesLayout.css"; // Update the import path if needed
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

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movie/${movie.movie_id}`);
  };

  return (
    
    <div className="movie-card" onClick={handleMovieClick}>
    
      <img src={`http://localhost:5000/${movie.thumbnailupload}`} alt={movie.movie_name} />
      <div className="movie-info">
        <h3>{movie.movie_name}</h3>
        <p className="rating">★ {movie.rating || "N/A"} HD {movie.year || "2024"}</p>
        <button className="watch-button">Watch now</button>
      </div>
    </div>
  );
};

const MoviesLayout = ({ children }) => {
  const { movies, loading, error } = useFetchMovies();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.movie_id} movie={movie} />
          ))}
        </div>
        {children && <div className="extra-content">{children}</div>}
      </div>
    </div>
  );
};

MoviesLayout.propTypes = {
  children: PropTypes.node,
};

export default MoviesLayout;