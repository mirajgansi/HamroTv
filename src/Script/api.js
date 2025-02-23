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
  // Match your actual API endpoints
  if (token && !config.url.includes('/users/login') && !config.url.includes('/users/register')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch user data by username
export const getUserByEmail = async (email) => {
  return api.get(`/users/email/${encodeURIComponent(email)}`);
};

// Fetch movies (Example API call)
export const fetchMovies = (searchQuery) => {
  return api.get(`/movies/name/${searchQuery}`);
};


export const updateUser = async (email, updates) => {
  console.log("Updating user with email:", email);
  console.log("Payload:", updates);
  try {
    const response = await api.put(`/users/${encodeURIComponent(email)}/update`, updates);
    console.log("Response:", response.data);
    return response;
  } catch (error) {
    console.error("Update error:", error.response || error);
    throw error;
  }
};

export const updateProfilePicture = async (email, formData) => {
  console.log("Updating profile picture for email:", email);
  console.log("FormData prepared");
  try {
    const response = await api.put(`/users/${encodeURIComponent(email)}/update`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log("Response:", response.data);
    return response;
  } catch (error) {
    console.error("Profile upload error:", error.response || error);
    throw error;
  }
};

export default api;
