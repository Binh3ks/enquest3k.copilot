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

// AUTH API Object (for changePassword etc.)
export const authAPI = {
  changePassword: async (currentPassword, newPassword) => {
    const response = await apiClient.put('/auth/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  }
};

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

// GLOBAL AVATARS
export const fetchGlobalAvatars = () =>
  apiClient.get('/admin/global-avatars');

export const addGlobalAvatarAPI = (url) =>
  apiClient.post('/admin/global-avatars', { url });

export const deleteGlobalAvatarAPI = (id) =>
  apiClient.delete(`/admin/global-avatars/${id}`);

// TEACHER-STUDENT SYSTEM
export const teacherAPI = {
  // Assignments (admin only)
  assignStudent: (teacherId, studentId, notes) =>
    apiClient.post('/teacher/assign', { teacherId, studentId, notes }),
  
  unassignStudent: (studentId) =>
    apiClient.delete(`/teacher/assign/${studentId}`),
  
  // Teacher views
  getMyStudents: () =>
    apiClient.get('/teacher/my-students'),
  
  getStudentDetail: (studentId) =>
    apiClient.get(`/teacher/student/${studentId}/detail`),
  
  // Messaging
  sendMessage: (toUserId, message, subject) =>
    apiClient.post('/teacher/message', { toUserId, message, subject }),
  
  getInbox: () =>
    apiClient.get('/teacher/messages/inbox'),
  
  markMessageRead: (messageId) =>
    apiClient.put(`/teacher/messages/${messageId}/read`),
  
  getUnreadCount: () =>
    apiClient.get('/teacher/messages/unread-count'),
  
  // Activity logging
  logActivity: (activityType, weekId, stationType, metadata) =>
    apiClient.post('/teacher/log-activity', { activityType, weekId, stationType, metadata })
};

export default apiClient;
