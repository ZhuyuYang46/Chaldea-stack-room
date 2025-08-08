import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchNovelDetail, deleteNovel } from '../api/novel'
import { fetchFavorites, addFavorite, removeFavorite } from '../api/favorite'
import axios from 'axios'

export default function NovelDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const [novel, setNovel] = useState(null)
  const [error, setError] = useState('')
  const [isFav, setIsFav] = useState(false)
  const [loadingFav, setLoadingFav] = useState(false)
  const [chapters, setChapters] = useState([])
  // 新增章节表单状态
  const [showAdd, setShowAdd] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  useEffect(() => {
    fetchNovelDetail(id)
      .then(res => setNovel(res.data))
      .catch(() => setError('Failed to load novel.'))

    fetchFavorites()
      .then(res => {
        setIsFav(res.data.some(n => n.id === Number(id)))
      })
      .catch(() => {})

    axios.get(`/api/novels/${id}/chapters`)
      .then(res => setChapters(res.data))
      .catch(() => setError('Failed to load chapters.'))
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

  const addChapter = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      setError('Title and content cannot be empty.')
      return
    }

    axios.post(`/api/novels/${id}/chapters`, {
      title: newTitle,
      content: newContent
    }).then(res => {
      setChapters(prev => [...prev, res.data])
      setShowAdd(false)
      setNewTitle('')
      setNewContent('')
      setError('') // 清除错误信息
    }).catch(err => {
      const errorMessage = err.response?.data?.message || 'Failed to add chapter.'
      setError(errorMessage)
    })
  }

  if (!novel) {
    return (
      <div className="container py-5 text-center">
        <p>{error || 'Loading...'}</p>
      </div>
    )
  }

  const hasImage = !!novel.coverImageUrl

  return (
    <div className="container pt-3 pb-5">
      <div
        className={`card shadow-sm mx-auto p-4 ${hasImage ? '' : 'text-center'}`}
        style={{ maxWidth: hasImage ? '1500px' : '800px' }}
      >
        <div className={hasImage ? 'row g-4' : ''}>
          {/* 封面圖片區塊 */}
          {hasImage && (
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <div
                className="w-100"
                style={{
                  aspectRatio: '2 / 3',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <img
                  src={novel.coverImageUrl}
                  alt={novel.title}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          )}

          {/* 右側 or 全部文字內容 */}
          <div className={hasImage ? 'col-md-8' : ''}>
            <h2 className="h4 fw-bold mb-2">Title: {novel.title}</h2>
            <h5 className="mb-3 text-muted">Author: {novel.author}</h5>

            <button
              onClick={toggleFavorite}
              disabled={loadingFav}
              className={`btn mb-3 ${isFav ? 'btn-danger' : 'btn-success'}`}
            >
              {isFav ? 'Unfavorite' : 'Favorite'}
            </button>

            <p className="mb-4">{novel.summary}</p>

            {novel.Tags?.length > 0 && (
              <div className="mb-4">
                <p className="fw-semibold mb-2">Tags:</p>
                {novel.Tags.map(tag => (
                  <span key={tag.id} className="badge bg-secondary me-1 mb-1">{tag.name}</span>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-between mt-auto">
              <Link to={`/novels/${id}/edit`} className="btn btn-warning">Edit</Link>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this novel?')) {
                    deleteNovel(id)
                      .then(() => nav('/novels'))
                      .catch(() => setError('Failed to delete novel.'))
                  }
                }}
              >
                Delete
              </button>
            </div>

            {error && <p className="text-danger mt-3">{error}</p>}
          </div>
        </div>

        {/* 章節列表 */}
        <div className="mt-4">
          <h3 className="h5 fw-bold">Chapters</h3>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="btn btn-primary mb-3"
          >
            {showAdd ? 'Cancel' : 'Add Chapter'}
          </button>
          {showAdd && (
            <div className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Chapter Title"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
              <textarea
                className="form-control mb-2"
                placeholder="Chapter Content"
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                rows="3"
              />
              <button
                onClick={addChapter}
                className="btn btn-success"
              >
                Submit
              </button>
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
          )}
          <ul className="list-unstyled">
            {Array.isArray(chapters) && chapters.map(chapter => (
              <li key={chapter.id} className="mb-2 d-flex align-items-center gap-2">
                <Link
                  to={`/novels/${id}/chapter/${chapter.id}`}
                  className="btn btn-outline-primary flex-grow-1 text-start"
                >
                  {chapter.title}
                </Link>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
