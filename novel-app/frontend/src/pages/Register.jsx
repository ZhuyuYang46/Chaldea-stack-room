// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register({ username, email, password });
      alert('Registration successful. Please log in using your email and password.');
      nav('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed. Please try again. ');
    }
  };

  return (
      // <div className="container mx-auto p-6 max-w-md">
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">User registration </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full border p-2 rounded-[6px]"
            />
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full border p-2 rounded-[6px]"
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full border p-2 rounded-[6px]"
            />
            <button
                type="submit"
                className="w-full rounded-[6px] bg-green-600 text-white p-2 hover:bg-green-700"
            >
              Register
            </button>
          </form>
        </div>
      </div>
        );
        }
