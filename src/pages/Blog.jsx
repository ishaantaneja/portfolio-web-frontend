import React, { useEffect, useState } from 'react';
import { fetchPosts, addPost, updatePost, deletePost } from '../services/api';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editing, setEditing] = useState(null);

  const loadPosts = async () => {
    try {
      const { data } = await fetchPosts();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updatePost(editing, form);
        setEditing(null);
      } else {
        await addPost(form);
      }
      setForm({ title: '', content: '' });
      loadPosts();
    } catch (err) {
      console.error("Failed to save post", err);
    }
  };

  const onEdit = (p) => {
    setEditing(p._id);
    setForm({ title: p.title, content: p.content });
  };

  const onDelete = async (id) => {
    try {
      await deletePost(id);
      loadPosts();
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  return (
    <section>
      <h2>Blog</h2>

      <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          required
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        />
        <button type="submit">{editing ? "Update Post" : "Add Post"}</button>
      </form>

      {posts.length === 0 && <p>No posts yet — CMS will populate this.</p>}

      {posts.map(p => (
        <article key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.content?.slice(0, 300)}...</p>
          <button onClick={() => onEdit(p)}>✏️ Edit</button>
          <button onClick={() => onDelete(p._id)}>❌ Delete</button>
        </article>
      ))}
    </section>
  );
}
