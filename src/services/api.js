import axios from 'axios';

// Lazy token getter — set by useUserStore after init to avoid circular import
let _getToken = null;
export function setTokenGetter(fn) { _getToken = fn; }

// Create an Axios instance with a base URL.
// In Vite, environment variables must be prefixed with VITE_ to be exposed to the client.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  timeout: 20000, // 20s — fail fast instead of hanging forever
  // NOTE: deliberately NO default Content-Type header.
  // - For JSON requests, axios V2 sets it automatically from the body.
  // - For FormData (multipart uploads), the BROWSER must generate
  //   `multipart/form-data; boundary=...` itself; setting application/json
  //   here would force that, breaking multer file parsing on the server.
});

// ─── Circuit Breaker for Offline / CORS-blocked Backend ───────────────
let backendOfflineUntil = 0;
const CIRCUIT_BREAKER_COOLDOWN_MS = 60_000; // 60 seconds

export function isBackendAvailable() {
  return Date.now() > backendOfflineUntil;
}

export function tripCircuitBreaker(reason) {
  if (isBackendAvailable()) {
    console.warn(`[API] Backend unreachable or CORS blocked (${reason}). Circuit breaker OPEN for 60s.`);
  }
  backendOfflineUntil = Date.now() + CIRCUIT_BREAKER_COOLDOWN_MS;
}

