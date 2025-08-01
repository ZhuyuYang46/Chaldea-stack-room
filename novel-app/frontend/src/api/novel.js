import api from './index';

export const fetchNovels = (params = {}) => 
  api.get('/novels', { params })
export const fetchNovelDetail = id       => api.get(`/novels/${id}`);
export const createNovel      = data     => api.post('/novels', data);
export const updateNovel      = (id, d)  => api.put(`/novels/${id}`, d);
export const deleteNovel      = id       => api.delete(`/novels/${id}`);
