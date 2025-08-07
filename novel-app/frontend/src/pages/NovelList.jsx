import { useEffect, useState } from 'react'
import { fetchNovels } from '../api/novel'
import { fetchTags } from '../api/tag'
import { Link } from 'react-router-dom'

export default function NovelList() {
  const [novels, setNovels] = useState([])
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    fetchTags()
      .then(res => setTags(res.data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    const params = selectedTags.length
      ? { tags: selectedTags.join(',') }
      : {}
    fetchNovels(params)
      .then(res => setNovels(res.data))
      .catch(console.error)
  }, [selectedTags])

  const toggleTag = (tagName) => {
    setSelectedTags(prev =>
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    )
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Novel List</h2>
        <Link to="/novels/new" className="btn btn-primary" style={{ width: 'auto' }}>
          + New Novel
        </Link>
      </div>

      {/* Tag Filter */}
      <div className="mb-4">
        {tags.map(tag => (
          <button
            key={tag.id}
            onClick={() => toggleTag(tag.name)}
            className={`btn btn-sm me-2 mb-2 ${selectedTags.includes(tag.name)
                ? 'btn-primary'
                : 'btn-outline-secondary'
              }`}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {/* Novel List */}
      {novels.length === 0 ? (
        <p className="text-muted">No novels found.</p>
      ) : (
        <ul className="list-group">
          {novels.map(n => (
            <li key={n.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <Link to={`/novels/${n.id}`} className="fw-medium text-decoration-none">
                  {n.title}
                </Link>
                <span className="text-muted ms-2">by {n.author}</span>
              </div>
              <Link to={`/novels/${n.id}`} className="btn btn-sm btn-outline-primary">
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
