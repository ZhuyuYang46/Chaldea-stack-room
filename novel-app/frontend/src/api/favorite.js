import api from './index';

export const fetchFavorites   = ()   => api.get('/favorites');
export const addFavorite      = id   => api.post(`/favorites/${id}`);
export const removeFavorite   = id   => api.delete(`/favorites/${id}`);
