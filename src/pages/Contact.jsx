import React, { useState } from "react";
import { sendMessage } from "../services/api";
import { motion } from "framer-motion";

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
    <section className="max-w-6xl mx-auto py-20 px-8 container">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-gray-100"
      >
        Contact Me
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={onSubmit}
        className="flex flex-col gap-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-10"
      >
        <input
          required
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          required
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <textarea
          required
          rows="6"
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors"
        >
          Send Message
        </motion.button>
      </motion.form>

      {ok === true && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-500 mt-4 text-center font-medium"
        >
          ✅ Message sent successfully!
        </motion.p>
      )}
      {ok === false && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 mt-4 text-center font-medium"
        >
          ❌ Failed to send message. Try again.
        </motion.p>
      )}
    </section>
  );
}
