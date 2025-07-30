"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-gray-50 text-black hover:text-white hover:bg-gray-700 transition dark:bg-gray-800 dark:hover:bg-gray-300 dark:text-white dark:hover:text-gray-900"
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, rotate: 30 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </motion.div>
    </button>
  );
}
