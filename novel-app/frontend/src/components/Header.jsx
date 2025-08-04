// src/components/Header.jsx
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  const nav = useNavigate()

  const handleLogout = () => {
    logout()
    nav('/login')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white shadow">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Chaldea</Link>
        </h1>
          <div   className="flex items-center space-x-6">
         <Link to="/novels" className="hover:underline">Novels</Link>
         <Link to="/tags"    className="hover:underline">Tags</Link>
         <Link to="/favorites" className="hover:underline">Favorites</Link>
          
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="hover:underline" to="/login">Login</Link>
              <Link className="hover:underline" to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
