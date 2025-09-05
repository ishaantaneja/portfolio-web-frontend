// axios instance for backend calls (service layer)
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api' // env [runtime config]

const api = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' }
})

// export useful methods (projects/posts/skills/messages)
export const fetchProjects = () => api.get('/projects')
export const fetchPosts = () => api.get('/posts')
export const fetchSkills = () => api.get('/skills')
export const sendMessage = (payload) => api.post('/contact', payload)

export default api
