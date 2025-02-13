import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', 
  headers: {
    'Content-Type': 'application/json' // Ensure proper content type
  }
});

// Add a request interceptor to include the token in headers (except for login/signup)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !config.url.includes('/loginUser') && !config.url.includes('/register')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const fetchMovies = (searchQuery) => {
  const url = `http://localhost:5000/movies/name/${searchQuery}`;
  console.log('Fetching movies from URL:', url);

  return axios.get(url);
};


export default api;