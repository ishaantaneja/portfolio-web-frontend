import React, { useEffect, useState } from "react";
import { fetchSkills, addSkill, deleteSkill } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const loadSkills = async () => { const { data } = await fetchSkills(); setSkills(data); }
  useEffect(() => { loadSkills(); }, []);

  const onAdd = async (e) => { e.preventDefault(); await addSkill({ name:newSkill }); setNewSkill(""); loadSkills(); }
  const onDelete = async (id) => { await deleteSkill(id); loadSkills(); }

  return (
    <section className="p-6 max-w-5xl mx-auto container py-20 px-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
      >
        Skills
      </motion.h2>

      <motion.form
        onSubmit={onAdd}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3 mb-8 bg-darkBg/50 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-lg"
      >
        <input
          className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="New skill"
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
          required
        />
        <button className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform">
          Add
        </button>
      </motion.form>

      <ul className="space-y-4">
        <AnimatePresence>
          {skills.map(s => (
            <motion.li
              key={s._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 rounded-xl bg-darkBg/60 backdrop-blur-md border border-white/10 shadow-lg flex justify-between items-center gap-4 hover:border-cyan-400/40 transition-colors"
            >
              <span className="text-white font-medium">{s.name}</span>
              <button
                className="px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/40 transition"
                onClick={() => onDelete(s._id)}
              >
                ❌
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}
