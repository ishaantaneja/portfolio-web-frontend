import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../services/api'

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
      .then(res => setPosts(res.data || []))
      .catch(err => console.error("Error fetching posts:", err))
  }, [])

  return (
    <section>
      <h2>Blog</h2>
      {posts.length === 0 && <p>No posts yet — CMS will populate this.</p>}
      {posts.map(p => (
        <article key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.content?.slice(0, 200)}...</p>
        </article>
      ))}
    </section>
  )
}
