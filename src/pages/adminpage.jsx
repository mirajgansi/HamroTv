import { useState, useEffect } from "react";
import api from "../Script/api"; // Ensure this is imported

export default function AdminPage() {
  const [movie, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    movie_name: "",
    movie_description: "",
    youtube_link: "",
    release_year: "",
    genre: "",
    director: "",
    rating: ""
  });

  // Fetch movie from backend
  useEffect(() => {
    api.get("movies/") 
          .then((res) => setMovies(res.data))
      .catch((err) => console.error("Error fetching movie:", err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  // Submit form to add a movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/movies/", newMovie); 
      console.log("Response:", response);
  
      if (response.status === 201) {  // ✅ Explicitly check for 201 Created
        const updatedMovie = response.data; // Axios handles JSON automatically
        setMovies([...movie, updatedMovie]); // Append new movie
        setNewMovie({
          movie_name: "",
          movie_description: "",
          youtube_link: "",
          release_year: "",
          genre: "",
          director: "",
          rating: ""
        });
        console.log("Movie added successfully!");
      } else {
        console.error("Failed to add movie:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding movie:", error.message);
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Panel - Add Movies</h1>
      <form className="grid gap-2" onSubmit={handleSubmit}>
        <input className="border p-2" type="text" name="movie_name" placeholder="Movie Name" value={newMovie.movie_name} onChange={handleChange} required />
        <textarea className="border p-2" name="movie_description" placeholder="Movie Description" value={newMovie.movie_description} onChange={handleChange} required />
        <input className="border p-2" type="text" name="youtube_link" placeholder="YouTube Link" value={newMovie.youtube_link} onChange={handleChange} required />
        <input className="border p-2" type="number" name="release_year" placeholder="Release Year" value={newMovie.release_year} onChange={handleChange} required />
        <input className="border p-2" type="text" name="genre" placeholder="Genre" value={newMovie.genre} onChange={handleChange} required />
        <input className="border p-2" type="text" name="director" placeholder="Director" value={newMovie.director} onChange={handleChange} required />
        <input className="border p-2" type="number" name="rating" placeholder="Rating" step="0.1" value={newMovie.rating} onChange={handleChange} required />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">Add Movie</button>
      </form>
      <h2 className="text-xl font-semibold mt-4">Movies List</h2>
      <ul>
        {movie.map((movie) => (
          <li key={movie.movie_id} className="p-2 border-b">
            {movie.movie_name} - {movie.genre} ({movie.release_year})
          </li>
        ))}
      </ul>
    </div>
  );
}
