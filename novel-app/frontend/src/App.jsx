// src/App.jsx
import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header       from './components/Header.jsx'
import Home         from './pages/Home.jsx'
import Login        from './pages/Login.jsx'
import Register     from './pages/Register.jsx'
import NovelList    from './pages/NovelList.jsx'
import NovelDetail  from './pages/NovelDetail.jsx'
import { AuthContext } from './context/AuthContext.jsx'

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    // 正在加载用户状态时，可以显示一个 Loading
    return <div className="p-6">Loading...</div>
  }

  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* 公开路由 */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 私有路由，需登录 */}
        <Route
          path="/novels"
          element={
            <PrivateRoute>
              <NovelList />
            </PrivateRoute>
          }
        />
        <Route
          path="/novels/:id"
          element={
            <PrivateRoute>
              <NovelDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
