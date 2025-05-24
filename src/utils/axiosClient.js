// src/axiosClient.js
import axios from 'axios';

// Buat instance Axios
const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8001/api',
});

// Tambah Authorization header otomatis jika ada token
axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Accept'] = 'application/json';
  return config;
});

// Tangani error 401
axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
