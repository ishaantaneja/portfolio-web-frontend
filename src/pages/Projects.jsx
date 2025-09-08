import React, { useEffect, useState } from "react";
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../services/api";
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
    <section className="p-6 max-w-5xl mx-auto container py-20 px-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x"
      >
        Projects
      </motion.h2>

      {/* Form */}
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-3 mb-8 bg-darkBg/50 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-lg"
      >
        <input
          className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Link"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          required
        />
        <button className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform">
          {editing ? "Update" : "Add"}
        </button>
      </motion.form>

      {/* Projects List */}
      <ul className="space-y-4">
        <AnimatePresence>
          {projects.map((p) => (
            <motion.li
              key={p._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 rounded-xl bg-darkBg/60 backdrop-blur-md border border-white/10 shadow-lg flex justify-between items-center gap-4 hover:border-cyan-400/40 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-lg text-cyan-400 hover:text-purple-400 transition-colors break-words block"
                >
                  {p.title}
                </a>
                <p className="text-gray-300 whitespace-normal break-words">
                  {p.description}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  className="px-3 py-1 rounded-lg bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 hover:bg-yellow-400/40 transition"
                  onClick={() => onEdit(p)}
                >
                  ✏️
                </button>
                <button
                  className="px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/40 transition"
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