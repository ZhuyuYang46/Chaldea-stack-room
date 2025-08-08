import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function ChapterView() {
  const { id, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [chapters, setChapters] = useState([]); // 新增：章节列表

  useEffect(() => {
    axios.get(`/api/novels/${id}/chapters/${chapterId}`)
      .then(res => setChapter(res.data));
  }, [id, chapterId]);

  // 新增：拉取本小说的章节列表并排序
  useEffect(() => {
    axios.get(`/api/novels/${id}/chapters`)
      .then(res => {
        const list = Array.isArray(res.data) ? res.data.slice().sort((a, b) => a.id - b.id) : [];
        setChapters(list);
      });
  }, [id]);

  // 计算上一章/下一章
  const idx = chapters.findIndex(c => String(c.id) === String(chapterId));
  const prevChapterId = idx > 0 ? chapters[idx - 1]?.id : null;
  const nextChapterId = idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1]?.id : null;

  // 优化加载态
  if (!chapter) return <div className="container py-5 text-center text-muted">Loading...</div>;

  return (
    <>
      <div className="container py-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h4 fw-bold mb-0">{chapter.title}</h2>
              <div className="d-flex gap-2">
                <Link to={`/novels/${id}`} className="btn btn-primary">
                  ← Return to Contents
                </Link>
                {prevChapterId ? (
                  <Link to={`/novels/${id}/chapter/${prevChapterId}`} className="btn btn-primary">
                    ← Previous
                  </Link>
                ) : (
                  <button className="btn btn-primary" disabled>← Previous</button>
                )}
                {nextChapterId ? (
                  <Link to={`/novels/${id}/chapter/${nextChapterId}`} className="btn btn-primary">
                    Next →
                  </Link>
                ) : (
                  <button className="btn btn-primary" disabled>Next →</button>
                )}
              </div>
            </div>
            {/* 正文 */}
            <div className="border-top pt-3">
              <div className="fs-6" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                {chapter.content}
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}
