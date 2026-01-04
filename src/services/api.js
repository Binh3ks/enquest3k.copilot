import axios from 'axios';

// Create an Axios instance with a base URL. 
// In Vite, environment variables must be prefixed with VITE_ to be exposed to the client.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * A function to set the Authorization header for all subsequent requests.
 * This should be called after login or when the app initializes with a token.
 * @param {string | null} token - The JWT token.
 */
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// --- API Service Functions ---

// AUTHENTICATION
export const login = (username, password) => 
  apiClient.post('/auth/login', { username, password });

export const getMe = () =>
  apiClient.get('/auth/me');

export const register = (userData) => 
  apiClient.post('/auth/register', userData);

export const updateProfile = (profileData) =>
  apiClient.put('/auth/profile', profileData);

// PROGRESS
export const getProgress = (weekId) => 
  apiClient.get(`/progress/${weekId}`);

export const updateProgress = (progressData) => 
  apiClient.post('/progress', progressData);

// AI TUTOR
export const getAiTutorResponse = (chatData) => 
  apiClient.post('/ai/chat', chatData);

// ADMIN
export const getAllUsers = () => 
  apiClient.get('/admin/users');

export const getAdminStudents = () =>
  apiClient.get('/admin/students');

export const adminCreateUser = (userData) => 
  apiClient.post('/admin/users', userData);

export const adminDeleteUser = (username) => 
  apiClient.delete(`/admin/users/${username}`);

export default apiClient;
