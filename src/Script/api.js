import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers (except for login/signup)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !config.url.includes('/loginUser') && !config.url.includes('/register')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch user data by username
export const getUserByName = async (username) => {
  return await axios.get(`http://localhost:5000/users/${username}`);
};

// Fetch movies (Example API call)
export const fetchMovies = (searchQuery) => {
  return api.get(`/movies/name/${searchQuery}`);
};

export default api;
