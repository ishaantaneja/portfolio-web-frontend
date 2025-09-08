import React, { useEffect, useState } from "react";
import { fetchProjects, addProject, updateProject, deleteProject } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", link: "" });
  const [editing, setEditing] = useState(null);

  const loadProjects = async () => {
    try {
      const { data } = await fetchProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await updateProject(editing, form);
      else await addProject(form);
      setForm({ title: "", description: "", link: "" });
      setEditing(null);
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const onEdit = (p) =>
    setEditing(p._id) ||
    setForm({ title: p.title, description: p.description, link: p.link });

  const onDelete = async (id) => {
    await deleteProject(id);
    loadProjects();
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      <form
        onSubmit={onSubmit}
        className="flex flex-col md:flex-row gap-2 mb-6"
      >
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Link"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editing ? "Update" : "Add"}
        </button>
      </form>

      <ul className="space-y-4">
        <AnimatePresence>
          {projects.map((p) => (
            <motion.li
              key={p._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 border rounded flex justify-between items-center gap-4"
            >
              <div className="min-w-0 flex-1">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-600 break-words block"
                >
                  {p.title}
                </a>
                <p className="text-gray-600 whitespace-normal break-words">
                  {p.description}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                  onClick={() => onEdit(p)}
                >
                  ✏️
                </button>
                <button
                  className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => onDelete(p._id)}
                >
                  ❌
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}
