// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      // 假设后端返回 { token: 'xxx', user: {...} }
      localStorage.setItem('token', data.token);
      // 登录成功后跳转到小说列表页
      nav('/novels');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">User login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          login
        </button>
      </form>
    </div>
  );
}
