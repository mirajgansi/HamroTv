import { useState, useEffect } from "react";
import api from "../Script/api"; // Ensure this is correctly imported

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

  // Submit form with image upload
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

      const response = await api.post("/movies", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // ✅ Important for file uploads
      });

      console.log("Response:", response);

      if (response.status === 201) {
        setMovie((prevMovies) => [...prevMovies, response.data]); // Append new movie to state
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
        console.log("Movie added successfully!");
      } else {
        console.error("Failed to add movie:", response.statusText);
        alert("Failed to add movie. Please try again.");
      }
    } catch (error) {
      console.error("Error adding movie:", error.message);
      alert("Error adding movie. Please check the console for details.");
    } finally {
      setIsLoading(false);
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

        {/* ✅ File Input for Thumbnail */}
        <input className="border p-2" type="file" accept="image/*" name="thumbnailUpload" onChange={handleFileChange} required />

        <button className="bg-blue-500 text-white p-2 rounded" type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Movie"}
        </button>
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