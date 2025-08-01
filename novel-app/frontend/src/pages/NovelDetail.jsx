// src/pages/NovelDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchNovelDetail } from '../api/novel'
import {
  fetchFavorites,
  addFavorite,
  removeFavorite
} from '../api/favorite'

export default function NovelDetail() {
  const { id } = useParams()
  const [novel, setNovel] = useState(null)
  const [error, setError] = useState('')
  const [isFav, setIsFav] = useState(false)
  const [loadingFav, setLoadingFav] = useState(false)

  useEffect(() => {
    // 拉小说详情
    fetchNovelDetail(id)
      .then(res => setNovel(res.data))
      .catch(() => setError('Failed to load novel.'))

    // 检查是否已收藏
    fetchFavorites()
      .then(res => {
        setIsFav(res.data.some(n => n.id === Number(id)))
      })
      .catch(() => {
        /* 忽略错误 */
      })
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
      <div className="prose">
        <p>{novel.summary}</p>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}
