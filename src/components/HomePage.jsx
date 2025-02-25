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

const MovieBanner = ({ movie }) => {
  const navigate = useNavigate();

  const handleWatchClick = () => {
    navigate(`/movie/${movie.movie_id}`);
  };

  return (
    <div className="banner">
      <img src={`http://localhost:5000/${movie.thumbnailupload}`} alt={movie.movie_name} />
      <div className="banner-content">
        <h1>{movie.movie_name}</h1>
        <p className="rating">★ {movie.rating || "N/A"} HD {movie.year || "2024"}</p>
        <p className="description">
        {movie.movie_description || "No description available."}
        </p>
        <button className="watch-button" onClick={handleWatchClick}>
          Watch now
        </button>
      </div>
    </div>
  );
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

const Carousel = ({ movies, title }) => {
  return (
    <div className="carousel-container">
      {title && <h2 className="carousel-title">{title}</h2>}
      <div className="carousel">
        {movies.map((movie) => (
          <MovieCard key={movie.movie_id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

const MainLayout = ({ children }) => {
  const { movies, loading, error } = useFetchMovies();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [NewMovie, setNewMovies] = useState([]);
  const getRandomMovie = (movies) => {
    return movies[Math.floor(Math.random() * movies.length)];
  };

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
      setFeaturedMovie(getRandomMovie(movies));
      setTrendingMovies(getRandomMovies(movies, 6));
      setNewMovies(getRandomMovies(movies, 6));
      const interval = setInterval(() => {
        setFeaturedMovie(getRandomMovie(movies));
        setNewMovies(getRandomMovies(movies, 6));
        setTrendingMovies(getRandomMovies(movies, 6));
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [movies]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app-container">
      <div className="main-content">
        {featuredMovie && (
          <MovieBanner movie={featuredMovie} />
        )}
        <div className="sections">
          <div className="section">
            <Carousel movies={NewMovie} title="New This Week" />
            <Carousel movies={trendingMovies} title="Trending Now" />
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