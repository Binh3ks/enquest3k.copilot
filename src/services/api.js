import axios from 'axios';
import { useUserStore } from '../stores/useUserStore';

// Create an Axios instance with a base URL. 
// In Vite, environment variables must be prefixed with VITE_ to be exposed to the client.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use an interceptor to dynamically set the Authorization header for every request.
// This is the single source of truth for auth tokens.
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from the Zustand store on each request
    const token = useUserStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


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

// PROGRESS (Legacy)
export const getProgress = (weekId) => 
  apiClient.get(`/progress/${weekId}`);

export const updateProgress = (progressData) => 
  apiClient.post('/progress', progressData);

// PROGRESS (Universal System with JSONB)
export const progressAPI = {
  /**
   * Fetch all progress for a specific week
   * @param {number} weekId - The week ID
   * @returns {Promise} Response with progress map: { stationId: { data, isCompleted, score } }
   */
  fetchWeekProgress: async (weekId) => {
    const response = await apiClient.get(`/progress/${weekId}`);
    return response.data;
  },

  /**
   * Save progress with JSONB state support
   * @param {Object} params - Progress parameters
   * @param {number} params.weekId - The week ID
   * @param {string} params.stationId - The station identifier (e.g., 'daily_watch', 'ai_story')
   * @param {Object} params.data - JSONB data object with module-specific state
   * @param {boolean} params.isCompleted - Completion flag
   * @param {number} params.score - Score (0-100)
   * @returns {Promise} Response with saved progress
   */
  saveProgress: async ({ weekId, stationId, data, isCompleted, score }) => {
    const response = await apiClient.post('/progress/save', {
      weekId,
      stationId,
      data,
      isCompleted,
      score
    });
    return response.data;
  }
};

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

export const adminUpdateUser = (username, data) =>
  apiClient.put(`/admin/users/${username}`, data);

export default apiClient;
