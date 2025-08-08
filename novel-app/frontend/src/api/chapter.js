import http from './http'

// 新建章节
export function createChapter(novelId, payload) {
  // payload: { title, content, ... }
  return http.post(`/novels/${novelId}/chapters`, payload)
}

// 更新章节
export function updateChapter(novelId, chapterId, payload) {
  return http.put(`/novels/${novelId}/chapters/${chapterId}`, payload)
}

// 获取章节详情
export function fetchChapter(novelId, chapterId) {
  return http.get(`/novels/${novelId}/chapters/${chapterId}`)
}
