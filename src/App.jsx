import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Skills from './pages/Skills'
import ThemeToggle from './components/ThemeToggle'
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    // Global wrapper for text & background colors
    <div className="text-gray-900 dark:text-gray-100 bg-lightBg dark:bg-darkBg min-h-screen transition-colors duration-300">
      <Nav />
      <ThemeToggle />

      <main className="container mx-auto px-6 py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}
