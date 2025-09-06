import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // backend running locally

// Projects
export const fetchProjects = () => axios.get(`${API_BASE}/projects`);

// Skills
export const fetchSkills = () => axios.get(`${API_BASE}/skills`);

// Posts (Blog)
export const fetchPosts = () => axios.get(`${API_BASE}/posts`);

// Contact form
export const sendMessage = (data) => axios.post(`${API_BASE}/contact`, data);