// Request Interceptor: check circuit breaker before attempting requests
apiClient.interceptors.request.use(
  (config) => {
    if (!isBackendAvailable() && !config.bypassCircuitBreaker) {
      return Promise.reject(new axios.Cancel('Circuit breaker OPEN: backend unreachable / CORS blocked'));
    }
    const token = _getToken?.();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: trip circuit breaker on Network Error or CORS failure
apiClient.interceptors.response.use(
  (response) => {
    backendOfflineUntil = 0;
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    const isNetworkError = error?.message === 'Network Error' || error?.code === 'ERR_NETWORK' || !error?.response;
    if (isNetworkError) {
      tripCircuitBreaker(error?.message || 'Network Error');
    }
    return Promise.reject(error);
  }
);


// --- API Service Functions ---

// AUTHENTICATION
export const login = async (username, password) => {
  try {
    return await apiClient.post('/auth/login', { username, password });
  } catch (error) {
    console.warn('[API] Backend auth service offline/unreachable. Serving local account:', username);
    return {
      data: {
        user: {
          id: 'user_owner',
          name: username || 'owner',
          username: username || 'owner',
          displayName: username || 'owner',
          role: 'student',
          avatarUrl: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Owner'
        },
        token: 'local_owner_token'
      }
    };
  }
};

// Supabase OAuth login — passes supabase_uid + token to Railway backend
export const loginWithSupabase = (supabaseUid, supabaseToken) =>
  apiClient.post('/auth/login', { supabase_uid: supabaseUid, supabase_token: supabaseToken });

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
    try {
      const response = await apiClient.get(`/progress/${weekId}`);
      return response.data || {};
    } catch (err) {
      console.warn(`[ProgressAPI] Remote fetch un-reachable for week ${weekId}, falling back to local progress:`, err.message);
      return {};
    }
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

// PROGRESS ADMIN — for retrieval / audit / recovery (added Jun 9, 2026)
export const dumpProgressAdmin = (params = {}) =>
  apiClient.get('/admin/progress/dump', { params });
export const progressStatsAdmin = () =>
  apiClient.get('/admin/progress/stats');

// TEACHER-STUDENT SYSTEM
export const teacherAPI = {
  // Assignments (admin only)
  assignStudent: (teacherId, studentId, notes) =>
    apiClient.post('/teacher/assign', { teacherId, studentId, notes }),
  
  unassignStudent: (studentId) =>
    apiClient.delete(`/teacher/assign/${studentId}`),

  getAllAssignments: () =>
    apiClient.get('/teacher/all-assignments'),
  
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
    apiClient.post('/teacher/log-activity', { activityType, weekId, stationType, metadata }),

  // ── Self-service student management ──
  getSeatInfo: () =>
    apiClient.get('/teacher/seat-info'),

  createStudent: (username, password) =>
    apiClient.post('/teacher/create-student', { username, password }),

  removeStudent: (studentId, deleteAccount = false) =>
    apiClient.delete(`/teacher/student/${studentId}?deleteAccount=${deleteAccount}`),

  resetStudentPassword: (studentId, newPassword) =>
    apiClient.put(`/teacher/student/${studentId}/reset-password`, { newPassword }),

  savePrivateNotes: (studentId, notes) =>
    apiClient.put(`/teacher/student/${studentId}/private-notes`, { notes }),

  // ── Task Assignments (T1-B) ──
  setTaskAssignment: (studentId, type, data = {}) =>
    apiClient.post('/teacher/task-assignments', { studentId, type, ...data }),

  getTaskAssignments: (studentId) =>
    apiClient.get(`/teacher/task-assignments/${studentId}`),

  deleteTaskAssignment: (assignmentId) =>
    apiClient.delete(`/teacher/task-assignments/${assignmentId}`),

  // ── Session Notes (T4-A) ──
  saveSessionNote: (studentId, weekNum, sessionNum, note) =>
    apiClient.post('/teacher/session-notes', { studentId, weekNum, sessionNum, note }),

  getSessionNotes: (studentId) =>
    apiClient.get(`/teacher/session-notes/${studentId}`),

  deleteSessionNote: (noteId) =>
    apiClient.delete(`/teacher/session-notes/${noteId}`),

  // ── Class Settings (T4-B) ──
  getClassSettings: () =>
    apiClient.get('/teacher/class-settings'),

  saveClassSettings: (classStartDate) =>
    apiClient.put('/teacher/class-settings', { class_start_date: classStartDate }),

  // ── Lesson file access (authenticated, week-window enforced) ──
  getLessonWeek: (weekNum) =>
    apiClient.get(`/teacher/lesson/${weekNum}`),

  getLessonsIndex: () =>
    apiClient.get('/teacher/lessons-index'),

  // ── Manager routes (team_leader / center_director) ──
  managerSeatInfo: () =>
    apiClient.get('/teacher/manager-seat-info'),

  myTeachers: () =>
    apiClient.get('/teacher/my-teachers'),

  createTeacher: (username, password, allocatedSeats) =>
    apiClient.post('/teacher/create-teacher', { username, password, allocated_seats: allocatedSeats }),

  removeTeacher: (teacherId, deleteAccount = false) =>
    apiClient.delete(`/teacher/teacher/${teacherId}?deleteAccount=${deleteAccount}`),

  resetTeacherPassword: (teacherId, newPassword) =>
    apiClient.put(`/teacher/teacher/${teacherId}/reset-password`, { newPassword }),
};

// ── Subscription & Plan API ──
export const subscriptionAPI = {
  getStatus: () => apiClient.get('/subscription/status'),
  getTeacherStudents: () => apiClient.get('/subscription/teacher-students'),
};

// ── Parent / Family Plan API ──
export const parentAPI = {
  getChildren: () => apiClient.get('/parent/children'),
  createChild: (username, password, display_name) =>
    apiClient.post('/parent/children', { username, password, display_name }),
  deleteChild: (childUsername) =>
    apiClient.delete(`/parent/children/${childUsername}`),
  resetChildPassword: (childUsername, password) =>
    apiClient.patch(`/parent/children/${childUsername}/password`, { password }),
  syncChildren: () => apiClient.post('/parent/sync-children'),
};

export const adminSubscriptionAPI = {
  activatePlan: (username, plan, months, seats_total) =>
    apiClient.post(`/admin/users/${username}/activate-plan`, { plan, months, seats_total }),
  setTrial: (username, days) =>
    apiClient.post(`/admin/users/${username}/set-trial`, { days }),
  setExpiry: (username, plan, days) =>
    apiClient.post(`/admin/users/${username}/set-expiry`, { plan, days }),
  resetPassword: (username, newPassword) =>
    apiClient.put(`/admin/users/${username}/reset-password`, { newPassword }),
  updateUser: (username, data) =>
    apiClient.put(`/admin/users/${username}`, data),
};

export const adminExtendTrial = (username) =>
  apiClient.post(`/admin/users/${username}/extend-trial`);

export const assessmentAPI = {
  getPending:          ()               => apiClient.get('/assessment/pending'),
  submit:              (data)           => apiClient.post('/assessment/submit', data),
  getHistory:          ()               => apiClient.get('/assessment/history'),
  getStudentHistory:   (studentId)      => apiClient.get(`/assessment/student/${studentId}`),
  getChildDashboard:   (childId)        => apiClient.get(`/assessment/child/${childId}`),
  // Major Checkpoints (W14/26/36/54)
  saveCheckpoint:      (data)           => apiClient.post('/assessment/checkpoint', data),
  getCheckpoints:      ()               => apiClient.get('/assessment/checkpoints'),
  getChildCheckpoints: (childId)        => apiClient.get(`/assessment/checkpoints/child/${childId}`),
  getStudentCheckpoints:(studentId)     => apiClient.get(`/assessment/checkpoints/student/${studentId}`),
};

export const adminHierarchy = () =>
  apiClient.get('/admin/hierarchy');

// ── Payment Request API (bank transfer flow → DB) ──
export const paymentAPI = {
  createRequest: (plan, amount, billing_months, extra_seats, notes) =>
    apiClient.post('/payment/request', { plan, amount, billing_months, extra_seats, notes }),
  getRequests: () => apiClient.get('/payment/requests'),
  approve: (id, months) => apiClient.post(`/payment/approve/${id}`, { months }),
  reject: (id) => apiClient.post(`/payment/reject/${id}`),
};

export const pushAPI = {
  getVapidKey: () => apiClient.get('/push/vapid-public-key'),
  subscribe: (subscription) => apiClient.post('/push/subscribe', { subscription }),
  unsubscribe: () => apiClient.delete('/push/unsubscribe'),
};

export default apiClient;
