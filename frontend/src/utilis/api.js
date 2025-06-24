// utils/api.js or utils/axiosInstance.js
import axios from 'axios';

const API = axios.create({
<<<<<<< HEAD
  baseURL: REACT_APP_BACKEND_URL, // Use env variable in production
=======
  baseURL: 'https://expensebackend-t8h5.onrender.com', // Use env variable in production
>>>>>>> 86a4a57e5441e0d4cc5a64253b780b45380aef1c
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
