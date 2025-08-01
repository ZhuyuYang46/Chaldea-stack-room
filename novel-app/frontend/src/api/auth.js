// src/api/auth.js
import api from './index';

/**
 * 注册新用户
 * @param {{ username: string, email: string, password: string }} data
 */
export const register = data => api.post('/auth/register', data);

/**
 * 用户登录，返回 { token: string, user: {...} }
 * @param {{ email: string, password: string }} data
 */
export const login = data => api.post('/auth/login', data);

/**
 * 登出（可选接口）
 */
export const logout = () => api.post('/auth/logout');
export const fetchProtected = ()   => api.get('/protected')