import React, { useEffect, useState } from "react";
import { fetchPosts, addPost, updatePost, deletePost } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editing, setEditing] = useState(null);

  const loadPosts = async () => {
    const { data } = await fetchPosts();
    setPosts(data);
  };

  useEffect(() => { loadPosts(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editing) await updatePost(editing, form);
    else await addPost(form);
    setForm({ title: "", content: "" });
    setEditing(null);
    loadPosts();
  };

  const onEdit = (p) => setEditing(p._id) || setForm({ title: p.title, content: p.content });
  const onDelete = async (id) => { await deletePost(id); loadPosts(); }

  return (
    <section className="p-6 max-w-5xl mx-auto container py-20 px-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x"
      >
        Blog
      </motion.h2>

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
        <textarea
          className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <button className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform">
          {editing ? "Update" : "Add"}
        </button>
      </motion.form>

      <ul className="space-y-4">
        <AnimatePresence>
          {posts.map((p) => (
            <motion.li
              key={p._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 rounded-xl bg-darkBg/60 backdrop-blur-md border border-white/10 shadow-lg flex justify-between items-center gap-4 hover:border-cyan-400/40 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-lg text-cyan-400 hover:text-purple-400 transition-colors break-words">{p.title}</h3>
                <p className="text-gray-300 whitespace-pre-line break-words">{p.content}...</p>
                <span className="text-sm text-gray-500 mt-2 block">{dayjs(p.createdAt).format("MMMM D, YYYY")}</span>
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
