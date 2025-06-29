import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (formData) => api.put('/auth/profile', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// Transaction API functions
export const transactionAPI = {
  addTransaction: (transactionData) => api.post('/transactions', transactionData),
  getTransactions: (params) => api.get('/transactions', { params }),
  getTransactionStats: () => api.get('/transactions/stats'),
  updateTransaction: (id, transactionData) => api.put(`/transactions/${id}`, transactionData),
  deleteTransaction: (id) => api.delete(`/transactions/${id}`),
};

// Contact API functions
export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
};

// Notification API functions
export const notificationAPI = {
  getNotifications: () => api.get('/notifications'),
  markAllAsRead: () => api.post('/notifications/mark-all-read'),
};

// Export the api instance for other uses
export default api; 