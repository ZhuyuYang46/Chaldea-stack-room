// src/pages/NovelForm.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams }   from 'react-router-dom'
import { createNovel, fetchNovelDetail, updateNovel } from '../api/novel'

export default function NovelForm() {
  const { id } = useParams()        // 如果有 id 就是编辑，否则是新增
  const nav = useNavigate()
  const [form, setForm] = useState({
    title: '',
    author: '',
    summary: '',
    coverImageUrl: ''
  })
  const [error, setError] = useState('')

  // 编辑模式：加载已有数据
  useEffect(() => {
    if (id) {
      fetchNovelDetail(id)
        .then(res => setForm({
          title: res.data.title,
          author: res.data.author,
          summary: res.data.summary,
          coverImageUrl: res.data.coverImageUrl
        }))
        .catch(() => setError('Failed to load novel data.'))
    }
  }, [id])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      if (id) {
        await updateNovel(id, form)
      } else {
        await createNovel(form)
      }
      nav('/novels')
    } catch {
      setError(id ? 'Update failed.' : 'Create failed.')
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">
        {id ? 'Edit Novel' : 'Create Novel'}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="coverImageUrl"
          value={form.coverImageUrl}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="Summary"
          rows="4"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {id ? 'Save Changes' : 'Create Novel'}
        </button>
      </form>
    </div>
  )
}
