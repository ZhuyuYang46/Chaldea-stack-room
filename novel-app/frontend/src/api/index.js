// src/api/index.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 在每次请求头中自动附带 token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    // 后端可能要求 Bearer 前缀
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
