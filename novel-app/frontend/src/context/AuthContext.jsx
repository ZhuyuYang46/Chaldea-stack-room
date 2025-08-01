// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import { fetchProtected } from '../api/auth'

/**
 * AuthContext 用来在组件树中共享用户与鉴权状态
 */
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
  logout: () => {}
})

/**
 * AuthProvider 包裹在根组件外层，负责：
 * 1. 从 localStorage 读取 token 并验证
 * 2. 保存 user、loading 状态
 * 3. 提供 logout 方法
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // 有 token 时去后端验证并获取 user 信息
      fetchProtected()
        .then(res => {
          setUser(res.data.user)
        })
        .catch(err => {
          console.error('Protected API fetch failed:', err)
          localStorage.removeItem('token')
          setUser(null)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      // 无 token，直接标记加载完成
      setLoading(false)
    }
  }, [])

  /**
   * 登出：清除 token 并重置 user
   */
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
