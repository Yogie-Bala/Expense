import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // ✅ Fixed here
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
