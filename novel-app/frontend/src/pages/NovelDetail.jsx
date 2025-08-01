// src/pages/NovelDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchNovelDetail, deleteNovel } from '../api/novel'
import {
  fetchFavorites,
  addFavorite,
  removeFavorite
} from '../api/favorite'

export default function NovelDetail() {
  const { id } = useParams()
  const nav     = useNavigate()
  const [novel, setNovel]     = useState(null)
  const [error, setError]     = useState('')
  const [isFav, setIsFav]     = useState(false)
  const [loadingFav, setLoadingFav] = useState(false)

  useEffect(() => {
    fetchNovelDetail(id)
      .then(res => setNovel(res.data))
      .catch(() => setError('Failed to load novel.'))

    fetchFavorites()
      .then(res => {
        setIsFav(res.data.some(n => n.id === Number(id)))
      })
      .catch(() => {})
  }, [id])

  const toggleFavorite = async () => {
    setLoadingFav(true)
    try {
      if (isFav) {
        await removeFavorite(id)
        setIsFav(false)
      } else {
        await addFavorite(id)
        setIsFav(true)
      }
    } catch {
      setError('Failed to update favorite.')
    } finally {
      setLoadingFav(false)
    }
  }

  if (!novel) return <p className="p-6">{error || 'Loading...'}</p>

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-2">{novel.title}</h2>
      <p className="text-gray-600 mb-4">Author: {novel.author}</p>

      {/* 收藏按钮 */}
      <button
        onClick={toggleFavorite}
        disabled={loadingFav}
        className={
          'mb-4 px-4 py-2 border rounded ' +
          (isFav ? 'bg-red-500 text-white' : 'bg-green-500 text-white')
        }
      >
        {isFav ? 'Unfavorite' : 'Favorite'}
      </button>

      <img
        src={novel.coverImageUrl}
        alt={novel.title}
        className="w-48 mb-4"
      />

      {/* 简介 */}
      <div className="prose mb-4">
        <p>{novel.summary}</p>
      </div>

      {/* —— 新增：标签展示 —— */}
      {novel.Tags && novel.Tags.length > 0 && (
        <div className="mb-6">
          <p className="font-semibold mb-2">Tags:</p>
          <div className="flex flex-wrap gap-2">
            {novel.Tags.map(tag => (
              <span
                key={tag.id}
                className="px-2 py-1 bg-gray-200 rounded-full text-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 编辑 & 删除 */}
      <div className="flex space-x-2">
        <Link
          to={`/novels/${id}/edit`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this novel?')) {
              deleteNovel(id)
                .then(() => nav('/novels'))
                .catch(() => setError('Failed to delete novel.'))
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}
