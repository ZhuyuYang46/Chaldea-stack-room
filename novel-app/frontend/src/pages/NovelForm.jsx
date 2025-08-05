// src/pages/NovelForm.jsx
import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {
    createNovel,
    fetchNovelDetail,
    updateNovel,
    setNovelTags
} from '../api/novel'
import {fetchTags} from '../api/tag'

export default function NovelForm() {
    const {id} = useParams()           // 有 id 就是编辑，否则是新增
    const nav = useNavigate()

    // 表单字段
    const [form, setForm] = useState({
        title: '',
        author: '',
        summary: '',
        coverImageUrl: ''
    })
    const [error, setError] = useState('')

    // 所有标签、已选标签
    const [allTags, setAllTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])

    // 编辑模式：加载小说原数据 + 已选标签
    useEffect(() => {
        // 1. 拿标签列表
        fetchTags()
            .then(res => setAllTags(res.data))
            .catch(() => {
                /* 忽略错误 */
            })

        // 2. 如果是编辑，加载小说详情
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
                    // 如果后端详情里带了 tags 数组
                    const tagIds = (v.Tags || []).map(tag => tag.id)
                    setSelectedTags(tagIds)
                })
                .catch(() => setError('Failed to load novel data.'))
        }
    }, [id])

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setError('')
        try {
            let novelId = id
            if (id) {
                // 编辑模式
                await updateNovel(id, form)
            } else {
                // 新建模式
                const res = await createNovel(form)
                novelId = res.data.id
            }
            // 调用打标签接口
            await setNovelTags(novelId, selectedTags)
            nav('/novels')
        } catch {
            setError(id ? 'Update failed.' : 'Create failed.')
        }
    }

    return (
        // <div className="container mx-auto p-6 max-w-lg">
        <div className="pt-[100px] min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h2 className="text-2xl font-bold mb-4">
                {id ? 'Edit Novel' : 'Create Novel'}
            </h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                {/* 标题 / 作者 / 封面 / 简介 */}
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="w-full border p-2 rounded-[6px]"
                />
                <input
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Author"
                    required
                    className="w-full border p-2 rounded-[6px]"
                />
                <input
                    name="coverImageUrl"
                    value={form.coverImageUrl}
                    onChange={handleChange}
                    placeholder="Cover Image URL"
                    className="w-full border p-2 rounded-[6px]"
                />
                <textarea
                    name="summary"
                    value={form.summary}
                    onChange={handleChange}
                    placeholder="Summary"
                    rows="4"
                    className="w-full border p-2 rounded-[6px]"
                />

                {/* 标签多选 */}
                <div>
                    <p className="mb-2 font-semibold">Tags:</p>
                    <div className="grid grid-cols-3 gap-2">
                        {allTags.map(tag => (
                            <label key={tag.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={tag.id}
                                    checked={selectedTags.includes(tag.id)}
                                    onChange={e => {
                                        const tid = Number(e.target.value)
                                        setSelectedTags(prev =>
                                            prev.includes(tid)
                                                ? prev.filter(x => x !== tid)
                                                : [...prev, tid]
                                        )
                                    }}
                                />
                                <span>{tag.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 提交按钮 */}
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
