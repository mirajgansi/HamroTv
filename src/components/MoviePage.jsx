import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../Script/api";
import "../styles/MoviePage.css";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading movie...</div>;
  if (error) return <div>Error loading movie</div>;

  return (
    <div className="movie-container-youtube">
      <iframe
        width="1100"
        height="600"
        src={`https://www.youtube.com/embed/${movie.youtube_link.split('v=')[1].split('&')[0]}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      >
      </iframe>
      <div className="Description">
       <h1>{movie.movie_name}</h1>
      <p>Description:{movie.movie_description}</p>
        <p>Release Year:{movie.release_year}</p>
        <p>Genre:{movie.genre}</p>
        <p>Directior:{movie.director}</p>
        <p>Rating: {movie.rating}</p>
        </div>
    </div>
  );
};

export default MoviePage;  // Make sure you're using the default export