// src/pages/TagManager.jsx
import React, { useState, useEffect } from 'react'
import {
  fetchTags,
  createTag,
  updateTag,
  deleteTag
} from '../api/tag'

export default function TagManager() {
  const [tags, setTags]       = useState([])
  const [newName, setNewName] = useState('')
  const [editing, setEditing] = useState({ id: null, name: '' })
  const [error, setError]     = useState('')

  // 加载所有标签
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

  // 新增标签
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

  // 更新标签
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

  // 删除标签
  const handleDelete = async id => {
    try {
      await deleteTag(id)
      loadTags()
    } catch {
      setError('Failed to delete tag.')
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Tag Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* 新增标签 */}
      <div className="flex space-x-2 mb-6">
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="New tag name"
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
        >
          Create
        </button>
      </div>

      {/* 标签列表 */}
      <ul className="space-y-2">
        {tags.map(tag => (
          <li key={tag.id} className="flex items-center space-x-2">
            {editing.id === tag.id ? (
              <>
                <input
                  value={editing.name}
                  onChange={e =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  className="flex-1 border p-1 rounded"
                />
                <button
                  onClick={handleUpdate}
                  className="text-blue-600 hover:underline"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing({ id: null, name: '' })}
                  className="text-gray-500 hover:underline"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{tag.name}</span>
                <button
                  onClick={() => setEditing({ id: tag.id, name: tag.name })}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tag.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
