import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, fetchProtected } from '../api/auth'
import { AuthContext } from '../context/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const nav = useNavigate()
  const { setUser } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    try {
      const { data: loginRes } = await login({ email, password })
      localStorage.setItem('token', loginRes.token)

      const { data: protectedRes } = await fetchProtected()
      setUser(protectedRes.user)

      nav('/novels')
    } catch (err) {
      console.error(err)
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.'
      setErrorMsg(msg)
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>
      </div>
    </div>
  )
}
