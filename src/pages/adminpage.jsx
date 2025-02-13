import { useState, useEffect } from "react";
import api from "../Script/api"; // Ensure this is correctly imported
import "../styles/adminpage.css"; 

export default function AdminPage() {
  const [movie, setMovie] = useState([]);
  const [newMovie, setNewMovie] = useState({
    movie_name: "",
    movie_description: "",
    youtube_link: "",
    release_year: "",
    genre: "",
    director: "",
    rating: "",
    thumbnailupload: "", 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null); // State to track which movie is being edited

  // Fetch movies from the backend
  useEffect(() => {
    api.get("/movies")
      .then((res) => setMovie(res.data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setNewMovie({ ...newMovie, thumbnailupload: e.target.files[0] }); // Save file object
  };

  // Handle submit for adding or updating movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate release year and rating
    const currentYear = new Date().getFullYear();
    if (newMovie.release_year < 1900 || newMovie.release_year > currentYear) {
      alert("Please enter a valid release year.");
      setIsLoading(false);
      return;
    }
    if (newMovie.rating < 0 || newMovie.rating > 10) {
      alert("Rating must be between 0 and 10.");
      setIsLoading(false);
      return;
    }
    if (!newMovie.thumbnailupload) {
      alert("Please select a thumbnail image.");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("movie_name", newMovie.movie_name);
      formData.append("movie_description", newMovie.movie_description);
      formData.append("youtube_link", newMovie.youtube_link);
      formData.append("release_year", newMovie.release_year);
      formData.append("genre", newMovie.genre);
      formData.append("director", newMovie.director);
      formData.append("rating", newMovie.rating);
      formData.append("thumbnailUpload", newMovie.thumbnailupload); // Ensure this matches the server-side key

      if (editingMovie) {
        // Update existing movie
        const response = await api.put(`/movies/${editingMovie.movie_id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 200) {
          setMovie((prevMovies) =>
            prevMovies.map((movie) =>
              movie.movie_id === editingMovie.movie_id ? response.data : movie
            )
          );
          console.log("Movie updated successfully!");
        }
      } else {
        // Add new movie
        const response = await api.post("/movies", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 201) {
          setMovie((prevMovies) => [...prevMovies, response.data]);
          console.log("Movie added successfully!");
        }
      }

      // Reset form and state
      setNewMovie({
        movie_name: "",
        movie_description: "",
        youtube_link: "",
        release_year: "",
        genre: "",
        director: "",
        rating: "",
        thumbnailupload: null,
      });
      setEditingMovie(null); // Reset editing state
    } catch (error) {
      console.error("Error adding/updating movie:", error.message);
      alert("Error adding/updating movie. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (movieId) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) {
      return;
    }

    try {
      await api.delete(`/movies/${movieId}`);
      setMovie((prevMovies) => prevMovies.filter((movie) => movie.movie_id !== movieId));
      console.log("Movie deleted successfully!");
    } catch (error) {
      console.error("Error deleting movie:", error.message);
      alert("Failed to delete movie. Please try again.");
    }
  };

  // Handle editing a movie
  const handleEdit = (movieToEdit) => {
    setEditingMovie(movieToEdit);
    setNewMovie(movieToEdit); // Pre-fill the form with movie details
  };

  return (
    <div className="admin-container">
      <h1 className="admin-heading">Admin Panel - Add Movies</h1>
      <form className="movie-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          name="movie_name"
          placeholder="Movie Name"
          value={newMovie.movie_name}
          onChange={handleChange}
          required
        />
        <textarea
          className="form-input form-textarea"
          name="movie_description"
          placeholder="Movie Description"
          value={newMovie.movie_description}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="text"
          name="youtube_link"
          placeholder="YouTube Link"
          value={newMovie.youtube_link}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="number"
          name="release_year"
          placeholder="Release Year"
          value={newMovie.release_year}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="text"
          name="genre"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="text"
          name="director"
          placeholder="Director"
          value={newMovie.director}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="number"
          name="rating"
          placeholder="Rating"
          step="0.1"
          value={newMovie.rating}
          onChange={handleChange}
          required
        />
        <input
          className="form-input file-input"
          type="file"
          accept="image/*"
          name="thumbnailUpload"
          onChange={handleFileChange}
          required
        />
        <button
          className="submit-btn"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Movie"}
        </button>
      </form>

      <h2 className="admin-heading">Movies List</h2>
      <ul className="movies-list">
        {movie.map((movieItem) => (
          <li key={movieItem.movie_id} className="movie-item">
            <div>
              {movieItem.movie_name} - {movieItem.genre} ({movieItem.release_year})
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(movieItem.movie_id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}