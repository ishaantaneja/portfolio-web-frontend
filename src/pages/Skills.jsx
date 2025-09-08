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
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <form onSubmit={onAdd} className="flex gap-2 mb-4">
        <input className="border p-2 rounded" placeholder="New skill" value={newSkill} onChange={e=>setNewSkill(e.target.value)} required />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
      </form>

      <ul className="space-y-2">
        <AnimatePresence>
          {skills.map(s=>(
            <motion.li key={s._id} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="flex justify-between items-center border p-2 rounded">
              {s.name}
              <button className="bg-red-500 px-2 py-1 rounded hover:bg-red-600" onClick={()=>onDelete(s._id)}>❌</button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  )
}
