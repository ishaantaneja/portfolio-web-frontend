import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav style={{ display:'flex', gap:16, padding:12, borderBottom:'1px solid #eee' }}>
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/skills">Skills</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/login">Login</Link>
      

    </nav>
  )
}
