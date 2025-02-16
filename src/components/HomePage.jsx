import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
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

const Carousel = ({ movies, title }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movie_id) => {
    navigate(`/movie/${movie_id}`);
  };

  return (
    <div className="carousel-container">
      {title && <h2 className="carousel-title">{title}</h2>}
      <div className="carousel">
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.movie_id}
            onClick={() => handleMovieClick(movie.movie_id)}
          >
            <img
              src={`http://localhost:5000/${movie.thumbnailupload}`}
              alt={movie.movie_name}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const MainLayout = ({ children }) => {
  const { movies, loading, error } = useFetchMovies();
  const [topRecommendations, setTopRecommendations] = useState([]);

  const getRandomMovies = (movies, count) => {
    if (movies.length <= count) return [...movies];
    const shuffled = [...movies];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (movies.length > 0) {
      setTopRecommendations(getRandomMovies(movies, 6));
      const interval = setInterval(() => {
        setTopRecommendations(getRandomMovies(movies, 6));
      }, 30000); // Corrected interval to 30 seconds

      return () => clearInterval(interval);
    }
  }, [movies]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="banner-main">
          {topRecommendations.length > 0 && (
            <Carousel movies={topRecommendations} />
          )}
        </div>
        <div className="new">
          <div className="section">
            <Carousel movies={movies} title="New This Week" />
          </div>
          <div className="section">
            <Carousel movies={movies} title="Trending Now" />
          </div>
          {children && <div className="extra-content">{children}</div>}
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;