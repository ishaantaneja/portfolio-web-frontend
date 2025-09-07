import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // backend running locally

// Projects
export const fetchProjects = () => axios.get(`${API_BASE}/projects`);



// Posts (Blog)
export const fetchPosts = () => axios.get(`${API_BASE}/posts`);

// Contact form
export const sendMessage = (data) => axios.post(`${API_BASE}/contact`, data);

// Theme
export const getTheme = () => axios.get(`${API_BASE}/settings`);
export const updateTheme = (darkMode) => axios.put(`${API_BASE}/settings`, { darkMode });


// Skills - only fetching is public
export const fetchSkills = () => axios.get(`${API_BASE}/skills`);



// Auth
export const login = (data) => axios.post(`${API_BASE}/auth/login`, data);

// Helper: attach token
const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

// Skills with token
export const addSkill = (data) => axios.post(`${API_BASE}/skills`, data, authHeaders());
export const deleteSkill = (id) => axios.delete(`${API_BASE}/skills/${id}`, authHeaders());