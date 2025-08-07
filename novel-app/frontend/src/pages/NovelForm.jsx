import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createNovel,
  fetchNovelDetail,
  updateNovel,
  setNovelTags
} from '../api/novel'
import { fetchTags } from '../api/tag'

export default function NovelForm() {
  const { id } = useParams()
  const nav = useNavigate()

  const [form, setForm] = useState({
    title: '',
    author: '',
    summary: '',
    coverImageUrl: ''
  })
  const [error, setError] = useState('')
  const [allTags, setAllTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    fetchTags()
      .then(res => setAllTags(res.data))
      .catch(() => { })

    if (id) {
      fetchNovelDetail(id)
        .then(res => {
          const v = res.data
          setForm({
            title: v.title,
            author: v.author,
            summary: v.summary,
            coverImageUrl: v.coverImageUrl || ''
          })
          const tagIds = (v.Tags || []).map(tag => tag.id)
          setSelectedTags(tagIds)
        })
        .catch(() => setError('Failed to load novel data.'))
    }
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      let novelId = id
      if (id) {
        await updateNovel(id, form)
      } else {
        const res = await createNovel(form)
        novelId = res.data.id
      }
      await setNovelTags(novelId, selectedTags)
      nav('/novels')
    } catch {
      setError(id ? 'Update failed.' : 'Create failed.')
    }
  }

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="h4 fw-bold mb-3 text-center">
          {id ? 'Edit Novel' : 'Create Novel'}
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cover Image URL</label>
            <input
              name="coverImageUrl"
              value={form.coverImageUrl}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Summary</label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              rows="4"
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Tags</label>
            <div className="row">
              {allTags.map(tag => (
                <div className="col-6 mb-2" key={tag.id}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`tag-${tag.id}`}
                      value={tag.id}
                      checked={selectedTags.includes(tag.id)}
                      onChange={(e) => {
                        const tid = Number(e.target.value)
                        setSelectedTags(prev =>
                          prev.includes(tid)
                            ? prev.filter(x => x !== tid)
                            : [...prev, tid]
                        )
                      }}
                    />
                    <label htmlFor={`tag-${tag.id}`} className="form-check-label">
                      {tag.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {id ? 'Save Changes' : 'Create Novel'}
          </button>
        </form>
      </div>
    </div>
  )
}
