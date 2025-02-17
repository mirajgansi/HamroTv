import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers (except for login/signup)
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    const excludedEndpoints = ['/users/login', '/users/register'];
    
    if (token && !excludedEndpoints.some(endpoint => config.url.includes(endpoint))) {
      config.headers.Authorization = `Bearer ${token.replace('Bearer ', '')}`;
    }
    return config;
  } catch (error) {
    console.error('Interceptor error:', error);
    return config;
  }
});

// Fetch user data by username
export const getUserByName = async (username) => {
  return await axios.get(`http://localhost:5000/users/${username}`);
};

// Fetch movies (Example API call)
export const fetchMovies = (searchQuery) => {
  return api.get(`/movies/name/${searchQuery}`);
};


// Update user profile picture
export const updateUserProfilePicture = async (username, formData) => {
  try {
    const response = await api.put(`/users/${username}/profilepicture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Make sure to send it as form data
      },
    });
    return response.data;  // Return the updated user data
  } catch (error) {
    console.error('Error updating profile picture', error);
    throw error;
  }
};

export default api;
