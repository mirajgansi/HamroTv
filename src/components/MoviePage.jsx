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
    <div className="movie-container">
      <h1>{movie.movie_name}</h1>
      <iframe
        width="800"
        height="450"
        src={`https://www.youtube.com/embed/${movie.youtube_link.split('v=')[1].split('&')[0]}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <p>{movie.movie_description}</p>
        <p>{movie.release_year}</p>
        <p>{movie.genre}</p>
        <p>{movie.director}</p>
        <p>{movie.rating}</p>
    </div>
  );
};

export default MoviePage;  // Make sure you're using the default export