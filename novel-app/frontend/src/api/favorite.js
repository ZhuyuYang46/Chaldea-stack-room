// src/api/favorite.js
import api from './index'

// 查看我的所有收藏
export const fetchFavorites = () =>
  api.get('/favorites')

// 收藏某本小说（/:novelId）
export const addFavorite = novelId =>
  api.post(`/favorites/${novelId}`)

// 取消收藏
export const removeFavorite = novelId =>
  api.delete(`/favorites/${novelId}`)
