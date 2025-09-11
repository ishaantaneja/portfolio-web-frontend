import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function OrientationNudge() {
  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setShowNudge(true);
      } else {
        setShowNudge(false);
      }
    };

    checkOrientation();
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!showNudge) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-xl shadow-lg z-50"
    >
      📱 Tilt your phone for a better experience
    </motion.div>
  );
}
