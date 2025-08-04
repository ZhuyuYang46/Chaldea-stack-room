
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {errorMsg && <p className="text-red-500 mb-4 text-center">{errorMsg}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 p-3 rounded-[6px] text-black placeholder-gray-400"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 p-3 rounded-[6px] bg-white placeholder-gray-400"
            />
            <button
                type="submit"
                className="w-full py-2 rounded-[6px] text-sm hover:bg-gray-800 transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
  )
}
