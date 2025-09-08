import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center text-center min-h-screen px-4 pt-24 bg-darkBg text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-4"
      >
        Ishaan Taneja
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-xl max-w-xl"
      >
        Full-Stack Web Developer specializing in secure, high-performance web apps with AI-driven workflow optimization.
      </motion.p>
    </section>
  );
}
