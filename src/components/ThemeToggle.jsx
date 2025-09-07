import React, { useEffect, useState } from "react";
import { getTheme, updateTheme } from "../services/api";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const { data } = await getTheme();
        setDarkMode(data.darkMode);
        document.body.className = data.darkMode ? "dark" : "light";
      } catch (err) {
        console.error("Failed to fetch theme", err);
      }
    };
    fetchTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !darkMode;
      await updateTheme(newTheme);
      setDarkMode(newTheme);
      document.body.className = newTheme ? "dark" : "light";
    } catch (err) {
      console.error("Failed to update theme", err);
    }
  };

  return (
    <button onClick={toggleTheme} style={{ margin: 12 }}>
      {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
