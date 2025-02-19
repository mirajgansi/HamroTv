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
  return api.get(`/users/email/${email}`);
};

// Fetch movies (Example API call)
export const fetchMovies = (searchQuery) => {
  return api.get(`/movies/name/${searchQuery}`);
};


// Update user profile picture
export const updateUserProfilePicture = async (email, formData) => {
  try {
    const response = await api.put(`/users/${email}/profilepicture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Make sure to send as form data
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile picture', error);
    throw error;
  }
};
export default api;
