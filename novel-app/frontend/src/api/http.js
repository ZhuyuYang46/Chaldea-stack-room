import axios from 'axios'

// 依据你的后端是否带 /api 前缀选择：
// - 若后端是 http://localhost:3001/api/... 则保留后缀 /api
// - 若后端没有 /api 前缀，则把末尾 /api 去掉
const BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:3001').replace(/\/$/, '')

// 全局配置 axios（覆盖直接使用 axios 的场景）
axios.defaults.baseURL = BASE
axios.defaults.withCredentials = true
axios.defaults.timeout = 15000

// 轻量覆盖 fetch：仅当以 /api 开头时，重写为绝对地址到后端
if (typeof window !== 'undefined' && typeof window.fetch === 'function' && !window.__FETCH_API_BASE_PATCHED__) {
  const origFetch = window.fetch.bind(window)
  window.fetch = (input, init) => {
    try {
      const url = typeof input === 'string' ? input : input?.url || ''
      if (url.startsWith('/api')) {
        const absolute = `${BASE}${url.replace(/^\/api/, '')}`
        return origFetch(absolute, init)
      }
    } catch (_) {
      // no-op
    }
    return origFetch(input, init)
  }
  window.__FETCH_API_BASE_PATCHED__ = true
}

const http = axios.create({
  baseURL: BASE,
  withCredentials: true,
  timeout: 15000,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // 可选调试：
  // const full = (config.url || '').startsWith('http') ? config.url : `${config.baseURL?.replace(/\/$/, '') || ''}${config.url}`
  // console.debug('[HTTP] ->', (config.method || 'GET').toUpperCase(), full)
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status
    // console.warn('[HTTP] x ', status, err?.config?.method, err?.config?.url)
    if (status === 401 || status === 403) {
      // 需要的话可在此处理登录态
    }
    return Promise.reject(err)
  }
)

export default http

