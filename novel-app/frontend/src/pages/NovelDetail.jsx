// src/pages/NovelDetail.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchNovelDetail } from '../api/novel'

export default function NovelDetail() {
  const { id } = useParams()
  const [novel, setNovel] = useState(null)

  useEffect(() => {
    fetchNovelDetail(id)
      .then(res => setNovel(res.data))
      .catch(err => {
        console.error(err)
        setNovel(null)
      })
  }, [id])

  if (!novel) return <p className="p-6">loging…</p>

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-2">{novel.title}</h2>
      <p className="text-gray-600 mb-4">Author：{novel.author}</p>
      <img src={novel.coverImageUrl} alt={novel.title} className="w-48 mb-4" />
      <div className="prose">
        <p>{novel.summary}</p>
      </div>
    </div>
  )
}
