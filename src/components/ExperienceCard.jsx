import React from "react";
import { motion } from "framer-motion";

export default function ExperienceCard({ company, role, duration, details, isLast }) {
  return (
    <div className="relative flex items-start">
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div className="w-1 h-4 bg-blue-500 rounded-full z-10"></div>
        {!isLast && <div className="w-1 bg-blue-500 flex-1"></div>}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 ml-6 mb-6 cursor-pointer transition-transform duration-300 w-full "
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{company}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">{role} | {duration}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-200">{details}</p>
      </motion.div>
    </div>
  );
}
