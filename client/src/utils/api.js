import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.get('/auth/logout'),
  verifyRegistrationOtp: (data) => api.post('/auth/verify-registration-otp', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  verifyPasswordResetOtp: (data) => api.post('/auth/verify-password-reset-otp', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  refreshToken: () => api.get('/auth/refresh'),
};

export default api;