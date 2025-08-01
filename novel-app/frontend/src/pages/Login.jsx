// src/pages/Login.jsx
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, fetchProtected } from '../api/auth'
import { AuthContext } from '../context/AuthContext.jsx'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const nav = useNavigate()

  // 从上下文拿到 setUser 来写入当前用户
  const { setUser } = useContext(AuthContext)

  const handleSubmit = async e => {
    e.preventDefault()
    setErrorMsg('')   // 清掉之前的错误
    try {
      // 1. 登录，拿到 token
      const { data: loginRes } = await login({ email, password })
      localStorage.setItem('token', loginRes.token)

      // 2. 再去拿用户信息
      const { data: protectedRes } = await fetchProtected()
      setUser(protectedRes.user)

      // 3. 跳转到小说列表
      nav('/novels')
    } catch (err) {
      console.error(err)
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.'
      setErrorMsg(msg)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">User Login</h2>

      {/* 显示错误消息 */}
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}
