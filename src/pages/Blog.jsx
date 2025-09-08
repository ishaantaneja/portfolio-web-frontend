import React, { useEffect, useState } from "react";
import { fetchPosts, addPost, updatePost, deletePost } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title:"", content:"" });
  const [editing, setEditing] = useState(null);

  const loadPosts = async () => { const { data } = await fetchPosts(); setPosts(data); }
  useEffect(()=>{ loadPosts(); },[]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if(editing) await updatePost(editing, form);
    else await addPost(form);
    setForm({ title:"", content:"" }); setEditing(null); loadPosts();
  };

  const onEdit = (p)=> setEditing(p._id) || setForm({ title:p.title, content:p.content });
  const onDelete = async (id)=> { await deletePost(id); loadPosts(); }

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Blog</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 mb-6">
        <input className="border p-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        <textarea className="border p-2 rounded" placeholder="Content" value={form.content} onChange={e=>setForm({...form,content:e.target.value})} required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{editing ? "Update" : "Add"}</button>
      </form>

      <ul className="space-y-4">
        <AnimatePresence>
          {posts.map(p=>(
            <motion.li key={p._id} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="border p-4 rounded flex justify-between items-start gap-2 flex-col md:flex-row">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-gray-600">{p.content.slice(0,300)}...</p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500" onClick={()=>onEdit(p)}>✏️</button>
                <button className="bg-red-500 px-2 py-1 rounded hover:bg-red-600" onClick={()=>onDelete(p._id)}>❌</button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  )
}
