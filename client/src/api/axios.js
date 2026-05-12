import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateAvatar: (data) => api.put('/user/avatar', data),
  updateStats: (data) => api.put('/user/stats', data),
};

// Leaderboard APIs
export const leaderboardAPI = {
  getLeaderboard: (page = 1) => api.get(`/leaderboard?page=${page}`),
  getUserRank: () => api.get('/leaderboard/rank'),
};

// Stats APIs
export const statsAPI = {
  getStats: () => api.get('/stats'),
  getCategorizedUsage: () => api.get('/stats/categorized'),
  recordActivity: (data) => api.post('/stats/record', data),
};

export const blockerAPI = {
  getSites: () => api.get('/blocker'),
  addSite: (data) => api.post('/blocker/add', data),
  updateSite: (data) => api.put('/blocker/update', data),
  removeSite: (id) => api.delete(`/blocker/${id}`),
};

export const socialAPI = {
  searchUsers: (query) => api.get(`/social/search?query=${query}`),
  getFriends: () => api.get('/social/friends'),
  getRequests: () => api.get('/social/requests'),
  sendRequest: (recipientId) => api.post('/social/request', { recipientId }),
  respondToRequest: (requestId, status) => api.post('/social/respond', { requestId, status }),
};

export default api;
