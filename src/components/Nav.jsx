import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navItems = ["Home", "Projects", "Blog", "Skills", "Contact", "Login"];

  return (
    
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white-500/80 dark:bg-gray-700/80 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Name */}
        <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0.5 }}
        className="text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x"
>
  Ishaan Taneja
</motion.h1>


        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg font-medium text-black dark:text-white">
          {navItems.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="transition-colors duration-300 group-hover:text-cyan-400"
              >
                {item}
              </Link>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-black dark:text-white text-3xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6 items-center py-6 bg-gray-500/90 dark:bg-gray-700/90 backdrop-blur-lg border-t border-white/10"
          >
            {navItems.map((item) => (
              <li key={item} className="text-lg text-black dark:text-white">
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}



