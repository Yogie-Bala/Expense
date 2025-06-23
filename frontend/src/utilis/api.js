// utils/api.js or utils/axiosInstance.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // Use env variable in production
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token to all requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Adjust key if different
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
