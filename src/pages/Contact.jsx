import React, { useState } from "react";
import { sendMessage } from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [ok, setOk] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage(form);
      setOk(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setOk(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6">Contact</h2>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <textarea
          required
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors">
          Send
        </button>
      </form>
      {ok === true && <p className="text-green-500 mt-2">Message sent!</p>}
      {ok === false && <p className="text-red-500 mt-2">Send failed.</p>}
    </section>
  );
}
