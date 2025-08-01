import api from './index';

export const fetchTags    = ()       => api.get('/tags');
export const createTag    = data     => api.post('/tags', data);
export const updateTag    = (id, d)  => api.put(`/tags/${id}`, d);
export const deleteTag    = id       => api.delete(`/tags/${id}`);
