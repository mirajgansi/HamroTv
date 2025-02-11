import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
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
  const navigate = useNavigate(); // ✅ Use navigate for routing

  const handleMovieClick = (movie_id) => {
    navigate(`/movie/${movie_id}`); // ✅ Redirect to movie details page
  };

  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="carousel">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.movie_id} onClick={() => handleMovieClick(movie.movie_id)}>
            <img
              src={`http://localhost:5000/${movie.thumbnailupload}`} 
              alt={movie.movie_name}
              style={{ cursor: "pointer" }}
            />
            <p>{movie.movie_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const getRandomMovies = (movies, count) => {
  if (movies.length <= count) return movies;
  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const MainLayout = ({ children }) => {
  const { movies, loading, error } = useFetchMovies();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const topRecommendations = getRandomMovies(movies, 6);

  return (
    <div className="app-container">
      <div className="main-content">
        {/* ✅ Clicking on a movie now redirects to the details page */}
        {topRecommendations.length > 0 && <Carousel movies={topRecommendations} title="Top Recommendations" />}
        <Carousel movies={movies} title="New This Week" />
        <Carousel movies={movies} title="Trending Now" />
        {children && <div className="extra-content">{children}</div>}
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
