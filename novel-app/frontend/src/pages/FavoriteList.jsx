// src/pages/FavoriteList.jsx
import React, { useEffect, useState } from 'react'
import { fetchFavorites, removeFavorite } from '../api/favorite'
import { Link } from 'react-router-dom'

export default function FavoriteList() {
  const [favorites, setFavorites] = useState([])
  const [error, setError]         = useState('')

  // 加载我的收藏
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

  // 取消收藏
  const handleRemove = async novelId => {
    try {
      await removeFavorite(novelId)
      setFavorites(prev => prev.filter(n => n.id !== novelId))
    } catch {
      setError('Failed to remove favorite.')
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map(novel => (
            <li key={novel.id} className="flex justify-between items-center">
              <Link
                to={`/novels/${novel.id}`}
                className="text-blue-600 hover:underline"
              >
                {novel.title} — {novel.author}
              </Link>
              <button
                onClick={() => handleRemove(novel.id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
