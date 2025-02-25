import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../Script/api";
import "../styles/MoviePage.css"; // Ensure this CSS file matches the styling

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
  if (error) return <div>Error loading movie: {error.message}</div>;

  // Ensure movie data exists before rendering
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="movie-container">
      <div className="video-embed">
        <iframe
          width="1100"
          height="600"
          src={`https://www.youtube.com/embed/${movie.youtube_link.split('v=')[1].split('&')[0]}`}
          title={`${movie.movie_name} Trailer`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      <div className="description">
  <div className="details">
    <h1>{movie.movie_name}</h1>
    <p>Description: {movie.movie_description}</p>
    <p>Release Year: {movie.release_year}</p>
    <p>Genre: {movie.genre}</p>
    <p>Director: {movie.director}</p>
    <p>Rating: {movie.rating}</p>
  </div>
  <img src={`http://localhost:5000/${movie.thumbnailupload}`} alt={`${movie.movie_name} Poster`} />
</div>
    </div>
  );
};

export default MoviePage;