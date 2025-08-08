import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ChapterEditor() {
  const { id, chapterId } = useParams();
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/novels/${id}/chapters/${chapterId}`).then(res => {
      setContent(res.data.content);
    });
  }, [id, chapterId]);

  const save = () => {
    axios.put(`/api/novels/${id}/chapters/${chapterId}`, { content })
      .then(() => navigate(-1));
  };

  return (
    <>
      <h2>Edit Chapter</h2>
      <textarea
        style={{ width: '100%', height: '60vh' }}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={save}>Save</button>
    </>
  );
}
