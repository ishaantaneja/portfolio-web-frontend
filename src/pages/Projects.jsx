import React, { useEffect, useState } from 'react';
import { fetchProjects, addProject, updateProject, deleteProject } from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', link: '' });
  const [editing, setEditing] = useState(null);

  const loadProjects = async () => {
    try {
      const { data } = await fetchProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateProject(editing, form);
        setEditing(null);
      } else {
        await addProject(form);
      }
      setForm({ title: '', description: '', link: '' });
      loadProjects();
    } catch (err) {
      console.error("Failed to save project", err);
    }
  };

  const onEdit = (p) => {
    setEditing(p._id);
    setForm({ title: p.title, description: p.description, link: p.link });
  };

  const onDelete = async (id) => {
    try {
      await deleteProject(id);
      loadProjects();
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  };

  return (
    <section>
      <h2>Projects</h2>

      <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          required
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          required
          placeholder="Link"
          value={form.link}
          onChange={e => setForm({ ...form, link: e.target.value })}
        />
        <button type="submit">{editing ? "Update Project" : "Add Project"}</button>
      </form>

      {projects.length === 0 && <p>No projects yet — CMS will populate this.</p>}

      <ul>
        {projects.map(p => (
          <li key={p._id}>
            <a href={p.link} target="_blank" rel="noreferrer">{p.title}</a>
            <p>{p.description}</p>
            <button onClick={() => onEdit(p)}>✏️ Edit</button>
            <button onClick={() => onDelete(p._id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
