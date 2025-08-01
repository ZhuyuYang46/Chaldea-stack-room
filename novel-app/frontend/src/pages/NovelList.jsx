import { useEffect, useState } from 'react'
import { fetchNovels } from '../api/novel'
import { fetchTags }   from '../api/tag'
import { Link }        from 'react-router-dom'

export default function NovelList() {
  const [novels, setNovels]       = useState([])
  const [tags, setTags]           = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  // 1. 加载所有标签
  useEffect(() => {
    fetchTags()
      .then(res => setTags(res.data))
      .catch(console.error)
  }, [])

  // 2. 当 selectedTags 改变时，重新拉小说
  useEffect(() => {
    // 后端约定：?tags=1,2,3  或 ?tags=爱情,奇幻
    const params = selectedTags.length
      ? { tags: selectedTags.join(',') }
      : {}
    fetchNovels(params)
      .then(res => setNovels(res.data))
      .catch(console.error)
  }, [selectedTags])

  const toggleTag = tagName => {
    setSelectedTags(prev => 
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Novel List</h2>

      {/* 标签筛选区 */}
      <Link
  to="/novels/new"
  className="inline-block bg-green-600 text-white px-4 py-2 rounded mb-4"
>
  + New Novel
</Link>
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag.id}
            onClick={() => toggleTag(tag.name)}
            className={
              `px-3 py-1 rounded-full border ` +
              (selectedTags.includes(tag.name)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-400')
            }
          >
            {tag.name}
          </button>
        ))}
      </div>

      {/* 小说列表 */}
      {novels.length === 0 ? (
        <p>No novels found.</p>
      ) : (
        <ul className="space-y-2">
          {novels.map(n => (
            <li key={n.id}>
              <Link
                to={`/novels/${n.id}`}
                className="text-blue-600 hover:underline"
              >
                {n.title} — {n.author}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
