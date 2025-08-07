import React, { useState, useEffect } from 'react'
import {
  fetchTags,
  createTag,
  updateTag,
  deleteTag
} from '../api/tag'

export default function TagManager() {
  const [tags, setTags] = useState([])
  const [newName, setNewName] = useState('')
  const [editing, setEditing] = useState({ id: null, name: '' })
  const [error, setError] = useState('')

  const loadTags = async () => {
    try {
      const res = await fetchTags()
      setTags(res.data)
    } catch {
      setError('Failed to load tags.')
    }
  }

  useEffect(() => {
    loadTags()
  }, [])

  const handleCreate = async () => {
    if (!newName.trim()) return
    try {
      await createTag({ name: newName.trim() })
      setNewName('')
      loadTags()
    } catch {
      setError('Failed to create tag.')
    }
  }

  const handleUpdate = async () => {
    if (!editing.name.trim()) return
    try {
      await updateTag(editing.id, { name: editing.name.trim() })
      setEditing({ id: null, name: '' })
      loadTags()
    } catch {
      setError('Failed to update tag.')
    }
  }

  const handleDelete = async id => {
    try {
      await deleteTag(id)
      loadTags()
    } catch {
      setError('Failed to delete tag.')
    }
  }

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="h4 fw-bold mb-4">Tag Management</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Create new tag */}
        <div className="input-group mb-4">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="New tag name"
            className="form-control"
          />
          <button className="btn btn-success" onClick={handleCreate}>
            Create
          </button>
        </div>

        {/* Tag list */}
        <ul className="list-group">
          {tags.map(tag => (
            <li key={tag.id} className="list-group-item d-flex justify-content-between align-items-center">
              {editing.id === tag.id ? (
                <>
                  <input
                    value={editing.name}
                    onChange={e => setEditing({ ...editing, name: e.target.value })}
                    className="form-control me-2"
                  />
                  <div className="btn-group btn-group-sm">
                    <button onClick={handleUpdate} className="btn btn-outline-primary">Save</button>
                    <button onClick={() => setEditing({ id: null, name: '' })} className="btn btn-outline-secondary">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <span>{tag.name}</span>
                  <div className="btn-group btn-group-sm">
                    <button onClick={() => setEditing({ id: tag.id, name: tag.name })} className="btn btn-warning">Edit</button>
                    <button onClick={() => handleDelete(tag.id)} className="btn btn-danger">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
