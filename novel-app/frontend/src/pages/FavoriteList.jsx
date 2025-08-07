import React, { useEffect, useState } from 'react'
import { fetchFavorites, removeFavorite } from '../api/favorite'
import { Link } from 'react-router-dom'

export default function FavoriteList() {
  const [favorites, setFavorites] = useState([])
  const [error, setError] = useState('')

  const loadFavorites = async () => {
    try {
      const res = await fetchFavorites()
      setFavorites(res.data)
    } catch {
      setError('Failed to load favorites.')
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  const handleRemove = async (novelId) => {
    try {
      await removeFavorite(novelId)
      setFavorites(prev => prev.filter(n => n.id !== novelId))
    } catch {
      setError('Failed to remove favorite.')
    }
  }

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="h4 fw-bold mb-3">My Favorites</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {favorites.length === 0 ? (
          <p className="text-muted">No favorites yet.</p>
        ) : (
          <ul className="list-group">
            {favorites.map(novel => (
              <li
                key={novel.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <Link to={`/novels/${novel.id}`} className="text-decoration-none">
                  {novel.title} — {novel.author}
                </Link>
                <button
                  onClick={() => handleRemove(novel.id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
